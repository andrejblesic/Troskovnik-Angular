import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpFetchService } from './http-fetch.service';
import { IAppState } from './models/general-models';
import { Observable } from 'rxjs';

const incomesUrl = 'https://troskovnik.omniapps.info/api/v1/incomes/';
const expensesUrl = 'https://troskovnik.omniapps.info/api/v1/expenses/';
const incomeCategoriesUrl =
  'https://troskovnik.omniapps.info/api/v1/income-categories/';
const expenseCategoriesUrl =
  'https://troskovnik.omniapps.info/api/v1/expense-categories/';

@Injectable({
  providedIn: 'root'
})
export class HttpSendService {
  constructor(
    private store: Store<IAppState>,
    private http: HttpClient,
    private service: HttpFetchService
  ) {}

  sendIncome(
    incomeCategory: string,
    incomeEntryDate: string,
    incomeAmount: number,
    incomeDescription: string,
    incomeCategoryId: number,
    userName: string
  ): Observable<any> {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${(
      '0' + date.getHours()
    ).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${(
      '0' + date.getSeconds()
    ).slice(-2)}`;
    const incomeJSON = {
      amount: incomeAmount,
      created_at: fullDate,
      deleted_at: null,
      description: incomeDescription,
      entry_date: incomeEntryDate.replace(/\//g, '.'),
      id: null,
      created_by: userName,
      income_category: {
        id: null,
        name: incomeCategory,
        created_at: fullDate,
        updated_at: fullDate,
        deleted_at: null
      },
      income_category_id: incomeCategoryId,
      updated_at: fullDate
    };
    const postIncome = this.http.post(incomesUrl, incomeJSON);
    return postIncome;
  }

  sendExpense(
    expenseCategory: string,
    expenseEntryDate: string,
    expenseAmount: number,
    expenseDescription: string,
    expenseCategoryId: number,
    userName: string
  ): Observable<any> {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${(
      '0' + date.getHours()
    ).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${(
      '0' + date.getSeconds()
    ).slice(-2)}`;
    const expenseJSON = {
      amount: expenseAmount,
      created_at: fullDate,
      deleted_at: null,
      description: expenseDescription,
      entry_date: expenseEntryDate.replace(/\//g, '.'),
      id: 1,
      created_by: userName,
      expense_category: {
        id: 1,
        name: expenseCategory,
        created_at: fullDate,
        updated_at: fullDate,
        deleted_at: null
      },
      expense_category_id: expenseCategoryId,
      updated_at: fullDate
    };
    const postExpense = this.http.post(expensesUrl, expenseJSON);
    return postExpense;
  }

  sendIncomeCategory(name: string): Observable<any> {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${(
      '0' + date.getHours()
    ).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${(
      '0' + date.getSeconds()
    ).slice(-2)}`;
    const incomeCategoryJSON = {
      created_at: fullDate,
      deleted_at: null,
      id: 1,
      name,
      updated_at: fullDate
    };
    const postIncomeCategory = this.http.post(
      incomeCategoriesUrl,
      incomeCategoryJSON
    );
    return postIncomeCategory;
  }

  sendExpenseCategory(name: string) {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${(
      '0' + date.getHours()
    ).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${(
      '0' + date.getSeconds()
    ).slice(-2)}`;
    const expenseCategoryJSON = {
      created_at: fullDate,
      deleted_at: null,
      id: 1,
      name,
      updated_at: fullDate
    };
    const postExpenseCategory = this.http.post(
      expenseCategoriesUrl,
      expenseCategoryJSON
    );
    return postExpenseCategory;
  }

  deleteIncome(id) {
    const deleteIncome = this.http.delete(incomesUrl + id);
    return deleteIncome;

    // subscribe(message => this.service.fetchIncomes());
  }

  deleteExpense(id) {
    const deleteExpense = this.http.delete(expensesUrl + id);
    return deleteExpense;

    // subscribe(message => this.service.fetchExpenses());
  }
}
