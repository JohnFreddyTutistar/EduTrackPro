import { Component, OnInit } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
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

  dataTable: { name: string, amount: number }[] = [];


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


  public titleLabels = ['Total', 'Aprobados', 'En revisión', 'Desistidos'];


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

      this.dataTable = [
        { 
          name: 'Total', 
          amount: (statusCount['APROBADO'] +
                   statusCount['EN REVISIÓN'] + 
                   statusCount['DESISTIDO'] + 
                   statusCount['RECHAZADO'])
        },
        { name: 'Aprobados', amount: statusCount['APROBADO'] },
        { name: 'En revisión', amount: statusCount['EN REVISIÓN'] },
        { name: 'Desistidos', amount: statusCount['DESISTIDO'] },
        { name: 'Rechazados', amount: statusCount['RECHAZADO'] },
      ]

      console.log("contadores: ", statusCount);
      
    })
  }
}
