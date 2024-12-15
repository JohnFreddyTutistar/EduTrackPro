import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApplicant, IReviwer } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  url = 'http://localhost:3000';

  statusApplicant = [
    {
      name: 'Aprovados',
      amount: null,
      class: 'approved'
    },
    {
      name: 'En revisión',
      amount: null,
      class: 'revision'
    },
    {
      name: 'Desistidos',
      amount: null,
      class: 'givenUp'
    },
    {
      name: 'Rechazados',
      amount: null,
      class: 'rejected'
    }
  ]

  constructor(
      public http: HttpClient,
      public router: Router
    ) {}

  getDataApplicants(): Observable<IApplicant[]>{
    return this.http.get<IApplicant[]>(`${this.url}/applicants`)
  }

  getDataReviwers(): Observable<IReviwer[]>{
    return this.http.get<IReviwer[]>(`${this.url}/signup`)
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
