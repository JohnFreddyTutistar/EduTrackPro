import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILogginUser } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Variables usadas para la comunicación entre componentes usando BehaviorSubject
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({
    id: 0,
    email: '',
    passwors: ''
  });

  private url = 'http://localhost:3000';

  constructor(public http: HttpClient) {
    const storedUserData = localStorage.getItem('currentUserData')
    if(storedUserData){
      this.currentUserData.next(JSON.parse(storedUserData));
      this.currentUserLoginOn.next(true);
    }
  }

  getData(): Observable<any> {
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

  // private isValidUserData(userData: any):boolean {
  //   return userData.id > 0 && userData.email && userData.password
  // }

  private saveUserDataToLocalStorage(userData: any): void{
    localStorage.setItem('currentUserData', JSON.stringify(userData))
  }

  get userdata(): Observable<any>{
    return this.currentUserData.asObservable()
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }

  clearUserData(): void{
    localStorage.removeItem('currentUserData');
    this.currentUserData.next({ id: 0, email: '', password: '' });
    this.currentUserLoginOn.next(false);
  }
}
