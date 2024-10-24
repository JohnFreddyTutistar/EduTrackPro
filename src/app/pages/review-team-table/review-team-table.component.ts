import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { IReviwer } from 'src/app/interfaces/users';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-review-team-table',
  templateUrl: './review-team-table.component.html',
  styleUrls: ['./review-team-table.component.scss']
})
export class ReviewTeamTableComponent implements OnInit {

  dataTable: IReviwer[] = [];

  ELEMENT_DATA = [
    {
      index: 1,
      fullname: 'John Freddy Tutistar Calvache',
      datebirth: moment().format('DD/MM/YYYY'),
      email: 'johnfre.157@gmail.com',
      phone: 3105124961,
      faculty: 'Ingeniería',
      programName: 'Ingeniería de Sistemas'
    }
  ];

  dataSource = this.ELEMENT_DATA;

  displayedColumns: string[] = [
    'index',
    'fullname',
    'datebirth',
    'email',
    'phone',
    'faculty',
    'programName',
    'settings'
  ]

  FormGroupFilter! : FormGroup

  resetFilter(all: boolean){

  }

  showCalendar(){};

  editUser(){

  }

  constructor(public formBuilder: FormBuilder, public sharedService: SharedService) {
    this.filterForm();

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

  ngOnInit(): void {
    this.FormGroupFilter.valueChanges.subscribe(form => {
      this.applyFilters(form)
    })

    this.getDataReviwer();
  }

  applyFilters(form: any){
    let filteredData = this.ELEMENT_DATA;

    // Aplicar filtros a los datos originales
    if(form.fullname) {
      filteredData = filteredData.filter(fullname => fullname.fullname.toLocaleLowerCase().includes(form.fullname.toLocaleLowerCase()))
    }
  }

  getDataReviwer(){
    this.sharedService.getDataReviwers().subscribe((data) => {
      this.dataTable = data
    })
  }

}
