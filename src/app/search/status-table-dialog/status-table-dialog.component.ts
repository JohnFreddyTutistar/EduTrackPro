import { Component, OnInit } from '@angular/core';
import { IDataApplicantStatus } from 'src/app/interfaces/users';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-status-table-dialog',
  templateUrl: './status-table-dialog.component.html',
  styleUrls: ['./status-table-dialog.component.scss'],
})
export class StatusTableDialogComponent implements OnInit {

  id: string = ''
  data: any[] = [];

  ELEMENT_DATA: IDataApplicantStatus[] = [
    {
      identificationNumber: 1085310787,
      fullName: 'Ivan Dario Delgado Calvache',
      inscriptionDate: '05/09/2024',
      academicProgram: 'Ingeniería de Sistemas',
      status: 'EN REVISIÓN',
      // pymentStatus: 'APROBADO',
      // docsStatus: 'PENDIENTE',
      // interviewStatus: 'PENDIENTE',
      // testStatus: 'RECHAZADO'
    },
  ];

  documentsData = [
    {documentName: 'Diploma/Acta', status: 'Aprobado'},
    {documentName: 'Cédula/TI', status: 'Aprobado'},
    {documentName: 'Pruebas saber 11 (4 paginas)', status: 'Aprobado'},
  ]

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

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {

    this.dataApplicant(this.id)
  }

  dataApplicant(id: string){
    this.sharedService.getDataStatusApplicant(id).subscribe({
      next: res => {
        console.log("respuesta status applicant: ", res);
        this.data = res;
        console.log(this.data);
      }
    })
  }

}
