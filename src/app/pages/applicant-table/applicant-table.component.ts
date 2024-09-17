import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import 'moment/locale/es';
import * as moment from 'moment';
import { IApplicant } from 'src/app/interfaces/users';
import { StatusTableDialogComponent } from 'src/app/search/status-table-dialog/status-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applicant-table',
  templateUrl: './applicant-table.component.html',
  styleUrls: ['./applicant-table.component.scss'],
})
export class ApplicantTableComponent implements OnInit {
  FormGroupFilter!: FormGroup;

  ELEMENT_DATA: IApplicant[] = [
    {
      index: 1,
      profilePhoto: '',
      fullName: 'John Freddy Tutistar Calvache',
      identificationNumber: 1085310787,
      birthdate: moment().format('DD/MM/YYYY'),
      status: 'EN REVISIÓN',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'johnfre.157@gmail.com',
    },
    {
      index: 2,
      profilePhoto: '',
      fullName: 'Eliana Moncayo Pistala',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'APROBADO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
  ];

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullName',
    'identificationNumber',
    'birthdate',
    'status',
    'phone',
    'email',
    'settings',
  ];

  dataSource = this.ELEMENT_DATA;

  
  dialogStatusTable() {
    this.dialog.open(StatusTableDialogComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '70%',
      data: {},
    });
  }
  
  constructor(public dialog: MatDialog, public formBuilder: FormBuilder) {
    this.appplyFilter()
  }
  
  appplyFilter() {
    this.FormGroupFilter = this.formBuilder.group({
      formControlFilterBy: [null],
      formControlFilterString: [null],
      formControlFilterFrom: [null],
      formControlFilterTo: [null],
      formControlFilterSelect: [null]
    })
  }

  // Getter methods to easily access for controls

  get formControlFilterBy(){
    return this.FormGroupFilter.get('formControlFilterBy');
  }

  get formControlFilterString(){
    return this.FormGroupFilter.get('formControlFilterString');
  }

  get formControlFilterFrom(){
    return this.FormGroupFilter.get('formControlFilterFrom');
  }

  get formControlFilterTo(){
    return this.FormGroupFilter.get('formControlFilterTo');
  }

  get formControlFilterSelect(){
    return this.FormGroupFilter.get('formControlFilterSelect');
  }

  resetFilter() {}

  ngOnInit(): void {}
}
