import { Component, OnInit } from '@angular/core';
import { HttpSendService } from '../http-send.service';

@Component({
  selector: 'app-create-expense-category',
  templateUrl: './create-expense-category.component.html',
  styleUrls: ['./create-expense-category.component.scss']
})
export class CreateExpenseCategoryComponent implements OnInit {

  constructor(private service: HttpSendService) { }

  expenseCategoryName: string;

  sendExpenseCategory() {
    this.service.sendExpenseCategory(this.expenseCategoryName);
  }

  ngOnInit() {
  }

}
