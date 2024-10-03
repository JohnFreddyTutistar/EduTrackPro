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
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstSurname: ['', [Validators.required]],
      secondSurname: [''],
      gender: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthdate: [''],
      identificationType: ['', [Validators.required]],
      identificationNumber: ['', [Validators.required, Validators.min(0), Validators.max(99999999999999)]],
      adress: [''],
      academicProgram: ['', [Validators.required]],
      levelEducation: ['', [Validators.required]],
      studySchedule: ['', [Validators.required]]
    })
  }

  update(){

  }

}
