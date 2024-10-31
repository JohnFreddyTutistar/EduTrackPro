import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-applicant',
  templateUrl: './dialog-applicant.component.html',
  styleUrls: ['./dialog-applicant.component.scss']
})
export class DialogApplicantComponent implements OnInit {

  updateUser!: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataofUsertoUpdte()
  }

  dataofUsertoUpdte(){
    this.updateUser = this.fb.group({
      firstName: ['Ivan', [Validators.required]],
      secondName: ['Dario'],
      firstSurname: ['Delgado', [Validators.required]],
      secondSurname: ['Calvache'],
      gender: ['Masculino'],
      email: ['johnfre.157@gmail.com', [Validators.required, Validators.email]],
      phone: ['3105124961', [Validators.required]],
      birthdate: ['03/02/1994'],
      identificationType: ['Cédula de ciudadanía', [Validators.required]],
      identificationNumber: ['1085310787', [Validators.required, Validators.min(0), Validators.max(99999999999999)]],
      adress: [''],
      academicProgram: ['', [Validators.required]],
      levelEducation: ['', [Validators.required]],
      studySchedule: ['', [Validators.required]]
    })
  }

  update(){

  }

}
