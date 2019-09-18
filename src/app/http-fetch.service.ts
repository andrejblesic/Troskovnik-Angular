import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allExpenses, allIncomes, accessToken, incomeCategories } from './store/actions';
import { Store } from '@ngrx/store';

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

  private access_token: string;

  login(userInfo) {
    let httpLogin = this.http.post('https://troskovnik.omniapps.info/oauth/token', userInfo);
    httpLogin.subscribe(
      message => this.updateStore(message),
      error => console.log(error),
      () => console.log('Login successful')
    );
  }

  updateStore(message) {
    if (!this.access_token) {
      this.access_token = message.access_token;
    }
    this.store.dispatch(accessToken({
      access_token: this.access_token
    }))
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.access_token}`);
    const httpExpenses = this.http.get("https://troskovnik.omniapps.info/api/v1/expenses", httpOptions);
    const httpIncomes = this.http.get("https://troskovnik.omniapps.info/api/v1/incomes", httpOptions);
    const httpIncomeCategories = this.http.get("https://troskovnik.omniapps.info/api/v1/income-categories", httpOptions);
    httpExpenses.subscribe(
      message => this.dispatchExpenses(message),
      error => console.log(error),
      () => console.log('Expenses Fetched')
    );
    httpIncomes.subscribe(
      message => this.dispatchIncomes(message),
      error => console.log(error),
      () => console.log('Incomes Fetched')
    );
    httpIncomeCategories.subscribe(
      message => this.dispatchIncomeCategories(message),
      error => console.log(error),
      () => console.log("Income Categories Fetched")
    )
  }

  dispatchIncomeCategories(message) {
    console.log(message.data);
    this.store.dispatch(incomeCategories({
      income_categories: message.data
    }))
  }

  dispatchExpenses(message) {
    message.data ? this.store.dispatch(allExpenses({
      expenses: message.data
    })) : null;
  }

  dispatchIncomes(message) {
    console.log('MESSAGE DATA RIGHT HERE ', message.data)
    message.data ? this.store.dispatch(allIncomes({
      incomes: message.data
    })) : null;
  }
}
