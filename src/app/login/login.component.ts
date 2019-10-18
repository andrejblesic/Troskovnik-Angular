import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../models/general-models';
import { Router } from '@angular/router';

// userInfo = {
//   grant_type: 'password',
//   client_id: '2',
//   client_secret: 'DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU',
//   username: 'admin@troskovnik.omniapps.info',
//   password: '1282Verbatim(',
//   scope: ''
// };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private store: Store<IAppState>,
    private router: Router
  ) { }

  userInfo = {
    grant_type: 'password',
    client_id: '2',
    client_secret: 'DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU',
    username: '',
    password: '',
    scope: ''
  };

  login() {
    this.loginService.login(this.userInfo);
  }

  ngOnInit() {
    this.store.select(state => state.appState.loggedIn).subscribe(
      message => {if(message) {this.router.navigateByUrl('/dashboard')}}
    )
  }
}
