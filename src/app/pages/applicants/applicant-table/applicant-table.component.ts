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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  FormGroupFilter!: FormGroup;

  dataSource: IApplicant[] = [];

  filteredApplicants: any[] = [];

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullName',
    'identificationNumber',
    'status',
    'phone',
    'email',
    'result',
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

  checkHistory() {
    this.dialog.open(DialogCallHistoryComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '70%',
      data: {},
    });
  }

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public sharedService: SharedService
  ) {
    // this.dataSource = new MatTableDataSource()
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

  // applyFilterFast(event: Event){
  //   const filterValue = (event.target as HTMLInputElement).value
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if(this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

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

  ngOnInit() {
    this.FormGroupFilter.valueChanges.subscribe((form) => {
      this.applyFilters(form);
    });
    this.getDataApplicants()

    this.FormGroupFilter.valueChanges.subscribe((filters) => {
      this.applyFilters(filters)
    })
  }

  applyFilters(filters: any): void {
    this.filteredApplicants = this.dataSource.filter(applicants => {
      return (
        (filters.formControlFilterString ? applicants.email.includes(filters.email): true)
      )
    })
  }

  getDataApplicants(){
    this.sharedService.getDataApplicants().subscribe((data: IApplicant[]) => {
      this.dataSource = data;
    });
  }
}
