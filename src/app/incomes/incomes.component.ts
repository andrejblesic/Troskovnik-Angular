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
  @Output() deleteEntry = new EventEmitter<string>();

  trackByFn(index, item) {
    return index;
  }

  callParent($event) {
    this.deleteEntry.next($event.target.id);
  }

  ngOnInit() {
    // let ids = [];
    // setTimeout(() => {
    //   for (let i = 0; i < this.incomeArr.length; i++) {
    //     ids.push(this.incomeArr[i].value.id);
    //   }
    //   console.log(Math.max(...ids));
    //   console.log(this.incomeArr);
    // }, 2000)
  }

}
