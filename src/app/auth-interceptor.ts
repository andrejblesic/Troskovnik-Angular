import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { LoginService } from './login.service';
import { Observable } from 'rxjs';

interface AppState {
  appState: {
    access_token: string,
    incomes: object,
    expenses: object,
    income_categories: object,
    expense_categories: object
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: LoginService, private store: Store<AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    return next.handle(request);
  }
}
