import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = [
    'type',
    'category',
    'description',
    'entryDate',
    'amount'
  ];

  @Input() filteredTransactionsArr: object[];
  @Input() expenseTotal: number;
  @Input() incomeTotal: number;
  @Input() total: number;

  currentSort: Sort;

  sortData(sort: Sort) {
    this.currentSort = sort;
    const data = this.filteredTransactionsArr.slice();
    if (!sort || !sort.active || sort.direction === '') {
      this.filteredTransactionsArr = data;
      return;
    }
    this.filteredTransactionsArr = data.sort((a, b) => {
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

  ngOnInit() {}
}

const compareAmounts = (a, b, isAsc) => {
  if (isAsc) {
    return parseFloat(a[1].amount) - parseFloat(b[1].amount);
  } else {
    return parseFloat(b[1].amount) - parseFloat(a[1].amount);
  }
};

const compareDates = (a, b, isAsc) => {
  let date1 = a[1].entry_date.split('.');
  date1 = [date1[0], date1[1], date1[2]] = [date1[1], date1[0], date1[2]];
  const timeStampA = new Date(date1.join('.')).getTime();
  let date2 = b[1].entry_date.split('.');
  date2 = [date2[0], date2[1], date2[2]] = [date2[1], date2[0], date2[2]];
  const timeStampB = new Date(date2.join('.')).getTime();
  if (isAsc) {
    return timeStampA - timeStampB;
  } else {
    return timeStampB - timeStampA;
  }
};

const compareCategories = (a, b, isAsc) => {
  if (isAsc) {
    return (a[1].expense_category ? a[1].expense_category.name : a[1].income_category.name)
    >
    (b[1].expense_category ? b[1].expense_category.name : b[1].income_category.name)
    ?
    -1 : 1;
  } else {
    return (b[1].expense_category ? b[1].expense_category.name : b[1].income_category.name)
    <
    (a[1].expense_category ? a[1].expense_category.name : a[1].income_category.name)
    ?
    1 : -1;
  }
};
