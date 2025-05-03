import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dialog-applicant',
  templateUrl: './dialog-applicant.component.html',
  styleUrls: ['./dialog-applicant.component.scss'],
})
export class DialogApplicantComponent implements OnInit {
  updateUser!: FormGroup;

  userId!: string;
  dataApplicant: any;

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public sharedService: SharedService
  ) {
    this.updateUser = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
      gender: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      birthDate: [''],
      identificationType: ['', [Validators.required]],
      identificationNumber: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(99999999999999),
        ],
      ],
      address: [''],
      academicProgram: ['', [Validators.required]],
      levelEducation: ['', [Validators.required]],
      studySchedule: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    console.log('id del usuario: ', this.userId);

    this.sharedService.getDataApplicantsById(this.userId).subscribe((user) => {
      console.log('data user: ', user);
      this.updateUser.patchValue({
        firstName: user[0].firstName,
        secondName: user[0].secondName,
        firstLastName: user[0].firstLastName,
        secondLastName: user[0].secondLastName,
        gender: user[0].gender,
        email: user[0].email,
        phoneNumber: user[0].phoneNumber,
        address: user[0].address,
        identificationType: user[0].identificationType,
        identificationNumber: user[0].identificationNumber,
        birthDate: user[0].birthDate,
        // birthDate: moment(user[0].birthDate).format('DD/MM/YYYY'),
      });
    });
  }

  update() {}
}
