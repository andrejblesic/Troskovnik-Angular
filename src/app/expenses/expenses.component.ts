import { Component, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpSendService } from '../http-send.service';
import { HttpFetchService } from '../http-fetch.service';
import { Sort } from '@angular/material/sort';
import { IAppState } from '../models/general-models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'category',
    'description',
    'entryDate',
    'amount'
  ];

  constructor(
    private store: Store<IAppState>,
    private httpSendService: HttpSendService,
    private httpFetchService: HttpFetchService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('confirmDelete', {static: false}) confirmDelete;

  expenseTotal = 0;
  expensesArray: object[];
  loading = true;
  currentSort: Sort;
  selectedExpense: number;
  navbarOpen: boolean;
  navbarSub: Subscription;
  expenseSub: Subscription;

  sortData(sort: Sort): number {
    this.currentSort = sort;
    const data = this.expensesArray.slice();
    if (!sort || !sort.active || sort.direction === '') {
      this.expensesArray = data;
      return;
    }
    this.expensesArray = data.sort((a, b) => {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  trackByFn(item: object, index: number): number {
    return index;
  }

  openDeleteDialog($event): void {
    this.selectedExpense = $event.target.id;
    const nav = document.getElementById('main-nav');
    const scrollTop = nav.scrollTop;
    nav.style.cssText = 'overflow-y: hidden !important';
    if (this.navbarOpen) {
      nav.style.cssText = 'margin-left: 200px';
    }
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'top', `${scrollTop}px`);
  }

  deleteExpense(): void {
    this.httpSendService.deleteExpense(this.selectedExpense).subscribe(
      message => null,
      error => console.log(error),
      () => this.deleteSuccess()
    );
    const nav = document.getElementById('main-nav');
    nav.style.cssText = 'overflow-y: scroll !important';
    if (this.navbarOpen) {
      nav.style.cssText = 'margin-left: 200px';
    }
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'display', 'none');
  }

  deleteSuccess(): void {
    this.httpFetchService.fetchExpenses();
    this.openSnackBar('Expense deleted successfully', 'Dismiss');
  }

  cancelDelete(): void {
    const nav = document.getElementById('main-nav');
    nav.style.cssText = 'overflow-y: scroll !important';
    if (this.navbarOpen) {
      nav.style.cssText = 'margin-left: 200px';
    }
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'display', 'none');
  }

  handleExpensesMessage(message: object): void {
    this.expenseTotal = 0;
    for (const item in message) {
      if (message.hasOwnProperty(item)) {
        this.expenseTotal += parseFloat(message[item].amount);
      }
    }
    const result = Object.keys(message).map(key => {
      return [Number(key), message[key]];
    });
    this.expensesArray = result;
    this.sortData(this.currentSort);
    this.loading = false;
  }

  ngOnInit(): void {
    this.expenseSub = this.store
      .select(state => state.appState.expenses)
      .subscribe(message => (message ? this.handleExpensesMessage(message) : null));
    this.navbarSub = this.store.select(state => state.appState.navbarOpen).subscribe(
      message => this.navbarOpen = message
    );
  }

  ngOnDestroy(): void {
    this.navbarSub.unsubscribe();
    this.expenseSub.unsubscribe();
  }
}

function compareAmounts(a, b, isAsc: boolean): number {
  if (isAsc) {
    return parseFloat(a[1].amount) - parseFloat(b[1].amount);
  } else {
    return parseFloat(b[1].amount) - parseFloat(a[1].amount);
  }
}

function compareDates(a, b, isAsc: boolean): number {
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
}

function compareCategories(a, b, isAsc: boolean): number {
  if (isAsc) {
    return a[1].expense_category.name > b[1].expense_category.name ? -1 : 1;
  } else {
    return b[1].expense_category.name < a[1].expense_category.name ? 1 : -1;
  }
}
