import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { toggleNavbar } from '../store/actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../models/general-models';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  constructor(private store: Store<IAppState>, private breakpointObserver: BreakpointObserver) {}
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
}
