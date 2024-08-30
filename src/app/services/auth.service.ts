import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Usuario de prueba
  user : Users[] = [
    {
      userName: 'john',
      email: 'john@gmail.com',
      password: 'Abc123**',
      rol: 'administrador'
    }
  ]

  constructor() { }

  loginGuest() {
    Swal.fire({
      title: 'Accediendo como invitado',
      html: '<h5>Tomará unos segundos</h5>.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

  login(){

  }

  logout() {

  }

  clearUser() {

  }
}
