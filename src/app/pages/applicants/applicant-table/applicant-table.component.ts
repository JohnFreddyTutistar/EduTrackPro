import { ApplicationInitStatus, Component, OnInit, ViewChild } from '@angular/core';
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
import { filter } from 'rxjs';

@Component({
  selector: 'app-applicant-table',
  templateUrl: './applicant-table.component.html',
  styleUrls: ['./applicant-table.component.scss'],
})
export class ApplicantTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort | undefined;

  FormGroupFilter!: FormGroup;

  applicants: any

  filterOptions = [
    {
      filterValue: 'name',
      filterName: 'Nombre'
    },
    {
      filterValue: 'lastname',
      filterName: 'Apellido'
    },
    {
      filterValue: 'identificationNumber',
      filterName: 'Numero de identificación'
    },
    {
      filterValue: 'datebirth',
      filterName: 'Fecha de nacimiento'
    },
    {
      filterValue: 'status',
      filterName: 'Estado'
    },
    {
      filterValue: 'phone',
      filterName: 'Celular'
    },
    {
      filterValue: 'email',
      filterName: 'Email'
    },
  ]

  dataSource: any = [];
  dataApplicants: IApplicant[] = []

  filteredApplicants: any[] = [];

  counterByApplicantStatus: any = [];

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullName',
    'identificationNumber',
    'status',
    'phoneNumber',
    'email',
    'callHistory',
    'settings',
  ];

  dialogStatusTable() {
    this.dialog.open(StatusTableDialogComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '70%',
      data: {},
    });
  }

  dialogUpdateUser() {
    this.dialog.open(DialogApplicantComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '70%',
      data: {},
    });
  }

  registerCall() {
    this.dialog.open(RegisterCallComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '50%',
      data: {},
    });
  }

  // checkHistory(aspirante: any) {
  //   this.dialog.open(DialogCallHistoryComponent, {
  //     maxWidth: '500vw',
  //     maxHeight: '90vh',
  //     width: '70%',
  //     data: {
  //       id: aspirante.id,
  //       aspirante: aspirante,
  //     },
  //   });
  //   console.log("id aspirante: ", aspirante.id)
  // }

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public sharedService: SharedService
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

  applyFilterFast(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
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

  resetFilter(all: boolean) {
    
  }

  reset(){
    this.dataSource.data = [...this.dataApplicants]
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

  statusCounts: { name: string, amount: number, color: string, class: string}[] = [];

  filterDataSource : MatTableDataSource<IApplicant> = new MatTableDataSource<IApplicant>()

  actions: any[] = []

  getDataApplicants(){
    this.sharedService.getDataApplicantsNew().subscribe((data) => {
      console.log("data de los aplicantes: ", data);
      this.applicants = data;
      this.dataSource = new MatTableDataSource<IApplicant>(data);

      data.forEach((a: any) => {
        console.log("a: ", a);
        this.actions = [
          {
            label: 'Ver proceso',
            permissions: '',
            optionClick: 0,
            dataClick: a.id,
            icon: 'visibility',
            class: ''
          },
          {
            label: 'Editar',
            permissions: '',
            optionClick: 1,
            dataClick: a.id,
            icon: 'edit',
            class: ''
          },
          {
            label: 'Registrar llamada',
            permissions: '',
            optionClick: 2,
            dataClick: a.id,
            icon: 'edit_note',
            class: ''
          },
          {
            label: 'Historial',
            permissions: '',
            optionClick: 3,
            dataClick: a.id,
            icon: 'history',
            class: ''
          },
        ]

      })

      

      const statusCount: { [key: string]: number } = {
        'APROBADO': 0,
        'EN REVISIÓN': 0,
        'DESISTIDO': 0,
        'RECHAZADO': 0
      };

      data.forEach((count: any) => {
        
        if (statusCount.hasOwnProperty(count.status)) {
          statusCount[count.status]++;
        }
        
      });

      // this.statusCount = statusCount;

      this.statusCounts = [
        { name: 'APROBADO', amount: statusCount['APROBADO'], color: '#52be80', class: 'approved' },
        { name: 'EN REVISIÓN', amount: statusCount['EN REVISIÓN'], color: '#ffa621', class: 'revision' },
        { name: 'DESISTIDO', amount: statusCount['DESISTIDO'], color: '#009da8', class: 'givenUp' },
        { name: 'RECHAZADO', amount: statusCount['RECHAZADO'], color: '#d90000', class: 'rejected' },
      ]

      this.dataApplicants = data;

      this.counterByApplicantStatus = JSON.parse(JSON.stringify(this.sharedService.statusApplicant));
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!
    });
  }

  filterByStatus(status: string): void {

    const filterData = this.dataSource.data.filter((applicant: IApplicant) => applicant.status === status);
    this.dataSource.data = filterData
  }

  clickButton(option: any, data: any, applicants: any){
    switch(option){
      case 0:
        const statusTable = this.dialog.open(StatusTableDialogComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '70%',
          data: {},
        });
        break
      case 1:
        const dialogApplicant = this.dialog.open(DialogApplicantComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '70%',
          data: {},
        });
        break
      case 2:
        const registerCall = this.dialog.open(RegisterCallComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '50%',
          data: {},
        });
        break
      case 3: 
        const callHistory = this.dialog.open(DialogCallHistoryComponent, {
          maxWidth: '500vw',
          maxHeight: '90vh',
          width: '70%',
          data: {
            id: data,
            applicant: applicants
          },
        });
        break
        
    }
  }
  
}
