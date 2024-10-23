import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ILogginUser, LoggedUser } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({
    id: 0,
    email: '',
  });

  private readonly baseUrl: string = environment.baseUrl;

  private url = 'http://localhost:3000/signup';

  constructor(public router: Router, public globalService: GlobalService, public http: HttpClient) { }

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

  login(userId: number): Observable<any>{
    return this.http.get<ILogginUser>(`${this.url}/signup/${userId}`)
      .pipe(
        tap((userData: ILogginUser) => {
          if(userData){
            console.log("usuario autenticado", userData);
            this.currentUserData.next(userData)
            this.currentUserLoginOn.next(true)
          } else {
            console.log("usuario no encontrado");
            this.currentUserLoginOn.next(false)
          }
        })
      )
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
