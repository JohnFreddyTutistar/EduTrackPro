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
      status: 'EN PROGRESO',
      // pymentStatus: 'APROBADO',
      // docsStatus: 'PENDIENTE',
      // interviewStatus: 'PENDIENTE',
      // testStatus: 'RECHAZADO'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
