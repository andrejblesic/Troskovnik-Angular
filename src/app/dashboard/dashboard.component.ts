import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { mergeAll } from 'rxjs/operators';

interface AppState {
  appState: {
    access_token: Object,
    incomes: Object,
    expenses: Object,
    expenseCategories: string[],
    incomeCategories: string[]
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  show: string = "All";
  sortBy: string = "Date(Recent First)";
  incomeSub: Subscription;
  expenseSub: Subscription;

  ngOnInit() {
    this.incomeSub = this.store.select(state => state.appState.incomes).subscribe(
      message => this.handleIncomes(message)
    );
    this.expenseSub = this.store.select(state => state.appState.expenses).subscribe(
      message => this.handleExpenses(message)
    );
  }

  sortTransactions() {
    if (this.sortBy === "Date(Old First)") {
      this.allTransactionsArr.sort((a, b) => {
        let date1:number = new Date(a[1].entry_date.slice(6) + "-" + a[1].entry_date.slice(3, 5) + "-" + a[1].entry_date.slice(0, 2)).getTime();
        let date2:number = new Date(b[1].entry_date.slice(6) + "-" + b[1].entry_date.slice(3, 5) + "-" + b[1].entry_date.slice(0, 2)).getTime();
        return date1 - date2;
      });
    } else if (this.sortBy === "Date(Recent First)") {
      this.allTransactionsArr.sort((a, b) => {
        let date1 = new Date(a[1].entry_date.slice(6) + "-" + a[1].entry_date.slice(3, 5) + "-" + a[1].entry_date.slice(0, 2)).getTime();
        let date2 = new Date(b[1].entry_date.slice(6) + "-" + b[1].entry_date.slice(3, 5) + "-" + b[1].entry_date.slice(0, 2)).getTime();
        return date2 - date1;
      });
    }
  }

  showTransactions($event) {
    this.show = $event.target.value;
  }

  handleIncomes(message) {
    message ? this.incomeArr = Object.entries(message) : null;
    this.allTransactionsArr = this.incomeArr.concat(this.expenseArr);
    this.sortTransactions();
  }

  handleExpenses(message) {
    message ? this.expenseArr = Object.entries(message) : null;
    this.allTransactionsArr = this.expenseArr.concat(this.incomeArr);
    this.sortTransactions();
  }

  ngOnDestroy() {
    this.incomeSub.unsubscribe();
    this.expenseSub.unsubscribe();
  }
}
