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

  constructor(
      public http: HttpClient,
      public router: Router
    ) {}

  getDataApplicants(): Observable<IApplicant[]>{
    return this.http.get<IApplicant[]>(`${this.url}/applicants`)
  }

  getDataReviwers(): Observable<IReviwer[]>{
    return this.http.get<IReviwer[]>(`${this.url}/reviwers`)
  }
}
