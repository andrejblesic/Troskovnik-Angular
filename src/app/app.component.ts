import { Component, OnInit } from '@angular/core';
import { HttpFetchService } from './http-fetch.service';
import { HttpSendService } from './http-send.service';
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface AppState {
  appState: {
    expenses: object;
    incomes: object;
  };
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
    private store: Store<AppState>,
    private loginService: LoginService
  ) {}
  title = 'troskovnik-angular';

  loading: boolean = true;

  expenses: object;
  incomes: object;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

  incomeDataSource: Observable<any> = this.store.select(state =>
    state.appState ? state.appState.incomes : null
  );

  expenseDataSource: Observable<any> = this.store.select(state =>
    state.appState ? state.appState.expenses : null
  );

  userInfo = {
    grant_type: 'password',
    client_id: '2',
    client_secret: 'DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU',
    username: 'admin@troskovnik.omniapps.info',
    password: '1282Verbatim(',
    scope: ''
  };

  deleteEntry(args) {
    if (args[1] === 'income') {
      this.httpSendService.deleteIncome(args[0]);
    } else if (args[1] === 'expense') {
      this.httpSendService.deleteExpense(args[0]);
    }
  }

  checkLoading(message) {
    if (
      message.appState.incomes &&
      message.appState.expenses &&
      message.appState.income_categories &&
      message.appState.expense_categories
    ) {
      this.loading = false;
    }
  }

  calcIncomeTotal(message) {
    this.totalIncomes = 0;
    for (let item in message) {
      this.totalIncomes += parseFloat(message[item].amount);
      console.log(this.totalIncomes);
    }
  }

  ngOnInit() {
    this.loginService.login(this.userInfo);
    this.expenses = this.store
      .select(state => (state.appState ? state.appState.expenses : null))
      .pipe(
        share(),
        map(obj => {
          this.totalExpenses = 0;
          for (let item in obj) {
            this.totalExpenses += parseFloat(obj[item].amount);
          }
          return obj;
        })
      );

    this.incomeDataSource.subscribe(
      message => this.calcIncomeTotal(message),
      error => console.log(error),
      () => console.log('completed')
    );
    this.store.subscribe(message => this.checkLoading(message));
    this.store.subscribe(message =>
      console.log('STATE UPDATED, NEW STATE:', message)
    );
  }
}
