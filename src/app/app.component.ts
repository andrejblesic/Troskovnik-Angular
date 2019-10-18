import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpFetchService } from './http-fetch.service';
import { HttpSendService } from './http-send.service';
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IAppState } from './models/general-models';
import { loggedIn } from './store/actions';

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

  userInfo = {
    grant_type: 'password',
    client_id: '2',
    client_secret: 'DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU',
    username: '',
    password: '',
    scope: ''
  };

  ngOnInit() {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.store.dispatch(loggedIn({loggedIn: true}));
      this.userInfo.username = localStorage.username;
      this.userInfo.password = localStorage.password;
      this.loginService.login(this.userInfo);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
    this.store.subscribe(
      message => console.log('State updated, new state: ', message)
    );
  }

  ngOnDestroy() {
    this.checkLoggedIn.unsubscribe();
  }
}
