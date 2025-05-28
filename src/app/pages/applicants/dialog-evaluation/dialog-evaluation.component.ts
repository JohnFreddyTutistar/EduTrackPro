import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-evaluation',
  templateUrl: './dialog-evaluation.component.html',
  styleUrls: ['./dialog-evaluation.component.scss'],
})
export class DialogEvaluationComponent implements OnInit {
  form!: FormGroup;
  resultado: any = null;
  dataApplicant: any;
  nameApplicant: string = '';
  applicantId: string = '';
  dataApplicantById: any;

  // Comfiguración de ponderaciones
  readonly config = {
    pesoEntrevista: 0.6,
    pesoPrueba: 0.4,
    pesoMatematica: 0.5,
    pesoLectoEscritura: 0.5,
    notaMinima: 3.2,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log('data applicant: ', this.data.applicant);

    this.dataApplicant = this.data.applicant.filter((item: any) => {
      if (item.id === this.data.id) {
        this.applicantId = item.id;
        this.nameApplicant =
          item.firstName +
          ' ' +
          item.secondName +
          ' ' +
          item.firstLastName +
          ' ' +
          item.secondLastName;
        this.dataApplicantById = item;
      }
    });

    this.form = this.formBuilder.group({
      interview: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      math: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      readWrite: [
        null,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
    });

    this.form.valueChanges.subscribe(() => this.calcResults());
  }

  calcResults() {
    const interview = parseFloat(this.form.value.interview);
    const math = parseFloat(this.form.value.math);
    const readWrite = parseFloat(this.form.value.readWrite);

    if (isNaN(interview) || isNaN(math) || isNaN(readWrite)) {
      this.resultado = null;
      return;
    }

    const notaEntrevista = (interview * 5) / 100;

    const promPrueba =
      math * this.config.pesoMatematica +
      readWrite * this.config.pesoLectoEscritura;
    const ponderadoEntrevista = notaEntrevista * this.config.pesoEntrevista;
    const ponderadoPrueba = promPrueba * this.config.pesoPrueba;
    const notaFinal = ponderadoEntrevista + ponderadoPrueba;
    const totalAdmit = (notaFinal * 100) / 5
    const status =
      notaFinal >= this.config.notaMinima ? 'Aprobado' : 'Reprobado';

    this.resultado = {
      promPrueba: promPrueba.toFixed(2),
      notaFinal: notaFinal.toFixed(2),
      notaEntrevista: notaEntrevista.toFixed(2),
      ponderadoEntrevista: ponderadoEntrevista.toFixed(2),
      ponderadoPrueba: ponderadoPrueba.toFixed(2),
      totalAdmit: totalAdmit,
      status,
    };
  }

  sendForm() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      Swal.fire({
        title: 'Enviando ...',
        icon: 'info',
        html: 'Registro diligenciado correctamente',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      Swal.showLoading();

      const data = {
        ...this.form.value,
        applicantId: this.applicantId,
      };

      this.sharedService.postApplicantEvaluation(data).subscribe({
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
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: `No se pudo guardar la evaluación. ${err.message}`,
            showConfirmButton: true,
          });
        },
      });
    }

    // if (this.form.invalid) return;

    // const data = {
    //   ...this.form.value,
    // };

    // console.log('datos a guradar', data);
  }
}
