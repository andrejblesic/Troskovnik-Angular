import { Component, OnInit } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface AppState {
  appState: {
    access_token: string,
    incomes: object,
    expenses: object,
    income_categories: object,
    expense_categories: object
  }
}

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit {

  constructor(private service: HttpSendService, private store: Store<AppState>) { }

  incomeCategory: string = "Consulting";
  incomeEntryDate: string = "09/09/2019";
  incomeAmount: string = "200.00";
  incomeDescription: string = "Test Description";
  incomeCategories: Observable<any>;
  incomeCategoryId: number = 1;

  sendIncome() {
    this.service.sendIncome(
      this.incomeCategory,
      this.incomeEntryDate,
      this.incomeAmount,
      this.incomeDescription,
      this.incomeCategoryId
    );
    this.incomeCategoryId = 1;
  }

  logDate($event) {
    console.log($event.target.value);
  }

  setIncomeCategoryId($event) {
    console.log(parseInt($event.target.value))
    this.incomeCategoryId = parseInt($event.target.value);
  }

  ngOnInit() {
    this.incomeCategories = this.store.select(state => state.appState.income_categories).pipe(share())
  }

}
