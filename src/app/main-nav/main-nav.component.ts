import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, share } from 'rxjs/operators';
import { toggleNavbar, loggedIn } from '../store/actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../models/general-models';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private breakpointObserver: BreakpointObserver,
    private loginService: LoginService
  ) {}

  loggedIn: Observable<any>;
  fullUserName: Observable<any>;

  showFiller = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  setNavbarOpenState() {
    this.store.dispatch(toggleNavbar(null));
  }

  logout() {
    this.loginService.logout();
  }

  ngOnInit() {
    this.loggedIn = this.store.select(state => state.appState.loggedIn).pipe(share());
    this.fullUserName = this.store.select(state => state.appState.user_info ? state.appState.user_info.name : null).pipe(share());
  }
}
