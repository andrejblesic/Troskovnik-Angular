import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpFetchService } from './http-fetch.service';
import * as jwtDecode from 'jwt-decode';

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
    let user_info = jwtDecode(message.access_token);
    this.service.fetchUserInfo(user_info.sub);
    localStorage.setItem("access_token", message.access_token);
    this.service.updateStore();
  }
}
