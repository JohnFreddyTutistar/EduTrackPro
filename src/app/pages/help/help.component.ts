import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { EnumsService } from 'src/app/services/enums.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @ViewChildren(MatAccordion) accordion!: QueryList<MatAccordion>;

  openAll(){
    this.accordion.forEach(accordion => accordion.openAll())
  }

  closeAll(){
    this.accordion.forEach(accordion => accordion.closeAll())
  }

  constructor() {}

  ngOnInit(): void {
  }

}
