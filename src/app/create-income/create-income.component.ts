import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IAppState } from '../models/general-models';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit, OnDestroy {

  constructor(private service: HttpSendService, private store: Store<IAppState>) { }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  incomeCategory = 'Razvoj softwarea';
  incomeEntryDate = '';
  incomeAmount = '';
  incomeDescription = '';
  incomeCategories: Observable<any>;
  incomeCategoryId = 1;
  newIncomeCategory: string;
  userName: string;
  userSub: Subscription;

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

  sendIncomeCategory() {
    this.service.sendIncomeCategory(this.newIncomeCategory);
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
    this.incomeCategoryId = parseInt($event, 10);
  }

  ngOnInit() {
    this.incomeCategories = this.store.select(state => state.appState.income_categories).pipe(share());
    this.userSub = this.store.select(state => state.appState.user_info).subscribe(
      message => message ? this.userName = message.name : null
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
