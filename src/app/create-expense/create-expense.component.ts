import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpSendService } from '../http-send.service';
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

  newExpenseForm = new FormGroup({
    expenseCategory: new FormControl([Validators.required]),
    expenseEntryDate: new FormControl([Validators.required]),
    expenseAmount: new FormControl([Validators.required]),
    expenseDescription: new FormControl([Validators.required])
  });

  newExpenseCategoryForm = new FormGroup({
    newExpenseCategory: new FormControl(null, [Validators.required])
  });

  sendExpense($event): void {
    if (!this.expenseCategory) {
      this.newExpenseForm.controls.expenseCategory.setErrors({incorrect: true})
    }
    if (!this.expenseCategory || !this.expenseEntryDate || !this.expenseAmount || !this.expenseDescription) {
      return;
    }
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
    this.newExpenseForm.reset();
    for (const input in this.newExpenseForm.controls) {
      this.newExpenseForm.controls[input].setErrors(null);
    }
  }

  sendExpenseCategory(): void {
    console.log(this.newExpenseCategoryForm)
    if (this.newExpenseCategory) {
      this.service.sendExpenseCategory(this.newExpenseCategory);
      this.newExpenseCategoryForm.reset();
      this.newExpenseCategoryForm.controls.newExpenseCategory.setErrors(null);
    }
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
    if (this.expenseAmount !== null
      && this.expenseCategory === null
      && this.expenseEntryDate !== ''
      && this.expenseDescription !== null
    ) {
      this._snackBar.open(message, action, { duration: 2000 });
    }
  }

  updateValues(message) {
    this.expenseCategory = message.expenseCategory;
    this.expenseAmount = message.expenseAmount;
    this.expenseDescription = message.expenseDescription;
  }

  handleNewCategory(message) {
    this.newExpenseCategory = message.newExpenseCategory;
  }

  ngOnInit() {
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

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
