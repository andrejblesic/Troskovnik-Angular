import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpSendService } from '../http-send.service';
import { Sort } from '@angular/material/sort';

interface AppState {
  appState: {
    dateRange: object;
    incomes: object;
    expenses: object;
    income_categories: object;
    expense_categories: object;
  };
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  displayedColumns: string[] = [
    'category',
    'description',
    'entryDate',
    'amount'
  ];

  constructor(
    private store: Store<AppState>,
    private httpSendService: HttpSendService
  ) {}

  expenseTotal: number = 0;
  expensesArray: object[];
  loading: boolean = true;
  currentSort: Sort;

  sortData(sort: Sort) {
    this.currentSort = sort;
    const data = this.expensesArray.slice();
    if (!sort || !sort.active || sort.direction === '') {
      this.expensesArray = data;
      return;
    }
    this.expensesArray = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active) {
        case 'amount':
          return compareAmounts(a, b, isAsc);
        case 'entry-date':
          return compareDates(a, b, isAsc);
        case 'category':
          return compareCategories(a, b, isAsc);
      }
    });
  }

  trackByFn(item, index) {
    return index;
  }

  deleteExpense($event) {
    this.httpSendService.deleteExpense($event.target.id);
  }

  handleMessage(message) {
    this.expenseTotal = 0;
    for (let item in message) {
      this.expenseTotal += parseFloat(message[item].amount);
    }
    let result = Object.keys(message).map(key => {
      return [Number(key), message[key]];
    });
    this.expensesArray = result;
    this.sortData(this.currentSort);
    this.loading = false;
  }

  ngOnInit() {
    this.store
      .select(state => state.appState.expenses)
      .subscribe(message => (message ? this.handleMessage(message) : null));
  }
}

function compareAmounts(a, b, isAsc) {
  if (isAsc) {
    return parseFloat(a[1].amount) - parseFloat(b[1].amount);
  } else {
    return parseFloat(b[1].amount) - parseFloat(a[1].amount);
  }
}

function compareDates(a, b, isAsc) {
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

function compareCategories(a, b, isAsc) {
  if (isAsc) {
    return a[1].expense_category.name > b[1].expense_category.name ? -1 : 1;
  } else {
    return b[1].expense_category.name < a[1].expense_category.name ? 1 : -1;
  }
}
