import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dataUserStatus } from 'src/app/interfaces/users';


@Component({
  selector: 'app-status-table-dialog',
  templateUrl: './status-table-dialog.component.html',
  styleUrls: ['./status-table-dialog.component.scss'],
})
export class StatusTableDialogComponent implements OnInit {

  ELEMENT_DATA: dataUserStatus[] = [
    {
      identificationNumber: 1085310787,
      fullName: 'John Freddy Tutistar Calvache',
      inscriptionDate: '05/09/2024',
      academicProgram: 'Ingeniería de Sistemas',
      status: 'EN REVISIÓN',
      // pymentStatus: 'APROBADO',
      // docsStatus: 'PENDIENTE',
      // interviewStatus: 'PENDIENTE',
      // testStatus: 'RECHAZADO'
    },
  ];

  stagesTimeLine: Array<any> = [
    {
      title: 'pago',
      date: '08/09/24',
      Description: 'aprobado'
    },
    {
      title: 'docs',
      date: '11/09/24',
      Description: 'aprobado'
    },
    {
      title: 'entrevista',
      date: '15/09/24',
      Description: 'pendiente'
    },
    {
      title: 'prueba',
      date: 'pendiente',
      Description: 'pendiente'
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
