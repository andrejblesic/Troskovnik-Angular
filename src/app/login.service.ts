import { Injectable } from '@angular/core';
import { accessToken } from './store/actions';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpFetchService } from './http-fetch.service';

const authUrl: string = 'https://troskovnik.omniapps.info/oauth/token/';

interface AppState {
  payload: object
}

const httpOptions = {
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private store: Store<AppState>, private service: HttpFetchService, private http: HttpClient) { }

  login(userInfo) {
    let httpLogin = this.http.post(authUrl, userInfo);
    httpLogin.subscribe(
      message => this.setAccessToken(message),
      error => console.log(error),
      () => console.log('Login successful')
    );
  }

  setAccessToken(message) {
    localStorage.setItem("access_token", message.access_token);
    console.log(message.access_token);
    this.service.updateStore();
  }
}
