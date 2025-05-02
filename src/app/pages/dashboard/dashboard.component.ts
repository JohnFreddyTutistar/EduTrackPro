import { Component, OnInit } from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

// Registrar las escalas y elementos necesarios
Chart.register(
  LinearScale,
  BarElement,
  CategoryScale,
  BarController,
  Legend,
  Tooltip
);

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
  dataTable: { name: string; amount: number }[] = [];

  public chart: Chart | undefined;
  createChart() {
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Estado'],
        datasets: [
          {
            label: 'Total',
            data: [25],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1,
          },
          {
            label: 'Aprobados',
            data: [6],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
          {
            label: 'En revisión',
            data: [19],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1,
          },
          {
            label: 'Desistidos',
            data: [2],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          },
          {
            label: 'Rechazados',
            data: [1],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
      },
    });
  }

  public titleLabels = ['Total', 'Aprobados', 'En revisión', 'Desistidos'];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.createChart();
    this.getDataApplicants();
  }

  statusCount: any = 0;

  getDataApplicants() {
    this.sharedService.getDataApplicants().subscribe((data) => {
      const statusCount: { [key: string]: number } = {
        APROBADO: 0,
        'EN REVISIÓN': 0,
        DESISTIDO: 0,
        RECHAZADO: 0,
      };

      data.forEach((count) => {
        if (statusCount.hasOwnProperty(count.status)) {
          statusCount[count.status]++;
        }
      });

      this.dataTable = [
        {
          name: 'Total',
          amount:
            statusCount['APROBADO'] +
            statusCount['EN REVISIÓN'] +
            statusCount['DESISTIDO'] +
            statusCount['RECHAZADO'],
        },
        { name: 'Aprobados', amount: statusCount['APROBADO'] },
        { name: 'En revisión', amount: statusCount['EN REVISIÓN'] },
        { name: 'Desistidos', amount: statusCount['DESISTIDO'] },
        { name: 'Rechazados', amount: statusCount['RECHAZADO'] },
      ];

      console.log('contadores: ', statusCount);
    });
  }
}
