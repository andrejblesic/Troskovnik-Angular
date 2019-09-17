import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Store } from '@ngrx/store';
import { share, map } from 'rxjs/operators';

interface AppState {
  appState: {
    expenses: object,
    incomes: object
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private httpService: HttpService, private store: Store<AppState>) { }
  title = 'troskovnik-angular';

  expenses: object;
  incomes: object;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

  userInfo = {
    grant_type: "password",
    client_id: "2",
    client_secret: "DhApJ7TQhVgtnjZEwYvNaSqrm4K9JU87TyrnNjcU",
    username: "admin@troskovnik.omniapps.info",
    password: "1282Verbatim(",
    scope: ""
  }

  ngOnInit() {
    this.httpService.login(this.userInfo);
    this.expenses = this.store.select(state => state.appState ? state.appState.expenses : null).pipe(
      share(),
      map(obj => {
        for (let item in obj) {
          this.totalExpenses += parseFloat(obj[item].amount);
        }
        return obj;
      })
    );
    this.incomes = this.store.select(state => state.appState ? state.appState.incomes : null).pipe(
      share(),
      map(obj => {
        for (let item in obj) {
          this.totalIncomes += parseFloat(obj[item].amount);
        }
        return obj;
      })
    );
    this.store.subscribe(
      message => console.log('STATE UPDATED, NEW STATE:', message)
    )
  }
}
