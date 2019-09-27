import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allExpenses, allIncomes, incomeCategories, expenseCategories, userInfo } from './store/actions';
import { Store } from '@ngrx/store';
import { IAppState } from './models/income-expense-models';

const incomesUrl: string = 'https://troskovnik.omniapps.info/api/v1/incomes/';
const expensesUrl: string = 'https://troskovnik.omniapps.info/api/v1/expenses/';
const incomeCategoriesUrl: string = 'https://troskovnik.omniapps.info/api/v1/income-categories/';
const expenseCategoriesUrl: string = 'https://troskovnik.omniapps.info/api/v1/expense-categories/';
const userUrl: string = 'https://troskovnik.omniapps.info/api/v1/users/';

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
    )
  }

  dispatchUserInfo(message) {
    console.log(message);
    this.store.dispatch(userInfo({user_info:<number> message.data}));
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
    message.data ? this.store.dispatch(allExpenses({
      expenses: message.data
    })) : null;
  }

  dispatchIncomes(message) {
    console.log(message);
    message.data ? this.store.dispatch(allIncomes({
      incomes: message.data
    })) : null;
  }

  updateStore() {
    this.fetchIncomes();
    this.fetchExpenses();
    this.fetchExpenseCategories();
    this.fetchIncomeCategories();
  }
}
