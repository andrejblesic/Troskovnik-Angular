import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  constructor() { }

  expenseCategory: string = "Hosting";
  expenseEntryDate: string = "2019-09-18";
  expenseAmount: string = "200.00";
  expenseDescription: string = "Test Description";
  newExpenseId: number;

  ngOnInit() {
  }

}
