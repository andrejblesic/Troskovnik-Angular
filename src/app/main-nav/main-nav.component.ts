import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { toggleNavbar, loggedIn } from '../store/actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../models/general-models';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private breakpointObserver: BreakpointObserver
  ) {}

  loggedIn = false;
  fullUserName: string;

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
    this.store.dispatch(loggedIn({loggedIn: false}));
  }

  ngOnInit() {
    this.store.select(state => state.appState.loggedIn).subscribe(
      message => this.loggedIn = message
    );
    this.store.select(state => state.appState.user_info ? state.appState.user_info.name : null).subscribe(
      message => this.fullUserName = message
    )
  }
}
