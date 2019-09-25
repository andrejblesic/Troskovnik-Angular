import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpFetchService } from './http-fetch.service';
import { CreateIncomeComponent } from './create-income/create-income.component';
import { LoginComponent } from './login/login.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomesComponent } from './incomes/incomes.component';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './store/reducers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateIncomeCategoryComponent } from './create-income-category/create-income-category.component';
import { CreateExpenseCategoryComponent } from './create-expense-category/create-expense-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    CreateIncomeComponent,
    LoginComponent,
    CreateExpenseComponent,
    ExpensesComponent,
    IncomesComponent,
    DashboardComponent,
    CreateIncomeCategoryComponent,
    CreateExpenseCategoryComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({appState: transactionReducer}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [HttpFetchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
