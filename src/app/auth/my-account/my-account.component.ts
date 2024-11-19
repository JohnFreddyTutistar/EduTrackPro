import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  updatePrifileUser!: FormGroup

  constructor(private formBiulder: FormBuilder) { }

  ngOnInit(): void {
    this.formEditUser()
  }

  formEditUser(){
    this.updatePrifileUser = this.formBiulder.group({
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      position: ['', [Validators.required]],
    })
  }

  updateForm(){

  }

}
