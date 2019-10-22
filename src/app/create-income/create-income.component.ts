import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { HttpFetchService } from '../http-fetch.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState } from '../models/general-models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit, OnDestroy {

  constructor(
    private httpSendService: HttpSendService,
    private httpFetchService: HttpFetchService,
    private store: Store<IAppState>,
    private _snackBar: MatSnackBar
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

  sendIncome(): void {
    if (!this.incomeCategory) {
      this.newIncomeForm.controls.incomeCategory.setErrors({incorrect: true})
    }
    if (!this.incomeCategory || !this.incomeEntryDate || !this.incomeAmount || !this.incomeDescription) {
      this.openSnackBar('Please fill out all the fields', 'Dismiss');
      return;
    }
    this.httpSendService.sendIncome(
      this.incomeCategory,
      this.incomeEntryDate,
      this.incomeAmount,
      this.incomeDescription,
      this.incomeCategoryId,
      this.userName
    ).subscribe(
      message => null,
      error => console.log(error),
      () => this.incomeSendSuccess()
    );
    this.incomeCategoryId = 1;
    this.newIncomeForm.reset();
    this.resetDate();
    for (const input in this.newIncomeForm.controls) {
      this.newIncomeForm.controls[input].setErrors(null);
    }
  }

  incomeSendSuccess(): void {
    this.httpFetchService.fetchIncomes();
    this.openSnackBar('Income successfully added', 'Dismiss');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  resetDate(): void {
    this.dateInput.nativeElement.value = '';
  }

  sendIncomeCategory(): void {
    if (!this.newIncomeCategory) {
      return;
    }
    this.httpSendService.sendIncomeCategory(this.newIncomeCategory).subscribe(
      message => null,
      error => console.log(error),
      () => this.incomeCategorySendSuccess()
    );
    this.newIncomeCategoryForm.reset();
    this.newIncomeCategoryForm.controls.newIncomeCategory.setErrors(null);
  }

  incomeCategorySendSuccess(): void {
    this.httpFetchService.fetchIncomeCategories();
    this.openSnackBar('Income category successfully added', 'Dismiss');
  }

  setDate($event): void {
    console.log(this.dateInput.nativeElement.value);
    this.incomeEntryDate = `${('0' + $event.target.value.getDate()).slice(
      -2
    )}/${('0' + ($event.target.value.getMonth() + 1)).slice(
      -2
    )}/${$event.target.value.getFullYear()}`;
    this.newIncomeForm.controls.incomeEntryDate.setErrors(null);
  }

  setIncomeCategoryId($event): void {
    this.incomeCategoryId = parseInt($event, 10);
  }

  updateValues(message): void {
    this.incomeCategory = message.incomeCategory;
    this.incomeAmount = message.incomeAmount;
    this.incomeDescription = message.incomeDescription;
  }

  handleNewCategory(message): void {
    this.newIncomeCategory = message.newIncomeCategory;
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
