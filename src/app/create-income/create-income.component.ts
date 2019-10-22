import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState } from '../models/general-models';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit, OnDestroy {

  constructor(
    private service: HttpSendService,
    private store: Store<IAppState>
  ) { }

  @ViewChild('dateInput', {static: false}) dateInput;

  incomeCategory: string;
  incomeEntryDate = "";
  incomeAmount: number;
  incomeDescription: string;
  incomeCategories: Observable<any>;
  incomeCategoryId = 1;
  newIncomeCategory: string;
  userName: string;
  userSub: Subscription;

  newIncomeForm = new FormGroup({
    incomeCategory: new FormControl(null, [Validators.required]),
    incomeEntryDate: new FormControl(null, [Validators.required]),
    incomeAmount: new FormControl(null, [Validators.required]),
    incomeDescription: new FormControl(null, [Validators.required])
  });

  newIncomeCategoryForm = new FormGroup({
    newIncomeCategory: new FormControl()
  });

  sendIncome() {
    if (!this.incomeCategory) {
      this.newIncomeForm.controls.incomeCategory.setErrors({incorrect: true})
    }
    if (!this.incomeCategory || !this.incomeEntryDate || !this.incomeAmount || !this.incomeDescription) {
      return;
    }
    this.service.sendIncome(
      this.incomeCategory,
      this.incomeEntryDate,
      this.incomeAmount,
      this.incomeDescription,
      this.incomeCategoryId,
      this.userName
    );
    this.incomeCategoryId = 1;
    this.newIncomeForm.reset();
    this.resetDate();
    for (const input in this.newIncomeForm.controls) {
      this.newIncomeForm.controls[input].setErrors(null);
    }
  }

  resetDate() {
    this.dateInput.nativeElement.value = '';
  }

  sendIncomeCategory() {
    if (!this.newIncomeCategory) {
      return;
    }
    this.service.sendIncomeCategory(this.newIncomeCategory);
    this.newIncomeCategoryForm.reset();
  }

  setDate($event) {
    console.log(this.dateInput.nativeElement.value);
    this.incomeEntryDate = `${('0' + $event.target.value.getDate()).slice(
      -2
    )}/${('0' + ($event.target.value.getMonth() + 1)).slice(
      -2
    )}/${$event.target.value.getFullYear()}`;
    this.newIncomeForm.controls.incomeEntryDate.setErrors(null);
  }

  setIncomeCategoryId($event) {
    this.incomeCategoryId = parseInt($event, 10);
  }

  updateValues(message) {
    this.incomeCategory = message.incomeCategory;
    this.incomeAmount = message.incomeAmount;
    this.incomeDescription = message.incomeDescription;
  }

  handleNewCategory(message) {
    this.newIncomeCategory = message.newIncomeCategory;
  }

  ngOnInit() {
    this.newIncomeCategoryForm.valueChanges.subscribe(
      message => this.handleNewCategory(message)
    );
    this.newIncomeForm.valueChanges.subscribe(
      message => this.updateValues(message)
    );
    this.incomeCategories = this.store.select(state => state.appState.income_categories).pipe(share());
    this.userSub = this.store.select(state => state.appState.user_info).subscribe(
      message => message ? this.userName = message.name : null
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
