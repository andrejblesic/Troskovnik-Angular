import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpFetchService } from './http-fetch.service';

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

  sendIncome(incomeCategory, incomeEntryDate, incomeAmount, incomeDescription, incomeCategoryId) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let date = new Date();
    let fullDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    let incomeJSON = {
      amount: incomeAmount,
      created_at: fullDate,
      deleted_at: null,
      description: incomeDescription,
      entry_date: incomeEntryDate.replace(/\//g, "."),
      id: 1,
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
    let postIncome = this.http.post('https://troskovnik.omniapps.info/api/v1/incomes', incomeJSON, httpOptions);
    postIncome.subscribe(
      message => this.service.updateIncomes(),
      error => console.log(error),
      () => console.log('Income Sent')
    )
  }

  sendExpense(expenseCategory, expenseEntryDate, expenseAmount, expenseDescription, expenseCategoryId) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
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
    let postExpense = this.http.post('https://troskovnik.omniapps.info/api/v1/expenses', expenseJSON, httpOptions);
    postExpense.subscribe(
      message => this.service.updateExpenses(),
      error => console.log(error),
      () => console.log('Expense Sent')
    )
  }

  deleteIncome(id) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let deleteIncome = this.http.delete(`https://troskovnik.omniapps.info/api/v1/incomes/${id}`, httpOptions);
    deleteIncome.subscribe(
      message => this.service.updateIncomes()
    )
  }

  deleteExpense(id) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.service.access_token}`);
    let deleteExpense = this.http.delete(`https://troskovnik.omniapps.info/api/v1/expenses/${id}`, httpOptions);
    deleteExpense.subscribe(
      message => this.service.updateExpenses()
    )
  }

}
