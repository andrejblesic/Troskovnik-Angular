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
  ) {}

  @Input() totalTransactions: number;
  @Input() incomeTotal: number;
  @Input() expenseTotal: number;
  @Input() filteredTransactionsArr: object[];

  incomeArr: object[] = [];
  expenseArr: object[] = [];
  allTransactionsArr: object[] = [];
  total: number;

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
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  updateChart() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    console.log(this.filteredTransactionsArr);
    for (const transaction in this.filteredTransactionsArr) {
      if (this.filteredTransactionsArr[transaction][1].expense_category) {
        if (this.doughnutChartLabels.indexOf(this.filteredTransactionsArr[transaction][1].expense_category.name) < 0) {
          this.doughnutChartLabels.push(this.filteredTransactionsArr[transaction][1].expense_category.name);
          this.doughnutChartData.push(0);
        }
      }
    }
    for (let i = 0; i < this.filteredTransactionsArr.length; i++) {
      for (let j = 0; j < this.doughnutChartLabels.length; j++) {
        if (this.filteredTransactionsArr[i][1].expense_category && this.filteredTransactionsArr[i][1].expense_category.name === this.doughnutChartLabels[j]) {
          this.doughnutChartData[j] += parseFloat(this.filteredTransactionsArr[i][1].amount);
        }
      }
    }
  }

  ngOnChanges(changes) {
    this.barChartData[1].data = [this.incomeTotal];
    this.barChartData[0].data = [this.expenseTotal];
    this.total = this.incomeTotal - this.expenseTotal;
    this.updateChart();
  }

  ngOnInit() {
    // this.barChartData[1].data = [this.incomeTotal];
    // this.barChartData[0].data = [this.expenseTotal];
  }
}
