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
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  constructor(private store: Store<AppState>, private service: HttpSendService) { }

  expenseCategory: string;
  expenseEntryDate: string = "";
  expenseAmount: string = "";
  expenseDescription: string = "";
  expenseCategories: Observable<any>;
  expenseCategoryId: number;

  sendExpense() {
    this.service.sendExpense(
      this.expenseCategory,
      this.expenseEntryDate,
      this.expenseAmount,
      this.expenseDescription,
      this.expenseCategoryId
    );
    this.expenseCategoryId = 1;
  }

  logDate($event) {
    this.expenseEntryDate = $event.target.value.split("-").reverse().join("/");
  }

  setExpenseCategoryId($event) {
    this.expenseCategoryId = parseInt($event.target.value);
  }

  ngOnInit() {
    this.expenseCategories = this.store.select(state => state.appState.expense_categories).pipe(share())
  }

}
