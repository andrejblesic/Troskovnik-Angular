import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpSendService } from '../http-send.service';
import { IAppState } from '../models/income-expense-models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<IAppState>, private service: HttpSendService) { }

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  filteredTransactionsArr: object[] = [];
  incomeTotal: number;
  expenseTotal: number;
  total: number;
  incomeSub: Subscription;
  expenseSub: Subscription;
  dateRange: object;
  loading: boolean = true;

  ngOnInit() {
    this.store.select(state => state.appState.dateRange).subscribe(
      message => this.filterTransactions(message)
    )
    this.incomeSub = this.store
      .select(state => state.appState.incomes)
      .subscribe(message => this.handleIncomes(message));
    this.expenseSub = this.store
      .select(state => state.appState.expenses)
      .subscribe(message => this.handleExpenses(message));
  }

  filterTransactions(message) {
    this.incomeTotal = 0;
    this.expenseTotal = 0;
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.filteredTransactionsArr = this.allTransactionsArr.filter((item) => {
      let date = item[1].entry_date.split(".");
      [date[0], date[1], date[2]] = [date[1], date[0], date[2]];
      date = date.join("/");
      date = new Date(date).getTime();
      return date >= message.startDate && date <= message.endDate;
    });
    for (let item in this.filteredTransactionsArr) {
      if (this.filteredTransactionsArr[item][1].income_category) {
        this.incomeTotal += parseFloat(this.filteredTransactionsArr[item][1].amount);
      } else if (this.filteredTransactionsArr[item][1].expense_category) {
        this.expenseTotal += parseFloat(this.filteredTransactionsArr[item][1].amount);
      }
    }
    this.total = this.incomeTotal - this.expenseTotal;
  }

  deleteTransaction($event) {
    console.log($event.target.id);
    if ($event.target.getAttribute('data-target') === 'income') {
      this.service.deleteIncome($event.target.id);
    } else if ($event.target.getAttribute('data-target') === 'expense') {
      this.service.deleteExpense($event.target.id);
    }
  }

  handleIncomes(message) {
    this.incomeTotal = 0;
    for (let item in message) {
      message ? this.incomeTotal += parseFloat(message[item].amount) : null;
    }
    if (this.allTransactionsArr.length) {
      this.loading = false;
    }
    message ? (this.incomeArr = Object.entries(message)) : null;
    this.allTransactionsArr = this.incomeArr.concat(this.expenseArr);
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.total = this.incomeTotal - this.expenseTotal;
  }

  handleExpenses(message) {
    this.expenseTotal = 0;
    for (let item in message) {
      message ? this.expenseTotal += parseFloat(message[item].amount) : null;
    }
    if (this.allTransactionsArr.length) {
      this.loading = false;
    }
    message ? (this.expenseArr = Object.entries(message)) : null;
    this.allTransactionsArr = this.expenseArr.concat(this.incomeArr);
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.total = this.incomeTotal - this.expenseTotal;
  }

  ngOnDestroy() {
    this.incomeSub.unsubscribe();
    this.expenseSub.unsubscribe();
  }
}
