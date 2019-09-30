import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpSendService } from '../http-send.service';

interface AppState {
  appState: {
    access_token: Object;
    incomes: Object;
    expenses: Object;
    expenseCategories: string[];
    incomeCategories: string[];
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'type',
    'category',
    'description',
    'entryDate',
    'amount'
  ];
  constructor(private store: Store<AppState>, private service: HttpSendService) {}

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  incomeTotal: number;
  expenseTotal: number;
  total: number;
  show: string = 'All';
  sortBy: string = 'Date(Recent First)';
  incomeSub: Subscription;
  expenseSub: Subscription;
  loading: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      console.log(this.allTransactionsArr);
    }, 3000)
    this.incomeSub = this.store
      .select(state => state.appState.incomes)
      .subscribe(message => this.handleIncomes(message));
    this.expenseSub = this.store
      .select(state => state.appState.expenses)
      .subscribe(message => this.handleExpenses(message));
  }

  deleteTransaction($event) {
    console.log($event.target.id);
    if ($event.target.getAttribute('data-target') === 'income') {
      this.service.deleteIncome($event.target.id);
    } else if ($event.target.getAttribute('data-target') === 'expense') {
      this.service.deleteExpense($event.target.id);
    }
  }

  sortTransactions() {
    if (this.sortBy === 'Date(Old First)') {
      this.allTransactionsArr.sort((a, b) => {
        let date1: number = new Date(
          a[1].entry_date.slice(6) +
            '-' +
            a[1].entry_date.slice(3, 5) +
            '-' +
            a[1].entry_date.slice(0, 2)
        ).getTime();
        let date2: number = new Date(
          b[1].entry_date.slice(6) +
            '-' +
            b[1].entry_date.slice(3, 5) +
            '-' +
            b[1].entry_date.slice(0, 2)
        ).getTime();
        return date1 - date2;
      });
    } else if (this.sortBy === 'Date(Recent First)') {
      this.allTransactionsArr.sort((a, b) => {
        let date1 = new Date(
          a[1].entry_date.slice(6) +
            '-' +
            a[1].entry_date.slice(3, 5) +
            '-' +
            a[1].entry_date.slice(0, 2)
        ).getTime();
        let date2 = new Date(
          b[1].entry_date.slice(6) +
            '-' +
            b[1].entry_date.slice(3, 5) +
            '-' +
            b[1].entry_date.slice(0, 2)
        ).getTime();
        return date2 - date1;
      });
    }
  }

  showTransactions($event) {
    this.show = $event.target.value;
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
    this.sortTransactions();
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
    this.sortTransactions();
    this.total = this.incomeTotal - this.expenseTotal;
  }

  ngOnDestroy() {
    this.incomeSub.unsubscribe();
    this.expenseSub.unsubscribe();
  }
}
