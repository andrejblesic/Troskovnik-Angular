import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IAppState } from '../models/general-models';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<IAppState>,
    private service: HttpSendService
  ) { }

  @ViewChild('dateInput', {static: false}) dateInput;

  expenseCategory: string;
  expenseEntryDate = '';
  expenseAmount = '';
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

  ngOnInit() {
    this.userSub = this.store.select(state => state.appState.user_info).subscribe(
      message => message ? this.userName = message.name : null
    );
    this.expenseCategories = this.store
      .select(state => state.appState.expense_categories)
      .pipe(share());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
