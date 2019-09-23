import { Component, OnInit } from '@angular/core';
import { HttpSendService } from '../http-send.service';

@Component({
  selector: 'app-create-income-category',
  templateUrl: './create-income-category.component.html',
  styleUrls: ['./create-income-category.component.scss']
})
export class CreateIncomeCategoryComponent implements OnInit {

  constructor(private service: HttpSendService) { }

  public incomeCategoryName: string;

  sendIncomeCategory() {
    this.service.sendIncomeCategory(this.incomeCategoryName);
  }

  ngOnInit() {
  }

}
