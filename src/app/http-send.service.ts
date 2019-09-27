import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpFetchService } from './http-fetch.service';

const incomesUrl: string = 'https://troskovnik.omniapps.info/api/v1/incomes/';
const expensesUrl: string = 'https://troskovnik.omniapps.info/api/v1/expenses/';
const incomeCategoryUrl: string = 'https://troskovnik.omniapps.info/api/v1/income-categories/';
const expenseCategoryUrl: string = 'https://troskovnik.omniapps.info/api/v1/expense-categories/';

interface AppState {
  appState: {
    access_token: string,
    incomes: object,
    expenses: object,
    income_categories: object,
    expense_categories: object
  }
}

const httpOptions = {
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class HttpSendService {

  constructor(private store: Store<AppState>, private http: HttpClient, private service: HttpFetchService) { }

  sendIncome(incomeCategory, incomeEntryDate, incomeAmount, incomeDescription, incomeCategoryId, userName) {
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let date = new Date();
    let fullDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    console.log(userName);
    let incomeJSON = {
      amount: incomeAmount,
      created_at: fullDate,
      deleted_at: null,
      description: incomeDescription,
      entry_date: incomeEntryDate.replace(/\//g, "."),
      id: 1,
      created_by: userName,
      income_category: {
        id: 1,
        name: incomeCategory,
        created_at: fullDate,
        updated_at: fullDate,
        deleted_at: null
      },
      income_category_id: incomeCategoryId,
      updated_at: fullDate
    }
    let postIncome = this.http.post(incomesUrl, incomeJSON);
    postIncome.subscribe(
      message => this.service.fetchIncomes(),
      error => console.log(error),
      () => console.log('Income Sent')
    )
  }

  sendExpense(expenseCategory, expenseEntryDate, expenseAmount, expenseDescription, expenseCategoryId) {
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let date = new Date();
    let fullDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    let expenseJSON = {
      amount: expenseAmount,
      created_at: fullDate,
      deleted_at: null,
      description: expenseDescription,
      entry_date: expenseEntryDate.replace(/\//g, "."),
      id: 1,
      expense_category: {
        id: 1,
        name: expenseCategory,
        created_at: fullDate,
        updated_at: fullDate,
        deleted_at: null
      },
      expense_category_id: expenseCategoryId,
      updated_at: fullDate
    }
    let postExpense = this.http.post(expensesUrl, expenseJSON);
    postExpense.subscribe(
      message => this.service.fetchExpenses(),
      error => console.log(error),
      () => console.log('Expense Sent')
    )
  }

  sendIncomeCategory(name) {
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let date = new Date();
    let fullDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    let incomeCategoryJSON = {
      created_at: fullDate,
      deleted_at: null,
      id: 1,
      name: name,
      updated_at: fullDate
    }
    let postIncomeCategory = this.http.post(incomeCategoryUrl, incomeCategoryJSON);
    postIncomeCategory.subscribe(
      message => this.service.fetchIncomeCategories()
    )
  }

  sendExpenseCategory(name) {
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let date = new Date();
    let fullDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    let expenseCategoryJSON = {
      created_at: fullDate,
      deleted_at: null,
      id: 1,
      name: name,
      updated_at: fullDate
    }
    let postExpenseCategory = this.http.post(expenseCategoryUrl, expenseCategoryJSON);
    postExpenseCategory.subscribe(
      message => this.service.fetchExpenseCategories()
    )
  }

  deleteIncome(id) {
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let deleteIncome = this.http.delete(incomesUrl + id);
    deleteIncome.subscribe(
      message => this.service.fetchIncomes()
    )
  }

  deleteExpense(id) {
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let deleteExpense = this.http.delete(expensesUrl + id);
    deleteExpense.subscribe(
      message => this.service.fetchExpenses()
    )
  }

  //ONLY FOR DEVELOPMENT PURPOSES
  deleteIncomeCategory(num) {
    console.log("okida income");
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let deleteIncomeCategories = this.http.delete(`https://troskovnik.omniapps.info/api/v1/income-categories/${num.toString()}`, httpOptions);
    deleteIncomeCategories.subscribe(message => console.log(message));
  }

  //ONLY FOR DEVELOPMENT PURPOSES
  deleteExpenseCategory(num) {
    console.log("okida expense");
    //httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let deleteExpenseCategories = this.http.delete(`https://troskovnik.omniapps.info/api/v1/expense-categories/${num.toString()}`, httpOptions);
    deleteExpenseCategories.subscribe(message => console.log(message));
  }
}
