import { Component, OnInit } from '@angular/core';
import { HttpFetchService } from './http-fetch.service';
import { HttpSendService } from './http-send.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';

interface AppState {
  appState: {
    expenses: object,
    incomes: object
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private httpFetchService: HttpFetchService,
    private httpSendService: HttpSendService,
    private store: Store<AppState>
  ) { }
  title = 'troskovnik-angular';

  expenses: object;
  incomes: object;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

  userInfo = {
    grant_type: "password",
    client_id: "2",
    client_secret: "DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU",
    username: "admin@troskovnik.omniapps.info",
    password: "1282Verbatim(",
    scope: ""
  }

  deleteEntry(args) {
    if (args[1] === "income") {
      this.httpSendService.deleteIncome(args[0]);
    } else if (args[1] === "expense") {
      this.httpSendService.deleteExpense(args[0]);
    }
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.httpSendService.deleteIncomeCategory(6);
    // }, 2000)
    this.httpFetchService.login(this.userInfo);
    this.expenses = this.store.select(state => state.appState ? state.appState.expenses : null).pipe(
      share(),
      map(obj => {
        this.totalExpenses = 0;
        for (let item in obj) {
          this.totalExpenses += parseFloat(obj[item].amount);
        }
        return obj;
      })
    );
    this.incomes = this.store.select(state => state.appState ? state.appState.incomes : null).pipe(
      share(),
      map(obj => {
        this.totalIncomes = 0;
        for (let item in obj) {
          this.totalIncomes += parseFloat(obj[item].amount);
        }
        return obj;
      })
    );
    this.store.subscribe(
      message => console.log('STATE UPDATED, NEW STATE:', message)
    )
  }
}
