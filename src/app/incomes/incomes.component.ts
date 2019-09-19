import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {

  constructor() { }

  @Input() incomeAmount: string;
  @Input() incomeEntryDate: string;
  @Input() incomeDescription: string;
  @Input() incomeTotal: number;
  @Input() incomeArr: string[];
  @Output() deleteEntry = new EventEmitter<string[]>();

  trackByFn(index, item) {
    return index;
  }

  deleteIncome($event) {
    this.deleteEntry.next([$event.target.id, $event.target.getAttribute("data-id")]);
  }

  ngOnInit() {

  }
}
