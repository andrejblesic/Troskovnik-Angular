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
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IAppState>,
    private httpSendService: HttpSendService,
    private httpFetchService: HttpFetchService,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('dateInput', { static: false }) dateInput;

  expenseCategory: string;
  expenseEntryDate = '';
  expenseAmount: number;
  expenseDescription: string;
  expenseCategories: Observable<any>;
  expenseCategoryId: number;
  newExpenseCategory: string;
  userName: string;
  userSub: Subscription;

  newExpenseForm = new FormGroup({
    expenseCategory: new FormControl(null, [Validators.required]),
    expenseEntryDate: new FormControl(null, [Validators.required]),
    expenseAmount: new FormControl(null, [Validators.required]),
    expenseDescription: new FormControl(null, [Validators.required])
  });

  newExpenseCategoryForm = new FormGroup({
    newExpenseCategory: new FormControl(null, [Validators.required])
  });

  sendExpense(): void {
    if (!this.expenseCategory) {
      this.newExpenseForm.controls.expenseCategory.setErrors({incorrect: true});
    }
    if (!this.expenseCategory || !this.expenseEntryDate || !this.expenseAmount || !this.expenseDescription) {
      this.openSnackBar('Please fill out all the fields', 'Dismiss');
      return;
    }
    this.httpSendService.sendExpense(
      this.expenseCategory,
      this.expenseEntryDate,
      this.expenseAmount,
      this.expenseDescription,
      this.expenseCategoryId,
      this.userName
    ).subscribe(
      message => null,
      error => console.log(error),
      () => this.expenseSendSuccess()
    );
    this.expenseCategoryId = 1;
    this.dateReset();
    this.newExpenseForm.reset();
    for (const input in this.newExpenseForm.controls) {
      this.newExpenseForm.controls[input].setErrors(null);
    }
  }

  expenseSendSuccess(): void {
    this.httpFetchService.fetchExpenses();
    this.openSnackBar('Expense successfully added', 'Dismiss');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendExpenseCategory(): void {
    if (!this.newExpenseCategory) {
      this.openSnackBar('Please fill out the field', 'Dismiss');
      return;
    }
    this.httpSendService.sendExpenseCategory(this.newExpenseCategory).subscribe(
      message => null,
      error => console.log(error),
      () => this.expenseCategorySendSuccess()
    );
    this.newExpenseCategoryForm.reset();
    this.newExpenseCategoryForm.controls.newExpenseCategory.setErrors(null);
  }

  expenseCategorySendSuccess(): void {
    this.httpFetchService.fetchExpenseCategories();
    this.openSnackBar('Expense category successfully added', 'Dismiss');
  }

  dateReset(): void {
    this.dateInput.nativeElement.value = '';
    this.expenseEntryDate = '';
  }

  setDate($event): void {
    console.log($event.target.value.getMonth());
    this.expenseEntryDate = `${('0' + $event.target.value.getDate()).slice(
      -2
    )}/${('0' + ($event.target.value.getMonth() + 1)).slice(
      -2
    )}/${$event.target.value.getFullYear()}`;
  }

  setExpenseCategoryId($event): void {
    this.expenseCategoryId = parseInt($event, 10);
  }

  updateValues(message): void {
    this.expenseCategory = message.expenseCategory;
    this.expenseAmount = message.expenseAmount;
    this.expenseDescription = message.expenseDescription;
  }

  handleNewCategory(message): void {
    this.newExpenseCategory = message.newExpenseCategory;
  }

  ngOnInit(): void {
    this.newExpenseCategoryForm.valueChanges.subscribe(
      message => this.handleNewCategory(message)
    );
    this.newExpenseForm.valueChanges.subscribe(
      message => this.updateValues(message)
    );
    this.userSub = this.store
      .select(state => state.appState.user_info)
      .subscribe(message => (message ? (this.userName = message.name) : null));
    this.expenseCategories = this.store
      .select(state => state.appState.expense_categories)
      .pipe(share());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
