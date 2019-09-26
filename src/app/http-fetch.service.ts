import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allExpenses, allIncomes, incomeCategories, expenseCategories } from './store/actions';
import { Store } from '@ngrx/store';

const incomeUrl: string = 'https://troskovnik.omniapps.info/api/v1/incomes/';
const expenseUrl: string = 'https://troskovnik.omniapps.info/api/v1/expenses/';
const incomeCategoryUrl: string = 'https://troskovnik.omniapps.info/api/v1/income-categories/';
const expenseCategoryUrl: string = 'https://troskovnik.omniapps.info/api/v1/expense-categories/';

const httpOptions = {
  headers: new HttpHeaders({})
}

interface AppState {
  appState: {
    access_token: string,
    incomes: object,
    expenses: object,
    income_categories: object,
    expense_categories: object
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpFetchService {

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  updateIncomes() {
    const httpIncomes = this.http.get(incomeUrl);
    httpIncomes.subscribe(
      message => this.dispatchIncomes(message),
      error => console.log(error),
      () => console.log('Incomes Fetched')
    );
  }

  updateExpenses() {
    const httpExpenses = this.http.get(expenseUrl);
    httpExpenses.subscribe(
      message => this.dispatchExpenses(message),
      error => console.log(error),
      () => console.log('Expenses Fetched')
    );
  }

  updateIncomeCategories() {
    const httpIncomeCategories = this.http.get(incomeCategoryUrl);
    httpIncomeCategories.subscribe(
      message => this.dispatchIncomeCategories(message),
      error => console.log(error),
      () => console.log('Income Categories Fetched')
    );
  }

  updateExpenseCategories() {
    const httpExpenseCategories = this.http.get(expenseCategoryUrl);
    httpExpenseCategories.subscribe(
      message => this.dispatchExpenseCategories(message),
      error => console.log(error),
      () => console.log('Expense Categories Fetched')
    );
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
    this.updateIncomes();
    this.updateExpenses();
    this.updateExpenseCategories();
    this.updateIncomeCategories();
  }
}
