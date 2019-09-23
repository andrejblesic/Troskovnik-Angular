import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allExpenses, allIncomes, accessToken, incomeCategories, expenseCategories } from './store/actions';
import { Store } from '@ngrx/store';

const authUrl: string = 'https://troskovnik.omniapps.info/oauth/token/';
const incomeUrl: string = 'https://troskovnik.omniapps.info/api/v1/incomes/';
const expenseUrl: string = 'https://troskovnik.omniapps.info/api/v1/expenses/';
const incomeCategoryUrl: string = 'https://troskovnik.omniapps.info/api/v1/income-categories/';
const expenseCategoryUrl: string = 'https://troskovnik.omniapps.info/api/v1/expense-categories/';

const httpOptions = {
  headers: new HttpHeaders({})
}

interface AppState {
  payload: object
}

@Injectable({
  providedIn: 'root'
})
export class HttpFetchService {

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  access_token: string;

  login(userInfo) {
    let httpLogin = this.http.post(authUrl, userInfo);
    httpLogin.subscribe(
      message => this.setAccessToken(message),
      error => console.log(error),
      () => console.log('Login successful')
    );
  }

  setAccessToken(message) {
    this.access_token = message.access_token;
    this.store.dispatch(accessToken({
      access_token: this.access_token
    }));
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${message.access_token}`);
    this.updateStore();
  }

  updateIncomes() {
    const httpIncomes = this.http.get(incomeUrl, httpOptions);
    httpIncomes.subscribe(
      message => this.dispatchIncomes(message),
      error => console.log(error),
      () => console.log('Incomes Fetched')
    );
  }

  updateExpenses() {
    const httpExpenses = this.http.get(expenseUrl, httpOptions);
    httpExpenses.subscribe(
      message => this.dispatchExpenses(message),
      error => console.log(error),
      () => console.log('Expenses Fetched')
    );
  }

  updateIncomeCategories() {
    const httpIncomeCategories = this.http.get(incomeCategoryUrl, httpOptions);
    httpIncomeCategories.subscribe(
      message => this.dispatchIncomeCategories(message),
      error => console.log(error),
      () => console.log('Income Categories Fetched')
    );
  }

  updateExpenseCategories() {
    const httpExpenseCategories = this.http.get(expenseCategoryUrl, httpOptions);
    httpExpenseCategories.subscribe(
      message => this.dispatchExpenseCategories(message),
      error => console.log(error),
      () => console.log('Expense Categories Fetched')
    )
  }

  dispatchIncomeCategories(message) {
    this.store.dispatch(incomeCategories({
      income_categories: message.data
    }))
  }

  dispatchExpenseCategories(message) {
    this.store.dispatch(expenseCategories({
      expense_categories: message.data
    }))
  }

  dispatchExpenses(message) {
    message.data ? this.store.dispatch(allExpenses({
      expenses: message.data
    })) : null;
  }

  dispatchIncomes(message) {
    message.data ? this.store.dispatch(allIncomes({
      incomes: message.data
    })) : null;
  }

  updateStore() {
    this.updateIncomes();
    this.updateExpenses();
    this.updateExpenseCategories();
    this.updateIncomeCategories();
  }
}
