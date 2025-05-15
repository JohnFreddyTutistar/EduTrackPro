import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  // Comfiguración de ponderaciones
  readonly config = {
    pesoEntrevista: 0.6,
    pesoPrueba: 0.4,
    pesoMatematica: 0.5,
    pesoLectoEscritura: 0.5,
    notaMinima: 3.2,
  };

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('data applicant: ', this.data.applicant);

    this.dataApplicant = this.data.applicant.filter((item: any) => {
      if (item.id === this.data.id) {
        this.nameApplicant = item.firstName + ' ' + item.firstLastName;
      }
    });

    this.form = this.formBuilder.group({
      entrevista: [
        null,
        [Validators.required, Validators.min(0), Validators.max(99)],
      ],
      matematica: [null, [Validators.required]],
      lectoescritura: [null, [Validators.required]],
    });

    this.form.valueChanges.subscribe(() => this.calcResults());
  }

  calcResults() {
    const entrevista = parseFloat(this.form.value.entrevista);
    const matematica = parseFloat(this.form.value.matematica);
    const lectoescritura = parseFloat(this.form.value.lectoescritura);

    if (isNaN(entrevista) || isNaN(matematica) || isNaN(lectoescritura)) {
      this.resultado = null;
      return;
    }

    const notaEntrevista = (entrevista * 5) / 100;

    const promPrueba =
      matematica * this.config.pesoMatematica +
      lectoescritura * this.config.pesoLectoEscritura;
    const ponderadoEntrevista = notaEntrevista * this.config.pesoEntrevista;
    const ponderadoPrueba = promPrueba * this.config.pesoPrueba;
    const notaFinal = ponderadoEntrevista + ponderadoPrueba;
    const estado =
      notaFinal >= this.config.notaMinima ? 'Aprobado' : 'Reprobado';

    this.resultado = {
      promPrueba: promPrueba.toFixed(2),
      notaFinal: notaFinal.toFixed(2),
      notaEntrevista: notaEntrevista.toFixed(2),
      ponderadoEntrevista: ponderadoEntrevista.toFixed(2),
      ponderadoPrueba: ponderadoPrueba.toFixed(2),
      estado,
    };
  }

  sendForm() {
    if (this.form.invalid) return;

    const data = {
      ...this.form.value,
      ...this.resultado,
    };

    console.log('datos a guradar', data);
  }
}
