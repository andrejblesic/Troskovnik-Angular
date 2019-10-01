import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpSendService } from '../http-send.service';
import { Sort } from '@angular/material/sort';
import { IAppState } from '../models/income-expense-models';

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
  constructor(private store: Store<IAppState>, private service: HttpSendService) { }

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  filteredTransactionsArr: object[] = [];
  incomeTotal: number;
  expenseTotal: number;
  total: number;
  show: string = 'All';
  sortBy: string = 'Date(Recent First)';
  incomeSub: Subscription;
  expenseSub: Subscription;
  dateRange: object;
  loading: boolean = true;
  currentSort: Sort;

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
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.filteredTransactionsArr = this.allTransactionsArr.filter((item) => {
      let date = item[1].entry_date.split(".");
      [date[0], date[1], date[2]] = [date[1], date[0], date[2]];
      date = date.join("/");
      date = new Date(date).getTime();
      return date >= message.startDate && date <= message.endDate;
    })
  }

  deleteTransaction($event) {
    console.log($event.target.id);
    if ($event.target.getAttribute('data-target') === 'income') {
      this.service.deleteIncome($event.target.id);
    } else if ($event.target.getAttribute('data-target') === 'expense') {
      this.service.deleteExpense($event.target.id);
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
    this.filteredTransactionsArr = this.allTransactionsArr;
    this.total = this.incomeTotal - this.expenseTotal;
  }

  sortData(sort: Sort) {
    this.currentSort = sort;
    const data = this.allTransactionsArr.slice();
    if (!sort || !sort.active || sort.direction === '') {
      this.allTransactionsArr = data;
      return;
    }
    this.allTransactionsArr = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return compareAmounts(a, b, isAsc);
        case 'entry-date':
          return compareDates(a, b, isAsc);
        case 'category':
          return compareCategories(a, b, isAsc);
      }
    });
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

let compareAmounts = (a, b, isAsc) => {
  if (isAsc) {
    return parseFloat(a[1].amount) - parseFloat(b[1].amount);
  } else {
    return parseFloat(b[1].amount) - parseFloat(a[1].amount);
  }
}

let compareDates = (a, b, isAsc) => {
  let date1 = a[1].entry_date.split('.');
  date1 = [date1[0], date1[1], date1[2]] = [date1[1], date1[0], date1[2]];
  let timeStampA = new Date(date1.join('.')).getTime();
  let date2 = b[1].entry_date.split('.');
  date2 = [date2[0], date2[1], date2[2]] = [date2[1], date2[0], date2[2]];
  let timeStampB = new Date(date2.join('.')).getTime();
  if (isAsc) {
    return timeStampA - timeStampB;
  } else {
    return timeStampB - timeStampA;
  }
}

let compareCategories = (a, b, isAsc) => {
  if (isAsc) {
    return (a[1].expense_category ? a[1].expense_category.name : a[1].income_category.name) > (b[1].expense_category ? b[1].expense_category.name : b[1].income_category.name) ? -1 : 1;
  } else {
    return (b[1].expense_category ? b[1].expense_category.name : b[1].income_category.name) < (a[1].expense_category ? a[1].expense_category.name : a[1].income_category.name) ? 1 : -1;
  }
}
