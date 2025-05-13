import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EnumsService } from 'src/app/services/enums.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-call',
  templateUrl: './register-call.component.html',
  styleUrls: ['./register-call.component.scss'],
})
export class RegisterCallComponent implements OnInit {
  formGroupSend!: FormGroup;

  public results!: any[];
  public id!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public registerCallData: any,
    public formBuilder: FormBuilder,
    public enumService: EnumsService,
    public sharedService: SharedService,
    public router: Router
  ) {
    this.formData();
  }

  formData() {
    this.formGroupSend = this.formBuilder.group({
      results: ['', [Validators.required]],
      observation: [''],
      tracing: [''],
      duration: [],
    });
  }

  ngOnInit(): void {
    console.log('id del register data: ', this.registerCallData.id);
    this.id = this.registerCallData.id;
    this.results = this.enumService.getResults();
  }

  sendNewFormatDate: string = '';

  sendData() {
    this.formGroupSend.markAllAsTouched();

    if ((this, this.formGroupSend.valid)) {
      const dataHistoryApplicant = this.formGroupSend.value;

      // this.sendNewFormatDate = moment(dataHistoryApplicant.date).format(
      //   'DD/MMMM/YYYY HH:mm'
      // );
      dataHistoryApplicant.date = new Date();

      dataHistoryApplicant.observation =
        dataHistoryApplicant.observation?.trim() || 'N/A';
      dataHistoryApplicant.tracing =
        dataHistoryApplicant.tracing?.trim() || 'N/A';

      this.sharedService
        .postApplicantsCallHistory(this.id, dataHistoryApplicant)
        .subscribe({
          next: (res) => {
            Swal.fire({
              title: `Gracias por usar <b>EduTrack<span style="color: #980909">PRO</span></b>`,
              icon: 'success',
              html: ` <p>Registro guardado con éxito</p>`,
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 3000,
              timerProgressBar: true,
              willClose: () => {
                window.location.reload();
              },
            });
          },
          error: (err) => {
            console.log('Error al registrar usuario', err);
          },
        });
    }
  }
}
