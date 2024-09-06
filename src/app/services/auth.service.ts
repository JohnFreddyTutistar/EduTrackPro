import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LoggedUser } from '../interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

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
