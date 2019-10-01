import { Component, OnInit } from '@angular/core';
import { dateRange } from '../store/actions';
import { Store } from '@ngrx/store';

interface AppState {
  appState: {
    dateRange: object;
    incomes: object;
    expenses: object;
    income_categories: object;
    expense_categories: object;
  };
}

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  startDate: number;
  endDate: number;

  setDateRange($event) {
    let startDate = $event.target.value.begin._d.getTime();
    let endDate = $event.target.value.end._d.getTime();
    this.store.dispatch(dateRange({startDate: startDate, endDate: endDate}))
  }

  ngOnInit() {
  }

}
