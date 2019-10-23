import { Component, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpSendService } from '../http-send.service';
import { HttpFetchService } from '../http-fetch.service';
import { Sort } from '@angular/material/sort';
import { IAppState } from '../models/general-models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit, OnDestroy {
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

  incomesArray: object[] = [];
  incomeTotal = 0;
  loading = true;
  currentSort: Sort;
  selectedIncome: number;
  navbarOpen: boolean;
  navbarSub: Subscription;
  incomeSub: Subscription;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sortData(sort: Sort): object[] {
    this.currentSort = sort;
    const data = this.incomesArray.slice();
    if (!sort || !sort.active || sort.direction === '') {
      this.incomesArray = data;
      return;
    }
    this.incomesArray = data.sort((a, b) => {
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

  trackByFn(index: number, item: object) {
    return index;
  }

  openDeleteDialog($event): void {
    this.selectedIncome = $event.target.id;
    const nav = document.getElementById('main-nav');
    const scrollTop = nav.scrollTop;
    nav.style.cssText = 'overflow-y: hidden !important';
    if (this.navbarOpen) {
      nav.style.cssText = 'margin-left: 200px';
    }
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'top', `${scrollTop}px`);
  }

  deleteIncome(): void {
    this.httpSendService.deleteIncome(this.selectedIncome).subscribe(
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

  deleteSuccess() {
    this.httpFetchService.fetchIncomes();
    this.openSnackBar('Income deleted successfully', 'Dismiss');
  }

  cancelDelete(): void {
    const nav = document.getElementById('main-nav');
    nav.style.cssText = 'overflow-y: scroll !important';
    if (this.navbarOpen) {
      nav.style.cssText = 'margin-left: 200px';
    }
    this.renderer.setStyle(this.confirmDelete.nativeElement, 'display', 'none');
  }

  handleIncomesMessage(message: object): void {
    this.incomeTotal = 0;
    for (const item in message) {
      if (message.hasOwnProperty(item)) {
        this.incomeTotal += parseFloat(message[item].amount);
      }
    }
    const result = Object.keys(message).map(key => {
      return [Number(key), message[key]];
    });
    this.incomesArray = result;
    this.sortData(this.currentSort);
    this.loading = false;
  }

  ngOnInit(): void {
    this.incomeSub = this.store
      .select(state => state.appState.incomes)
      .subscribe(message => (message ? this.handleIncomesMessage(message) : null));
    this.navbarSub = this.store.select(state => state.appState.navbarOpen).subscribe(
      message => this.navbarOpen = message
    );
  }

  ngOnDestroy(): void {
    this.navbarSub.unsubscribe();
    this.incomeSub.unsubscribe();
  }
}

const compareAmounts = (a, b, isAsc: boolean) => {
  if (isAsc) {
    return parseFloat(a[1].amount) - parseFloat(b[1].amount);
  } else {
    return parseFloat(b[1].amount) - parseFloat(a[1].amount);
  }
};

const compareDates = (a, b, isAsc: boolean) => {
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
    return a[1].income_category.name > b[1].income_category.name ? -1 : 1;
  } else {
    return b[1].income_category.name < a[1].income_category.name ? 1 : -1;
  }
};
