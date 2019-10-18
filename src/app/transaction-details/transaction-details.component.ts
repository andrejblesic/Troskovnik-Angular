import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { createSelector } from '@ngrx/store';

interface AppState {
  appState: {
    access_token: string,
    incomes: object,
    expenses: object,
    income_categories: object,
    expense_categories: object
  };
}

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  transactionDescription: string;
  transactionAmount: number;
  transactionEntryDate: string;
  transactionCategory: string;
  type: string;
  id: string;
  loading = true;
  expenseSub: Subscription;
  incomeSub: Subscription;

  handleIncome(message) {
    if (message) {
      this.transactionDescription = message.description;
      this.transactionAmount = parseFloat(message.amount);
      this.transactionEntryDate = message.entry_date;
      this.transactionCategory = message.income_category.name;
      this.loading = false;
    }
  }

  handleExpense(message) {
    if (message) {
      this.transactionDescription = message.description;
      this.transactionAmount = parseFloat(message.amount);
      this.transactionEntryDate = message.entry_date;
      this.transactionCategory = message.expense_category.name;
      this.loading = false;
    }
  }

  ngOnInit() {
    this.type = this.route.snapshot.data.type;
    this.id = this.route.snapshot.params.id;
    if (this.type === 'income') {
      this. incomeSub = this.store.select(state => state.appState.incomes ? state.appState.incomes[this.id] : null).subscribe(
        message => this.handleIncome(message)
      );
    } else if (this.type === 'expense') {
      this.expenseSub = this.store.select(state => state.appState.expenses ? state.appState.expenses[this.id] : null).subscribe(
        message => this.handleExpense(message)
      );
    }
  }

  ngOnDestroy() {
    if (this.incomeSub) {
      this.incomeSub.unsubscribe();
    }
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }
}
