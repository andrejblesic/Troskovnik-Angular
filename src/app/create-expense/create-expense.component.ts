import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
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
    private service: HttpSendService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild('dateInput', { static: false }) dateInput;

  expenseCategory: string;
  expenseEntryDate = '';
  expenseAmount = null;
  expenseDescription = '';
  expenseCategories: Observable<any>;
  expenseCategoryId: number;
  newExpenseCategory: string;
  userName: string;
  userSub: Subscription;

  sendExpense() {
    this.service.sendExpense(
      this.expenseCategory,
      this.expenseEntryDate,
      this.expenseAmount,
      this.expenseDescription,
      this.expenseCategoryId,
      this.userName
    );
    this.expenseCategoryId = 1;
    this.dateReset();
  }

  sendExpenseCategory() {
    this.service.sendExpenseCategory(this.newExpenseCategory);
  }

  dateReset() {
    this.dateInput.nativeElement.value = '';
    this.expenseEntryDate = '';
  }

  setDate($event) {
    console.log($event.target.value.getMonth());
    this.expenseEntryDate = `${('0' + $event.target.value.getDate()).slice(
      -2
    )}/${('0' + ($event.target.value.getMonth() + 1)).slice(
      -2
    )}/${$event.target.value.getFullYear()}`;
  }

  setExpenseCategoryId($event) {
    this.expenseCategoryId = parseInt($event, 10);
  }

  openSnackBar(message: string, action: string) {
    console.log(this.expenseAmount, this.expenseDescription);
    if (this.expenseAmount !== null
      && this.expenseCategory === null
      && this.expenseEntryDate !== ''
      && this.expenseDescription !== null
    ) {
      this._snackBar.open(message, action, { duration: 2000 });
    }
  }

  ngOnInit() {
    this.userSub = this.store
      .select(state => state.appState.user_info)
      .subscribe(message => (message ? (this.userName = message.name) : null));
    this.expenseCategories = this.store
      .select(state => state.appState.expense_categories)
      .pipe(share());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
