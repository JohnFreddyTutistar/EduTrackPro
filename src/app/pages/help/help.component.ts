import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

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

  digitalChanelForm!: FormGroup

  isEditable = true;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.digitaForm()
  }

  digitaForm(){
    this.digitalChanelForm = this.formBuilder.group({
      identificationType: ['', [Validators.required]],
      identificationNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', Validators.required],
      email: ['', [Validators.email, Validators.email]],
      phone: ['', [Validators.required]],
      request: ['', [Validators.required]]
    })
  }

  sendForm(){

  }

}
