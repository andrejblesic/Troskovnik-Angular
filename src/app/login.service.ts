import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpFetchService } from './http-fetch.service';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { loggedIn } from './store/actions';

const authUrl = 'https://troskovnik.omniapps.info/oauth/token/';

interface AppState {
  payload: object;
}

const httpOptions = {
  headers: new HttpHeaders({})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private store: Store<AppState>,
    private service: HttpFetchService,
    private http: HttpClient,
    private router: Router
  ) { }

  login(userInfo) {
    const httpLogin = this.http.post(authUrl, userInfo);
    httpLogin.subscribe(
      message => this.setAccessToken(message),
      error => console.log(error),
      () => this.loginSuccess()
    );
  }

  loginSuccess() {
    this.store.dispatch(loggedIn({loggedIn: true}));
    this.router.navigateByUrl('/dashboard');
  }

  setAccessToken(message) {
    const userInfo = jwtDecode(message.access_token);
    this.service.fetchUserInfo(userInfo.sub);
    localStorage.setItem('access_token', message.access_token);
    this.service.updateStore();
  }
}
