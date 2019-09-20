import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() deleteEntry = new EventEmitter<string[]>();

  fadeOut: boolean = false;

  trackByFn(item, index) {
    return index;
  }

  deleteExpense($event) {
    this.deleteEntry.next([$event.target.id, $event.target.getAttribute("data-id")]);
  }

  ngOnInit() {

  }

}
