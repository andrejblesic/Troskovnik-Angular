import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { HttpSendService } from '../http-send.service';

interface AppState {
  appState: {
    access_token: string;
    incomes: object;
    expenses: object;
    income_categories: object;
    expense_categories: object;
  };
}

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {
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

  incomesArray: object[] = [];
  incomeTotal: number = 0;
  loading: boolean = true;

  trackByFn(index, item) {
    return index;
  }

  deleteIncome($event) {
    this.httpSendService.deleteIncome($event.target.id);
  }

  handleMessage(message) {
    this.incomeTotal = 0;
    for (let item in message) {
      this.incomeTotal += parseFloat(message[item].amount);
    }
    let result = Object.keys(message).map(key => {
      return [Number(key), message[key]];
    });
    this.incomesArray = result;
    this.loading = false;
  }

  ngOnInit() {
    this.store
      .select(state => state.appState.incomes)
      .subscribe(message => (message ? this.handleMessage(message) : null));
  }
}
