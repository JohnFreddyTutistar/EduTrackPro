import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApplicant, IReviwer } from '../interfaces/users';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  url = 'http://localhost:3000';

  statusApplicant = [
    {
      name: 'Aprovados',
      statusCount: null,
      class: 'approved'
    },
    {
      name: 'En revisión',
      statusCount: null,
      class: 'revision'
    },
    {
      name: 'Desistidos',
      statusCount: null,
      class: 'givenUp'
    },
    {
      name: 'Rechazados',
      statusCount: null,
      class: 'rejected'
    }
  ]

  // url = 'http://localhost:3000/';

  constructor(
      public http: HttpClient,
      public router: Router,
      public globalService: GlobalService
    ) {}

    applicants: any[] = [];

  // getDataApplicantsNew(){
  //   return this.globalService.getData(this.url + '/api/v1/applicant');
  // }


    // cambbiar en el dashboar
  getDataApplicants(): Observable<IApplicant[]>{
      return this.http.get<IApplicant[]>(`${this.url}/applicants`)
  }
  


  getDataApplicantsNew(): Observable<IApplicant[]>{ 
    return this.http.get<IApplicant[]>(this.url + '/api/v1/applicant');
  }
    
  getDataReviwers(): Observable<IReviwer[]>{
    return this.http.get<IReviwer[]>(this.url + '/api/v1/users')
  }

  getDataStatusApplicant(id: string): Observable<any>{
    return this.http.get<any>(`${this.url}/statusApplicant/${id}`)
  }

  // Método para obtener un revisor por id
  getDataReviwersById(id: number): Observable<any>{
    return this.http.get<any>(`${this.url}/signup/${id}`);
  }

  // metodo para actualizar usuario revisor
  updateUser(id: number, user: any): Observable<any>{
    return this.http.put<any>(`${this.url}/signup/${id}`, user)
  }

}
