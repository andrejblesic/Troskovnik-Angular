import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpSendService } from '../http-send.service';
import { Store } from '@ngrx/store';
import { Subscription, Observable, from, of } from 'rxjs';
import { take } from 'rxjs/operators';

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
export class BarChartComponent implements OnInit, OnChanges {
  constructor(
    private store: Store<AppState>,
    private httpSendService: HttpSendService
  ) {}

  @Input() totalTransactions: number;

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  @Input() incomeTotal: number;
  @Input() expenseTotal: number;
  total: number;
  // incomeSub: Subscription;
  // expenseSub: Subscription;

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
      ],
      xAxes: [
        {
          barPercentage: 0.2
        }
      ]
    }
  };

  public barChartLabels = ['Expenses and Incomes'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [this.expenseTotal], label: 'Expenses' },
    { data: [this.incomeTotal], label: 'Incomes' }
  ];
  public doughnutChartLabels = [
    'Expenses Q1',
    'Expenses Q2',
    'Expenses Q3',
    'Expenses Q4'
  ];
  public doughnutChartData = [1200, 450, 330, 900];
  public doughnutChartType = 'doughnut';

  ngOnChanges(changes) {
    this.barChartData[1].data = [this.incomeTotal];
    this.barChartData[0].data = [this.expenseTotal];
    this.total = this.incomeTotal - this.expenseTotal;
  }

  ngOnInit() {
    this.barChartData[1].data = [this.incomeTotal];
    this.barChartData[0].data = [this.expenseTotal];
  }
}
