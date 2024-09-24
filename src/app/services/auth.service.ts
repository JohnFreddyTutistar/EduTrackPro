import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LoggedUser } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(public router: Router) { }

  /***
   * Metodo encargado de cerrar la sesión del usuario actual
   * 
   * @memberof AuthService
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.href= './';
  }

  /***
   * Limpiar Localstorage en user, token and greeting
   */
  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  login(){

  }

  /**
   * Iniciar sesión como invitado
   * @param production Envieroment. Prod
   */
  loginGuest() {
    Swal.fire({
      title: 'Accediendo como invitado',
      html: '<h5>Tomará unos segundos</h5>.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.clearUser();
    let dataGuest = {
      email: 'edutrackpro.com+invitado@gmail.com',
      password: 'Invitado123',
      type: 'employee',
      rememberMe: true
    }
  }
}
