import { Component, OnInit } from '@angular/core';
import { HttpFetchService } from './http-fetch.service';
import { HttpSendService } from './http-send.service';
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IAppState } from './models/general-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private loginService: LoginService,
    private httpFetchService: HttpFetchService,
    private router: Router
  ) {}

  title = 'troskovnik-angular';

  loading = true;

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

  handleLoggedIn(message) {
    if (message) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    this.store.subscribe(
      message => console.log("State updated, new state: ", message)
    )
    this.store.select(state => state.appState.loggedIn).subscribe(
      message => this.handleLoggedIn(message)
    );
  }
}
