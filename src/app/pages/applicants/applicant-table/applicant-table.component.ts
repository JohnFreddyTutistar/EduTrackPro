import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import 'moment/locale/es';
import * as moment from 'moment';
import { IApplicant } from 'src/app/interfaces/users';
import { StatusTableDialogComponent } from 'src/app/search/status-table-dialog/status-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-applicant-table',
  templateUrl: './applicant-table.component.html',
  styleUrls: ['./applicant-table.component.scss'],
})
export class ApplicantTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  FormGroupFilter!: FormGroup;;

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
    {
      index: 3,
      profilePhoto: '',
      fullName: 'Esteban Enriquez Mora',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'APROBADO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 4,
      profilePhoto: '',
      fullName: 'Karen Cuasapud Pantoja',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'APROBADO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 5,
      profilePhoto: '',
      fullName: 'Camilo Andres Parra',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'DESISTIDO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 6,
      profilePhoto: '',
      fullName: 'William Geovanny Imbacuan Tutistar',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'APROBADO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 7,
      profilePhoto: '',
      fullName: 'Emanuel Alejandro Moncayo',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'EN REVISIÓN',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 8,
      profilePhoto: '',
      fullName: 'Juan Javier Casanova Quiroz',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'APROBADO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 9,
      profilePhoto: '',
      fullName: 'Yeimy Carolina Guevara',
      identificationNumber: 1085308393,
      birthdate: moment().format('DD/MM/yyyy'),
      status: 'RECHAZADO',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'eliana@gmail.com',
    },
    {
      index: 10,
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
    // this.dataSource = new MatTableDataSource()
    this.filterForm()
  }

  filterForm() {
    this.FormGroupFilter = this.formBuilder.group({
      formControlFilterBy: [null],
      formControlFilterString: [null],
      formControlFilterFrom: [null],
      formControlFilterTo: [null],
      formControlFilterSelect: [null]
    })
  }

  // applyFilterFast(event: Event){
  //   const filterValue = (event.target as HTMLInputElement).value
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if(this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // Getter methods to easily access for controls

  get formControlFilterBy(){
    return this.FormGroupFilter.controls["formControlFilterBy"];
  }

  get formControlFilterString(){
    return this.FormGroupFilter.controls["formControlFilterString"];
  }

  get formControlFilterFrom(){
    return this.FormGroupFilter.controls["formControlFilterFrom"];
  }

  get formControlFilterTo(){
    return this.FormGroupFilter.controls["formControlFilterTo"];
  }

  get formControlFilterSelect(){
    return this.FormGroupFilter.controls["formControlFilterSelect"];
  }

  resetFilter(all: boolean) {

  }

  ngOnInit() {
    this.FormGroupFilter.valueChanges.subscribe(form => {
      this.applyFilters(form)
    })
  }

  applyFilters(form: any){
    let filteredData = this.ELEMENT_DATA;

    // Aplicar filtros a los datos originales
    if(form.fullname) {
      filteredData = filteredData.filter(fullname => fullname.fullName.toLocaleLowerCase().includes(form.fullname.toLocaleLowerCase()))
    }
  }
}
