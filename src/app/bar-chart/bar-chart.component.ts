import { Component, OnInit, OnChanges, Input } from '@angular/core';
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
export class BarChartComponent implements OnInit, OnChanges {
  constructor(
    private store: Store<AppState>,
    private httpSendService: HttpSendService
  ) { }

  @Input() totalTransactions: number;
  @Input() incomeTotal: number;
  @Input() expenseTotal: number;
  @Input() filteredTransactionsArr: object[];
  @Input() show: string;

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  total: number;

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
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
          barPercentage: 0.35
        }
      ]
    }
  };

  colorArr = ['red', 'green'];

  barChartLabels = ['Expenses and Incomes'];
  barChartType = 'bar';
  barChartLegend = true;

  barChartData = [
    {
      data: [this.incomeTotal],
      label: 'Incomes',
      backgroundColor: 'rgb(74, 143, 200)',
      hoverBackgroundColor: 'rgb(94, 163, 220)',
      borderWidth: '1.5', borderColor: 'white',
      hoverBorderColor: 'white'
    },
    {
      data: [this.expenseTotal],
      label: 'Expenses',
      backgroundColor: 'rgb(210, 90, 117)',
      hoverBackgroundColor: 'rgb(230, 110, 137)',
      borderWidth: '1.5',
      borderColor: 'white',
      hoverBorderColor: 'white'
    }
  ];
  expenseDoughnutChartLabels = [];
  expenseDoughnutChartData = [];

  incomeDoughnutChartLabels = [];
  incomeDoughnutChartData = [];

  doughnutChartType = 'doughnut';

  updateChart() {
    this.expenseDoughnutChartData = [];
    this.expenseDoughnutChartLabels = [];
    this.incomeDoughnutChartData = [];
    this.incomeDoughnutChartLabels = [];
    for (const transaction of this.filteredTransactionsArr) {
      if (transaction[1].expense_category) {
        if (this.expenseDoughnutChartLabels.indexOf(transaction[1].expense_category.name) < 0) {
          this.expenseDoughnutChartLabels.push(transaction[1].expense_category.name);
          this.expenseDoughnutChartData.push(0);
        }
      } else if (transaction[1].income_category) {
        if (this.incomeDoughnutChartLabels.indexOf(transaction[1].income_category.name) < 0) {
          this.incomeDoughnutChartLabels.push(transaction[1].income_category.name);
          this.incomeDoughnutChartData.push(0);
        }
      }
    }
    for (const transaction of this.filteredTransactionsArr) {
      for (let j = 0; j < this.expenseDoughnutChartLabels.length; j++) {
        if (transaction[1].expense_category && transaction[1].expense_category.name === this.expenseDoughnutChartLabels[j]) {
          this.expenseDoughnutChartData[j] += parseFloat(transaction[1].amount);
        }
      }
      for (let j = 0; j < this.incomeDoughnutChartLabels.length; j++) {
        if (transaction[1].income_category && transaction[1].income_category.name === this.incomeDoughnutChartLabels[j]) {
          this.incomeDoughnutChartData[j] += parseFloat(transaction[1].amount);
        }
      }
    }
  }

  ngOnChanges(changes) {
    this.barChartData[0].data = [this.incomeTotal];
    this.barChartData[1].data = [this.expenseTotal];
    this.total = this.incomeTotal - this.expenseTotal;
    this.updateChart();
  }

  ngOnInit() {
  }
}
