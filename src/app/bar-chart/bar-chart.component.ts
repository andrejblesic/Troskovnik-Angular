import { Component, OnInit } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

interface AppState {
  appState: {
    access_token: object;
    incomes: object;
    expenses: object;
    expenseCategories: string[];
    incomeCategories: string[];
  };
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private httpSendService: HttpSendService
  ) {}

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  incomeTotal: number;
  expenseTotal: number;
  total: number;
  incomeSub: Subscription;
  expenseSub: Subscription;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public barChartLabels = ['Expenses and Incomes'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Expenses' },
    { data: [], label: 'Incomes' }
  ];
  public doughnutChartLabels = [
    'Expenses Q1',
    'Expenses Q2',
    'Expenses Q3',
    'Expenses Q4'
  ];
  public doughnutChartData = [1200, 450, 330, 900];
  public doughnutChartType = 'doughnut';
  handleIncomes(message) {
    this.incomeTotal = 0;
    // tslint:disable-next-line: forin
    for (const item in message) {
      // tslint:disable-next-line: no-unused-expression
      message ? (this.incomeTotal += parseFloat(message[item].amount)) : null;
    }
    this.barChartData[1].data = [this.incomeTotal];
    console.log(this.incomeTotal);
  }

  handleExpenses(message) {
    this.expenseTotal = 0;
    // tslint:disable-next-line: forin
    for (const item in message) {
      // tslint:disable-next-line: no-unused-expression
      message ? (this.expenseTotal += parseFloat(message[item].amount)) : null;
    }
    this.barChartData[0].data = [this.expenseTotal];
    console.log(this.expenseTotal);
  }

  ngOnInit() {
    this.incomeSub = this.store
      .select(state => state.appState.incomes)
      .subscribe(message => this.handleIncomes(message));

    this.expenseSub = this.store
      .select(state => state.appState.expenses)
      .subscribe(message => this.handleExpenses(message));
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.incomeSub.unsubscribe();
    this.expenseSub.unsubscribe();
  }
}
