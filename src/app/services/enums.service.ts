import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  constructor() { }

  public getIdentificationType(){
    return [
      {
        value: 'CC / CÉDULA DE CIUDADANÍA',
        viewValue: 'CC / CÉDULA DE CIUDADANÍA',
      },
      {
        value: 'TI / TARJETA DE IDENTIDAD',
        viewValue: 'TI / TARJETA DE IDENTIDAD',
      }
    ]
  }

  public getFacultyType(){
    return [
      {
        value: 'INGENIERÍA',
        viewValue: 'INGENIERÍA'
      },
      {
        value: 'ARQUITECTURA Y BELLAS ARTES',
        viewValue: 'ARQUITECTURA Y BELLAS ARTES'
      },
      {
        value: 'ADMINISTRATIVAS Y CONTABLES',
        viewValue: 'ADMINISTRATIVAS Y CONTABLES'
      },
      {
        value: 'SOCIALES Y HUMANAS',
        viewValue: 'SOCIALES Y HUMANAS'
      }
    ]
  }

  public getResults(){
    return [
      {
        value: 'CONTACTADO',
        viewValue: 'CONTACTADO',
        icon: 'call_made'
      },
      {
        value: 'NO CONTACTADO',
        viewValue: 'NO CONTACTADO',
        icon: 'call_missed'
      }
    ]
  }

  public getUserRol() {
    return [
      {
        value: 'ADMINISTRADOR(A)',
        viewValue: 'ADMINISTRADOR(A)'
      },
      {
        value: 'REVISOR(A)',
        viewValue: 'REVISOR(A)'
      }
    ]
  }
}
