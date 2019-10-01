import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

import { MAT_DATE_LOCALE } from '@angular/material';
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
import { MaterialModule } from './material/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DateAdapter, MAT_DATE_FORMATS, SatDatepickerModule } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';

const appRoutes: Routes = [
  { path: 'incomes', component: IncomesComponent, data: { title: "Incomes" }},
  { path: 'expenses', component: ExpensesComponent, data: { title: "Expenses" }},
  { path: 'dashboard', component: DashboardComponent, data: { title: "Dashboard" }},
  { path: 'login', component: LoginComponent, data: { title: "Login" }},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'income_details/:id', component: TransactionDetailsComponent, data: {title: "Income Details", type: "income"}},
  { path: 'expense_details/:id', component: TransactionDetailsComponent, data: {title: "Expense Details", type: "expense"}}
]

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
    MainNavComponent,
    TransactionDetailsComponent,
    BarChartComponent,
    DateRangePickerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatNativeDateModule,
    StoreModule.forRoot({ appState: transactionReducer }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    ChartsModule,
    SatDatepickerModule
  ],
  providers: [
    HttpFetchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
