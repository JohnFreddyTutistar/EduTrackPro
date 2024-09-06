import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dataUserStatus } from 'src/app/interfaces/users';

const ELEMENT_DATA: dataUserStatus[] = [
  {numberIdentification: 1085310787, fullName: 'John Freddy Tutistar Calvache', status: 'PENDIENTE', especification: 'ninguna', inscriptionDate: '05/09/2024'},
];

@Component({
  selector: 'app-status-table-dialog',
  templateUrl: './status-table-dialog.component.html',
  styleUrls: ['./status-table-dialog.component.scss'],
})
export class StatusTableDialogComponent implements OnInit {

  displayedColumns: string[] = [
    'identificationNumber',
    'fullName',
    'inscriptionDate',
    'status',
    'especification',
    'actions'
  ]

  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
