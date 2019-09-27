import { Component, OnInit } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IAppState } from '../models/income-expense-models';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit {

  constructor(private service: HttpSendService, private store: Store<IAppState>) { }

  // date
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  // date

  incomeCategory = "Razvoj softwarea";
  incomeEntryDate: string = "";
  incomeAmount: string = "";
  incomeDescription: string = "";
  incomeCategories: Observable<any>;
  incomeCategoryId: number = 1;
  userName: string;

  sendIncome() {
    this.service.sendIncome(
      this.incomeCategory,
      this.incomeEntryDate,
      this.incomeAmount,
      this.incomeDescription,
      this.incomeCategoryId,
      this.userName
    );
    this.incomeCategoryId = 1;
  }

  setDate($event) {
    console.log($event.target.value);
    this.incomeEntryDate = `${('0' + $event.target.value.getDate()).slice(
      -2
    )}/${('0' + ($event.target.value.getMonth() + 1)).slice(
      -2
    )}/${$event.target.value.getFullYear()}`;
  }

  setIncomeCategoryId($event) {
    this.incomeCategoryId = parseInt($event);
  }

  ngOnInit() {
    this.incomeCategories = this.store.select(state => state.appState.income_categories).pipe(share());
    this.store.select(state => state.appState.user_info).subscribe(
      message => message ? this.userName = message.name : null
    )
  }

}
