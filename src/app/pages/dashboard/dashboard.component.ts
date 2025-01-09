import { Component, OnInit } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartType, LinearScale } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

// Registrar las escalas y elementos necesarios
Chart.register(LinearScale, BarElement, CategoryScale, BarController);

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

  counterByApplicantStatus: any = [];


  public chart: Chart | undefined;
  createChart() {
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Total', 'Aprobados', 'En revisión', 'Desistidos', 'Rechazados'],
        datasets: [{
          label: 'Total',
          data: [21, 11, 4, 2, 4],
          backgroundColor: [
            '#009da8',
            '#001ca8',
            '#1295d7',
            '#009da8',
            '#d90000'
          ],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



  public reactiveAnalitycs: analitycs[] = [
    {
      title: 'Total',
      amount: 21,
    },
    {
      title: 'Aprobados',
      amount: 11,
    },
    {
      title: 'En revisión',
      amount: 4,
    },
    {
      title: 'Desistidos',
      amount: 2,
    },
    {
      title: 'Rechazados',
      amount: 4,
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

  constructor(private sharedService: SharedService) {}


  ngOnInit(): void {
    this.createChart()
    this.getDataApplicants()
  }

  statusCount: any = 0;

  getDataApplicants(){
    this.sharedService.getDataApplicants().subscribe((data) => {
      const statusCount: { [key:string]:number } = {
        'APROBADO': 0,
        'EN REVISIÓN': 0,
        'DESISTIDO': 0,
        'RECHAZADO': 0
      };

      data.forEach(count => {
        
        if (statusCount.hasOwnProperty(count.status)) {
          statusCount[count.status]++;
        }
        
      });

      this.statusCount = statusCount;

      console.log("contadores: ", statusCount);
      
    })
  }
}
