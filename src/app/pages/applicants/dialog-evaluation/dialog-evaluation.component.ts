import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-evaluation',
  templateUrl: './dialog-evaluation.component.html',
  styleUrls: ['./dialog-evaluation.component.scss'],
})
export class DialogEvaluationComponent implements OnInit {
  form!: FormGroup;
  resultado: any = null;

  // Comfiguración de ponderaciones
  readonly config = {
    pesoEntrevista: 0.6,
    pesoPrueba: 0.4,
    pesoMatematica: 0.5,
    pesoLectoEscritura: 0.5,
    notaMinima: 3.2,
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      entrevista: [null, [Validators.required]],
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

    const promPrueba =
      matematica * this.config.pesoMatematica +
      lectoescritura * this.config.pesoLectoEscritura;
    const notaFinal =
      entrevista * this.config.pesoEntrevista +
      promPrueba * this.config.pesoPrueba;
    const estado =
      notaFinal >= this.config.notaMinima ? 'Aprobado' : 'Reprobado';

    this.resultado = {
      promPrueba: promPrueba.toFixed(2),
      noteFinal: notaFinal.toFixed(2),
      estado,
    };
  }
}
