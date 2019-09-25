import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {
  displayedColumns: string[] = [
    'category',
    'description',
    'entryDate',
    'amount'
  ];

  constructor() {}

  @Input() incomeAmount: string;
  @Input() incomeEntryDate: string;
  @Input() incomeDescription: string;
  @Input() incomeTotal: number;
  @Input() incomeDataSource: Observable<any>;
  @Output() deleteEntry = new EventEmitter<string[]>();

  incomesArray: object[] = [];

  trackByFn(index, item) {
    return index;
  }

  deleteIncome($event) {
    this.deleteEntry.next([
      $event.target.id,
      $event.target.getAttribute('data-id')
    ]);
  }
  handleMessage(message) {
    let result = Object.keys(message).map(key => {
      return [Number(key), message[key]];
    });
    this.incomesArray = result;
    console.log(result);
  }
  ngOnInit() {
    setTimeout(() => {
      this.incomeDataSource.subscribe(message => this.handleMessage(message));
    }, 2000);
  }
}
