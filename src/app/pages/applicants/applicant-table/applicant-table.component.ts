import {
  ApplicationInitStatus,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import 'moment/locale/es';
import * as moment from 'moment';
import { IApplicant } from 'src/app/interfaces/users';
import { StatusTableDialogComponent } from 'src/app/search/status-table-dialog/status-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogApplicantComponent } from '../dialog-applicant/dialog-applicant.component';
import { RegisterCallComponent } from '../register-call/register-call.component';
import { DialogCallHistoryComponent } from '../dialog-call-history/dialog-call-history.component';
import { SharedService } from 'src/app/services/shared.service';
import { count, filter } from 'rxjs';
import { Router } from '@angular/router';
import { DialogEvaluationComponent } from '../dialog-evaluation/dialog-evaluation.component';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-applicant-table',
  templateUrl: './applicant-table.component.html',
  styleUrls: ['./applicant-table.component.scss'],
})
export class ApplicantTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort | undefined;

  FormGroupFilter!: FormGroup;

  applicants: any;

  filterOptions = [
    {
      filterValue: 'name',
      filterName: 'Nombre',
    },
    {
      filterValue: 'lastname',
      filterName: 'Apellido',
    },
    {
      filterValue: 'identificationNumber',
      filterName: 'Numero de identificación',
    },
    {
      filterValue: 'status',
      filterName: 'Estado',
    },
    {
      filterValue: 'phone',
      filterName: 'Celular',
    },
    {
      filterValue: 'email',
      filterName: 'Email',
    },
  ];

  dataSource: any = [];
  dataApplicants: IApplicant[] = [];

  filteredApplicants: any[] = [];

  counterByApplicantStatus: any = [];

  displayedColumns: string[] = [
    'position',
    'profilePhoto',
    'fullName',
    'identificationNumber',
    'status',
    'phoneNumber',
    'email',
    'finalResults',
    'callHistory',
    'actions',
  ];

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public sharedService: SharedService,
    public router: Router
  ) {
    this.filterForm();
  }

  filterForm() {
    this.FormGroupFilter = this.formBuilder.group({
      formControlFilterBy: [null],
      formControlFilterString: [null],
      formControlFilterFrom: [null],
      formControlFilterTo: [null],
      formControlFilterSelect: [null],
    });
  }

  applyFilterFast(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getter methods to easily access for controls

  get formControlFilterBy() {
    return this.FormGroupFilter.controls['formControlFilterBy'];
  }

  get formControlFilterString() {
    return this.FormGroupFilter.controls['formControlFilterString'];
  }

  get formControlFilterFrom() {
    return this.FormGroupFilter.controls['formControlFilterFrom'];
  }

  get formControlFilterTo() {
    return this.FormGroupFilter.controls['formControlFilterTo'];
  }

  get formControlFilterSelect() {
    return this.FormGroupFilter.controls['formControlFilterSelect'];
  }

  resetFilter(all: boolean) {}

  reset() {
    this.dataSource.data = [...this.dataApplicants];
  }

  applicantsData: any[] = [];

  ngOnInit() {
    // this.FormGroupFilter.valueChanges.subscribe((form) => {
    //   this.applyFilters(form);
    // });
    this.getDataApplicants();

    this.filterDataSource = this.dataSource;
  }

  statusCount: any = 0;

  statusCounts: {
    name: string;
    amount: number;
    color: string;
    class: string;
  }[] = [];

  filterDataSource: MatTableDataSource<IApplicant> =
    new MatTableDataSource<IApplicant>();

  countItems: number = 0;
  // status: string = '';

  permissions: any;

  getDataApplicants() {
    this.sharedService.getDataApplicantsNew().subscribe((data) => {
      this.applicants = data;
      this.dataSource = new MatTableDataSource<IApplicant>(this.applicants);
      console.log('data applicants: ', this.applicants);

      this.applicants.forEach((a: any) => {
        this.countItems++;
        a.rol = this.permissions;
        a.status = a.inscriptions[0].status;
        a.position = this.countItems;
        // console.log(a)
        a.actions = [
          {
            label: 'Ver proceso',
            permissions: '',
            optionClick: 0,
            dataClick: a.id,
            icon: 'visibility',
            class: '',
          },
          {
            label: 'Evaluar',
            permissions: '',
            optionClick: 4,
            dataClick: a.id,
            icon: 'assignment',
            class: '',
          },
          {
            label: 'Editar',
            permissions: '',
            optionClick: 1,
            dataClick: a.id,
            icon: 'edit',
            class: '',
          },
          {
            label: 'Registrar llamada',
            permissions: '',
            optionClick: 2,
            dataClick: a.id,
            icon: 'edit_note',
            class: '',
          },
          {
            label: 'Historial',
            permissions: '',
            optionClick: 3,
            dataClick: a.id,
            icon: 'history',
            class: '',
          },
        ];
      });

      const statusCount: { [key: string]: number } = {
        APROBADO: 0,
        'EN REVISIÓN': 0,
        DESISTIDO: 0,
        RECHAZADO: 0,
      };

      data.forEach((count: any) => {
        if (statusCount.hasOwnProperty(count.status)) {
          statusCount[count.status]++;
        }
      });

      console.log('para ver la data: ', data);

      this.statusCounts = [
        {
          name: 'APROBADO',
          amount: statusCount['APROBADO'],
          color: '#52be80',
          class: 'approved',
        },
        {
          name: 'EN REVISIÓN',
          amount: statusCount['EN REVISIÓN'],
          color: '#ffa621',
          class: 'revision',
        },
        {
          name: 'DESISTIDO',
          amount: statusCount['DESISTIDO'],
          color: '#009da8',
          class: 'givenUp',
        },
        {
          name: 'RECHAZADO',
          amount: statusCount['RECHAZADO'],
          color: '#d90000',
          class: 'rejected',
        },
      ];

      this.dataApplicants = data;

      this.counterByApplicantStatus = JSON.parse(
        JSON.stringify(this.sharedService.statusApplicant)
      );
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    });
  }

  filterByStatus(status: string): void {
    const filterData = this.dataSource.data.filter(
      (applicant: IApplicant) => applicant.status === status
    );
    this.dataSource.data = filterData;
  }

  clickButton(option: any, data: any, applicants: any) {
    switch (option) {
      case 0:
        const statusTable = this.dialog.open(StatusTableDialogComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '70%',
          data: {
            id: data,
            applicant: applicants,
          },
        });
        break;
      case 1:
        this.router.navigate(['profileApplicant', data]);
        break;
      case 2:
        const registerCall = this.dialog.open(RegisterCallComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '70%',
          data: {
            id: data,
            applicant: applicants,
          },
        });
        break;
      case 3:
        const callHistory = this.dialog.open(DialogCallHistoryComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '70%',
          data: {
            id: data,
            applicant: applicants,
          },
        });
        break;
      case 4:
        const evaluation = this.dialog.open(DialogEvaluationComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '80%',
          data: {
            id: data,
            applicant: applicants,
          },
        });
        break;
    }
  }

  generar() {
    console.log('datos para pdfmake: ', this.dataApplicants);

    const header = [
      { text: 'N°', bold: true, fillColor: '#D9E2F3' },
      { text: 'Fecha', bold: true, fillColor: '#D9E2F3' },
      {
        text: 'Nombres y apellidos',
        bold: true,
        fillColor: '#D9E2F3',
      },
      { text: 'Identificación', bold: true, fillColor: '#D9E2F3' },
      { text: 'Entrevista', bold: true, fillColor: '#D9E2F3' },
      { text: '60% entv', bold: true, fillColor: '#D9E2F3' },
      { text: 'Ap.Mat', bold: true, fillColor: '#D9E2F3' },
      { text: 'Lec-crit', bold: true, fillColor: '#D9E2F3' },
      { text: 'Prom.prueba', bold: true, fillColor: '#D9E2F3' },
      { text: 'T.pond', bold: true, fillColor: '#D9E2F3' },
      { text: 'T.admitir', bold: true, fillColor: '#D9E2F3' },
      { text: 'Estado', bold: true, fillColor: '#D9E2F3' },
    ];

    const body = [
      header,
      ...this.dataApplicants.map((applicant: any, index: number) => {
        const evalData = applicant.evaluation?.[0] ?? {};

        return [
          index + 1,
          moment(applicant.inscriptions[0].createdAt).format('DD/MM/YYYY'),
          [
            [
              applicant.firstName,
              applicant.secondName,
              applicant.firstLastName,
              applicant.secondLastName,
            ]
              .filter(Boolean)
              .join(' ') || 'Pendiente',
          ],
          applicant.identificationNumber,
          evalData.interview ?? '0',
          evalData.weightedInterview ?? '0',
          evalData.math ?? '0',
          evalData.readWrite ?? '0',
          evalData.averageTest ?? '0',
          evalData.weightedTest ?? '0',
          evalData.finalNote ?? '0',
          {
            text: evalData.status ?? 'PENDIENTE',
            fillColor:
              (evalData.status ?? 'PENDIENTE') === 'PENDIENTE'
                ? '#f7ed97'
                : evalData.status === 'APROBADO'
                ? '#b3dbb0'
                : evalData.status === 'RECHAZADO'
                ? '#eca69d'
                : null,
            bold: true,
          },
        ];
      }),
    ];

    console.log('data body: ', body);

    const pdfDefinition = {
      pageOrientation: 'landScape',
      content: [
        {
          image:'data:image/png;base64,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',
          width: 150,
        },
        {
          text: [
            {
              text: 'Reporte de aspirantes ' + '\n' + moment().format('DD/MM/YYYY'),
              bold: true,
              fontSize: 18,
              alignment: 'center',
              color: '#0e5093',
            },
          ],
        },

        { text: '\n' },

        {
          style: 'tableExample',
          table: {
            widths: [
              10,
              45,
              '*',
              60,
              // 45,
              38, // entre
              38,
              38,
              38,
              38,
              38,
              38, // t. admitir
              50,
            ],
            body: body,
          },
        },
      ],
      styles: {
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 8,
          alignment: 'center',
        },
      },
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
