import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateIncomeComponent } from './create-income/create-income.component';
import { LoginComponent } from './login/login.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomesComponent } from './incomes/incomes.component';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    CreateIncomeComponent,
    LoginComponent,
    CreateExpenseComponent,
    ExpensesComponent,
    IncomesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({appState: transactionReducer})
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
