import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import 'moment/locale/es';
import * as moment from 'moment';
import { IApplicant } from 'src/app/interfaces/users';

@Component({
  selector: 'app-applicant-table',
  templateUrl: './applicant-table.component.html',
  styleUrls: ['./applicant-table.component.scss']
})
export class ApplicantTableComponent implements OnInit {

  ELEMENT_DATA: IApplicant[] = [
    {
      index: 1,
      profilePhoto: '',
      fullName: 'John Freddy Tutistar Calvache',
      identificationNumber: 1085310787,
      birthdate: moment().format('dddd, DD [de] MMMM'),
      status: 'EN REVISIÓN',
      phone: 3105124961,
      mobile: 3105124961,
      email: 'johnfre.157@gmail.com'
    }
  ]

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullName',
    'identificationNumber',
    'birthdate',
    'status',
    'phone',
    'email',
    'settings'
  ]

  dataSource = this.ELEMENT_DATA;

  constructor() {

  }

  ngOnInit(): void {
  }

}
