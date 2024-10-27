import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public hide = true;

  registerForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.dataUserForm();

    // Escuchar cambios en el campo de fecha
    this.registerForm.get('birthday')?.valueChanges.subscribe(value => {
      this.calcularEdad(value);
    });
  }

  dataUserForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      position: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  edad: string = '';

  calcularEdad(fechaNacimiento: string){
    if(fechaNacimiento){
      const years = moment().diff(moment(fechaNacimiento), 'years');
      this.edad = `${years} año/s`
    } else {
      this.edad = '';
    }
  }

  sendForm() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Enviando ...',
        icon: 'info',
        html: 'Registro diligenciado correctamente',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      Swal.showLoading();

      const dataUser = this.registerForm.value;
      console.log(this.registerForm.value);

      this.authService.signUpData(dataUser).subscribe({
        next: (res) => {
          console.log('usuario registrado correctamente', res);
          Swal.fire({
            title: 'Gracias por usar EduTrackPro',
            icon: 'success',
            html: ` <p>Usuario registrado exitosamente</p>`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true,
            willClose: () => {
              this.router.navigate(['reviewerTeam']);
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
