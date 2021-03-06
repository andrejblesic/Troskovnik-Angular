import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpSendService } from '../http-send.service';
import { IAppState } from '../models/general-models';
import { clearDateRange } from '../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IAppState>,
    private service: HttpSendService
  ) {}

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  filteredTransactionsArr: object[] = [];
  incomeTotal: number;
  expenseTotal: number;
  total: number;
  incomeSub: Subscription;
  expenseSub: Subscription;
  dateSub: Subscription;
  dateRange = { startDate: 0, endDate: Infinity };
  show = 'All';
  loading = true;
  totalTransactions: number;

  showTransactions($event) {
    this.show = $event;
    this.filterTransactions();
  }

  setDateRange(message) {
    this.dateRange = message;
    this.filterTransactions();
  }

  clearDateRange() {
    this.store.dispatch(clearDateRange({ startDate: 0, endDate: Infinity }));
  }

  filterTransactions() {
    this.incomeTotal = 0;
    this.expenseTotal = 0;
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.filteredTransactionsArr = this.allTransactionsArr.filter(item => {
      let date = item[1].entry_date.split('.');
      [date[0], date[1], date[2]] = [date[1], date[0], date[2]];
      date = date.join('/');
      date = new Date(date).getTime();
      return date >= this.dateRange.startDate && date <= this.dateRange.endDate;
    });
    if (this.show === 'Incomes') {
      this.filteredTransactionsArr = this.filteredTransactionsArr.filter(
        item => {
          return item[1].income_category;
        }
      );
    } else if (this.show === 'Expenses') {
      this.filteredTransactionsArr = this.filteredTransactionsArr.filter(
        item => {
          return item[1].expense_category;
        }
      );
    }
    for (const item in this.filteredTransactionsArr) {
      if (this.filteredTransactionsArr[item][1].income_category) {
        this.incomeTotal += parseFloat(
          this.filteredTransactionsArr[item][1].amount
        );
      } else if (this.filteredTransactionsArr[item][1].expense_category) {
        this.expenseTotal += parseFloat(
          this.filteredTransactionsArr[item][1].amount
        );
      }
    }
    this.totalTransactions = this.filteredTransactionsArr.length;
    this.total = this.incomeTotal - this.expenseTotal;
  }

  deleteTransaction($event) {
    if ($event.target.getAttribute('data-target') === 'income') {
      this.service.deleteIncome($event.target.id);
    } else if ($event.target.getAttribute('data-target') === 'expense') {
      this.service.deleteExpense($event.target.id);
    }
  }

  handleIncomes(message) {
    this.incomeTotal = 0;
    for (const item in message) {
      if (message.hasOwnProperty(item)) {
        this.incomeTotal += parseFloat(message[item].amount);
      }
    }
    if (this.allTransactionsArr.length) {
      this.loading = false;
    }
    if (message) {
      this.incomeArr = Object.entries(message);
    }
    this.allTransactionsArr = this.incomeArr.concat(this.expenseArr);
    this.totalTransactions = this.allTransactionsArr.length;
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.total = this.incomeTotal - this.expenseTotal;
  }

  handleExpenses(message) {
    this.expenseTotal = 0;
    for (const item in message) {
      if (message.hasOwnProperty(item)) {
        this.expenseTotal += parseFloat(message[item].amount);
      }
    }
    if (this.allTransactionsArr.length) {
      this.loading = false;
    }
    if (message) {
      this.expenseArr = Object.entries(message);
    }
    this.allTransactionsArr = this.expenseArr.concat(this.incomeArr);
    this.totalTransactions = this.allTransactionsArr.length;
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.total = this.incomeTotal - this.expenseTotal;
  }

  ngOnInit() {
    this.dateSub = this.store
      .select(state => state.appState.dateRange)
      .subscribe(message => this.setDateRange(message));
    this.incomeSub = this.store
      .select(state => state.appState.incomes)
      .subscribe(message => this.handleIncomes(message));
    this.expenseSub = this.store
      .select(state => state.appState.expenses)
      .subscribe(message => this.handleExpenses(message));
  }

  ngOnDestroy() {
    this.incomeSub.unsubscribe();
    this.expenseSub.unsubscribe();
    this.dateSub.unsubscribe();
  }
}
