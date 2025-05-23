import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { EnumsService } from 'src/app/services/enums.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public hide = true;

  registerForm!: FormGroup;

  public userRol!: any[];

  public facultyType!: any[];

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public enumService: EnumsService
  ) {}

  ngOnInit(): void {
    this.dataUserForm();

    this.facultyType = this.enumService.getFacultyType();

    this.userRol = this.enumService.getUserRol();

    // Escuchar cambios en el campo de fecha
    this.registerForm.get('birthDate')?.valueChanges.subscribe((value) => {
      this.calcularEdad(value);
    });
  }

  dataUserForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
      birthDate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      possition: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  age: string = '';

  calcularEdad(birthDate: string) {
    if (birthDate) {
      const years = moment().diff(moment(birthDate), 'years');
      this.age = `${years} año/s`;
    } else {
      this.age = '';
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

      this.authService.signUpData(dataUser).subscribe({
        next: (res) => {
          Swal.fire({
            title: `Gracias por usar <b>EduTrack<span style="color: #980909">PRO</span></b>`,
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
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: `No se pudo registrar al usuario. ${err.message}`,
            showConfirmButton: true,
          });
        },
      });
    }
  }
}
