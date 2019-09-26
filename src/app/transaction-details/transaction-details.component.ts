import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createSelector } from '@ngrx/store';

interface AppState {
  appState: {
    access_token: string,
    incomes: object,
    expenses: object,
    income_categories: object,
    expense_categories: object
  }
}

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  transactionDescription: string;
  transactionAmount: number;
  transactionEntryDate: string;
  transactionCategory: string;

  id;

  handleMessage(message) {
    if (message) {
      this.transactionDescription = message.description;
      this.transactionAmount = parseFloat(message.amount);
      this.transactionEntryDate = message.entry_date;
      this.transactionCategory = message.income_category.name;
    }
  }

  handleId(id) {
    this.id = this.store.select(state => state.appState.incomes ? state.appState.incomes[id] : null).subscribe(
      message => this.handleMessage(message)
    )
  }

  ngOnInit() {
    console.log(window.location.href);
    this.id = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      params.get('id'))
    );
    this.id.subscribe(
      message => this.handleId(message)
    )
  }
}
