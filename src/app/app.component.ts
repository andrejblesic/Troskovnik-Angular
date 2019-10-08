import { Component, OnInit } from '@angular/core';
import { HttpFetchService } from './http-fetch.service';
import { HttpSendService } from './http-send.service';
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface AppState {
  appState: {
    expenses: object;
    incomes: object;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private loginService: LoginService,
    private httpFetchService: HttpFetchService
  ) {}

  title = 'troskovnik-angular';

  loading = true;

  userInfo = {
    grant_type: 'password',
    client_id: '2',
    client_secret: 'DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU',
    username: 'admin@troskovnik.omniapps.info',
    password: '1282Verbatim(',
    scope: ''
  };

  checkLoading(message) {
    if (
      message.appState.incomes &&
      message.appState.expenses &&
      message.appState.income_categories &&
      message.appState.expense_categories
    ) {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.loginService.login(this.userInfo);
    this.store.subscribe(message =>
      console.log('STATE UPDATED, NEW STATE:', message)
    );
  }
}
