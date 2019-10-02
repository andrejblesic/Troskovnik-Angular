import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allExpenses, allIncomes, incomeCategories, expenseCategories, userInfo } from './store/actions';
import { Store } from '@ngrx/store';
//import { IUserInfo } from './models/income-expense-models';
import { IAppState, IUserInfo } from './models/general-models';

const incomesUrl = 'https://troskovnik.omniapps.info/api/v1/incomes/';
const expensesUrl = 'https://troskovnik.omniapps.info/api/v1/expenses/';
const incomeCategoriesUrl = 'https://troskovnik.omniapps.info/api/v1/income-categories/';
const expenseCategoriesUrl = 'https://troskovnik.omniapps.info/api/v1/expense-categories/';
const userUrl = 'https://troskovnik.omniapps.info/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class HttpFetchService {

  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  fetchIncomes() {
    const httpIncomes = this.http.get(incomesUrl);
    httpIncomes.subscribe(
      message => this.dispatchIncomes(message),
      error => console.log(error),
      () => console.log('Incomes Fetched')
    );
  }

  fetchExpenses() {
    const httpExpenses = this.http.get(expensesUrl);
    httpExpenses.subscribe(
      message => this.dispatchExpenses(message),
      error => console.log(error),
      () => console.log('Expenses Fetched')
    );
  }

  fetchIncomeCategories() {
    const httpIncomeCategories = this.http.get(incomeCategoriesUrl);
    httpIncomeCategories.subscribe(
      message => this.dispatchIncomeCategories(message),
      error => console.log(error),
      () => console.log('Income Categories Fetched')
    );
  }

  fetchExpenseCategories() {
    const httpExpenseCategories = this.http.get(expenseCategoriesUrl);
    httpExpenseCategories.subscribe(
      message => this.dispatchExpenseCategories(message),
      error => console.log(error),
      () => console.log('Expense Categories Fetched')
    );
  }

  fetchUserInfo(id) {
    const httpUserInfo = this.http.get(userUrl + id);
    httpUserInfo.subscribe(
      message => this.dispatchUserInfo(message)
    );
  }

  dispatchUserInfo(message) {
    console.log(message);
    this.store.dispatch(userInfo({user_info: <IUserInfo> message.data}));
  }

  dispatchIncomeCategories(message) {
    this.store.dispatch(incomeCategories({
      income_categories: message.data
    }));
  }

  dispatchExpenseCategories(message) {
    this.store.dispatch(expenseCategories({
      expense_categories: message.data
    }));
  }

  dispatchExpenses(message) {
    if (message.data) {
      this.store.dispatch(allExpenses({
        expenses: message.data
      }));
    }
  }

  dispatchIncomes(message) {
    if (message.data) {
      this.store.dispatch(allIncomes({
        incomes: message.data
      }));
    }
  }

  updateStore() {
    this.fetchIncomes();
    this.fetchExpenses();
    this.fetchExpenseCategories();
    this.fetchIncomeCategories();
  }
}
