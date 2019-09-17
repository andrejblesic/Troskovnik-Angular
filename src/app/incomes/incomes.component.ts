import { Component, OnInit, Input } from '@angular/core';

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

  trackByFn(index, item) {
    return index;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('INCOME ARRAY: ', this.incomeArr)
    }, 5000)
  }

}
