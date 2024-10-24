import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ILogginUser, LoggedUser } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  ]

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({
    id: 0,
    email: '',
  });

  private readonly baseUrl: string = environment.baseUrl;

  private url = 'http://localhost:3000';

  constructor(
    public router: Router,
    public globalService: GlobalService,
    public http: HttpClient
  ) {
    const storedUserData = localStorage.getItem('currentUserData')
    if(storedUserData){
      this.currentUserData.next(JSON.parse(storedUserData));
      this.currentUserLoginOn.next(true);
    }

    localStorage.setItem('greetings', JSON.stringify(this.greetings));
  }

  /***
   * Metodo encargado de cerrar la sesión del usuario actual
   *
   * @memberof AuthService
   */
  logout(): void {
    localStorage.removeItem('currentUserData');
    this.currentUserData.next({ id: 0, email: '', password: '' });
    this.currentUserLoginOn.next(false);
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

  login(): Observable<any> {
    return this.http.get<any>(`${this.url}/signup`)
      .pipe(
        tap((userData: any) => {
          if(userData){
            this.currentUserData.next(userData);
            this.currentUserLoginOn.next(true);
            console.log("Estado de loggeado: ", this.currentUserLoginOn);
            this.saveUserDataToLocalStorage(userData);

          } else {
            this.currentUserLoginOn.next(false)
          }
        })
    );
  }

  private saveUserDataToLocalStorage(userData: any): void{
    localStorage.setItem('currentUserData', JSON.stringify(userData));  
  }

  get userdata(): Observable<any>{
    return this.currentUserData.asObservable()
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }

  getGreetings(): string{
    const greeting = JSON.parse(localStorage.getItem('greetings') || '[]')
    const randomIndex = Math.floor(Math.random() * (this.greetings.length -1 -0 +1)+ 0)

    return greeting[randomIndex]
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
}
