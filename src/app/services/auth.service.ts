import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IReviwer } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  greetings = [
    '¡Hi!',
    '¡Hola!',
    '¡Heey!',
    '¡Hello!',
    '¡Comencemos!',
    '¡Bienvenida/o!',
    '¡Bienvenida/o de nuevo!',
    '¡Bienvenida/o a EduTrackPro!',
    '¡Bienvenida/o a bordo!',
    '¡Bienvenido! Espero que disfrutes aquí',
    '¡Nos encanta que estes aquí!',
    '¡Estamos listos!',
    '¿Qué haremos hoy?',
    '¿En qué puedo ayudarte hoy?',
    'Saludos',
    'Afectuoso saludo',
    'Cordial saludo',
    'Un placer saludarte',
    'Me complace que estés aquí',
    'Espero todo vaya bien',
    'Un placer trabajar contigo',
    'Estoy feliz de ayudarte',
    'Estamos para servirte!',
    'Es un placer servirte!',
    '¡Gracias por conectarte!',
    '¡Gracias por visitarnos!',
    '¿En qué puedo ayudarte?',
    'Buen día',
    'Buen día, vamos a trabajar',
    '¿Que haremos este ' + moment().format('dddd') + '?',
    'Feliz ' + moment().format('dddd'),
    '¡Feliz ' +
      moment().format('dddd') +
      '! Espero que tengas un día maravilloso',
    'Excelente ' + moment().format('dddd'),
    'Bonito ' + moment().format('dddd'),
    'Lindo ' + moment().format('dddd'),
    'Ten un gran ' + moment().format('dddd'),
    'Buen ' + moment().format('dddd'),
  ];

  private url = 'http://localhost:3000';
  private fakeApiUrl = 'http://localhost:4000';

  private currentUserSubject = new BehaviorSubject<any>(null); // Observador del usuario

  public currentUser$ = this.currentUserSubject.asObservable(); // Observable accesible publicamente

  constructor(
    public router: Router,
    public globalService: GlobalService,
    public http: HttpClient
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    localStorage.setItem('greetings', JSON.stringify(this.greetings));
  }

  /***
   * Metodo encargado de cerrar la sesión del usuario actual
   *
   * @memberof AuthService
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('greetings');
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    window.location.href = '.home';
  }

  /***
   * Limpiar Localstorage en user, token and greeting
   */
  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.url}/api/v1/auth/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  getUser(): any {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('acces_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getGreetings(): string {
    const greeting = JSON.parse(localStorage.getItem('greetings') || '[]');
    const randomIndex = Math.floor(
      Math.random() * (this.greetings.length - 1 - 0 + 1) + 0
    );

    return greeting[randomIndex];
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
      rememberMe: true,
    };
  }

  signUpData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/v1/auth/register`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/api/v1/users/${id}`);
  }
}
