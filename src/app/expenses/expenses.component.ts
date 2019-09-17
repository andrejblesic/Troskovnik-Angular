import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  constructor() { }

  @Input() expenseAmount: string;
  @Input() expenseEntryDate: string;
  @Input() expenseDescription: string;
  @Input() expenseTotal: number;
  @Input() expenseArr: string[];

  trackByFn(item, index) {
    return index;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log("EXPENSE ARRAY", this.expenseArr)
    }, 5000);
  }

}
