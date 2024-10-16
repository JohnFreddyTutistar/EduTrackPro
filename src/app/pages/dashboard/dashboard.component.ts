import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

interface analitycs {
  title: string;
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public reactiveAnalitycs: analitycs[] = [
    {
      title: 'Total',
      amount: 10,
    },
    {
      title: 'Aprobados',
      amount: 6,
    },
    {
      title: 'En revisión',
      amount: 1,
    },
    {
      title: 'Desistidos',
      amount: 1,
    },
  ];
  public titleLabels = ['Total', 'Aprobados', 'En revisión', 'Desistidos'];

  public config: any = {
    type: 'bar' as ChartType,
    data: {
      labels: ['Total', 'Aprobados', 'En revisión', 'Desistidos'],
      dataSet: [
        {
          label: 'aspirantes',
          data: [10, 6, 1, 1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      aspectRatio: 1,
    },
  };

  // charts = [
  //   {
  //     title: '',
  //     type: 'bar',
  //     label: [
  //       '1',
  //       '2',
  //       '3',
  //       '4'
  //     ],
  //     dataSet: [
  //       {
  //         data: [10, 6, 1, 1],
  //         label: this.titleLabels,
  //         tension: 0.3,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(255, 159, 64, 0.2)',
  //           'rgba(255, 205, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //         ],
  //         borderColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(255, 159, 64)',
  //           'rgb(255, 205, 86)',
  //           'rgb(75, 192, 192)',
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   }
  // ]

  constructor() {}

  chart: any;

  ngOnInit(): void {
    this.chart = new Chart('Mychart', this.config);
  }
}
