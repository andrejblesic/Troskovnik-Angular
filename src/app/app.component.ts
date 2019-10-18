import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpFetchService } from './http-fetch.service';
import { HttpSendService } from './http-send.service';
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IAppState } from './models/general-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IAppState>,
    private loginService: LoginService,
    private httpFetchService: HttpFetchService,
    private router: Router
  ) {}

  title = 'troskovnik-angular';
  loading = true;
  checkLoggedIn: Subscription;

  handleLoggedIn(message) {
    if (message) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    // dev only
    this.store.subscribe(
      message => console.log('State updated, new state: ', message)
    );
    this.checkLoggedIn = this.store.select(state => state.appState.loggedIn).subscribe(
      message => this.handleLoggedIn(message)
    );
  }

  ngOnDestroy() {
    this.checkLoggedIn.unsubscribe();
  }
}
