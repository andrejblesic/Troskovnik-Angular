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

  test() {
    console.log("works");
  }

  sendIncome(incomeCategory, incomeEntryDate, incomeAmount, incomeDescription, incomeCategoryId) {
    console.log(incomeCategoryId);
    console.log("send service triggered");
    let date = new Date();
    this.store.subscribe(
      message => {
        httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${message.appState.access_token}`);
      }
    )
    let fullDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
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
    console.log(incomeJSON);
    let postIncome = this.http.post("https://troskovnik.omniapps.info/api/v1/incomes", incomeJSON, httpOptions);
    postIncome.subscribe(
      message => this.service.updateStore()
    )
  }

  deleteIncome(id) {
    this.store.subscribe(
      message => {
        httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${message.appState.access_token}`);
      }
    )
    let deleteLast = this.http.delete(`https://troskovnik.omniapps.info/api/v1/incomes/${id}`, httpOptions);
    deleteLast.subscribe(
      message => this.service.updateStore()
    )
  }

}
