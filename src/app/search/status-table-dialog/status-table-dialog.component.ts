import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { IDataApplicantStatus } from 'src/app/interfaces/users';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-status-table-dialog',
  templateUrl: './status-table-dialog.component.html',
  styleUrls: ['./status-table-dialog.component.scss'],
})
export class StatusTableDialogComponent implements OnInit {
  id: string = '';
  data: any[] = [];

  academicProgram: any;

  statusInscription: any;

  dateInscription: any;

  documentsData = [
    { documentName: 'Diploma/Acta', status: 'Pendiente' },
    { documentName: 'Cédula/TI', status: 'Pendiente' },
    { documentName: 'Pruebas saber 11 (4 paginas)', status: 'Pendiente' },
  ];

  stagesTimeLine: Array<any> = [
    {
      title: 'Pago',
      date: '08/09/24',
      Description: 'aprobado',
    },
    {
      title: 'Docs',
      date: 'pendiente',
      Description: 'pendiente',
    },
    // {
    //   title: 'Entrevista',
    //   date: 'pendiente',
    //   Description: 'pendiente',
    // },
    // {
    //   title: 'Prueba',
    //   date: 'pendiente',
    //   Description: 'pendiente',
    // },
  ];

  constructor(
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public dataApplicantDialog: any
  ) {}

  dataApplicants: any;
  newFormatDateInscription: any;

  ngOnInit(): void {
    this.dataApplicantDialog.applicant.filter((item: any) => {
      if (item.id === this.dataApplicantDialog.id) {
        this.dataApplicants = item;
        this.academicProgram = item.inscriptions[0].program.faculty;
        this.statusInscription = item.inscriptions[0].status;
        this.dateInscription = item.inscriptions[0].createdAt;
        this.newFormatDateInscription = moment(this.dateInscription).format(
          'DD/MM/YYYY'
        );
        console.log('dialog data: ', this.dataApplicants);
      }
    });

    // this.dataApplicant(this.id);
  }

  // dataApplicant(id: string) {
  //   this.sharedService.getDataStatusApplicant(id).subscribe({
  //     next: (res) => {
  //       console.log('respuesta status applicant: ', res);
  //       this.data = res;
  //       console.log(this.data);
  //     },
  //   });
  // }
}
