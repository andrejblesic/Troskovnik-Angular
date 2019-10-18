import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../models/general-models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// username: 'admin@troskovnik.omniapps.info',
// password: '1282Verbatim(',

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private store: Store<IAppState>,
    private router: Router
  ) {}

  loggedInSub: Subscription;

  userInfo = {
    grant_type: 'password',
    client_id: '2',
    client_secret: 'DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU',
    username: 'admin@troskovnik.omniapps.info',
    password: '1282Verbatim(',
    scope: ''
  };

  login() {
    this.loginService.login(this.userInfo);
  }

  ngOnInit() {
    this.loggedInSub = this.store
      .select(state => state.appState.loggedIn)
      .subscribe(message => {
        if (message) {
          this.router.navigateByUrl('/dashboard');
        }
      });
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
