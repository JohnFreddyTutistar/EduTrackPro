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
        value: 'Ingeniería',
        viewValue: 'INGENIERÍA'
      },
      {
        value: 'Arquitectura y Bellas Artes',
        viewValue: 'ARQUITECTURA Y BELLAS ARTES'
      },
      {
        value: 'Administrativas y Contables',
        viewValue: 'ADMINISTRATIVAS Y CONTABLES'
      },
      {
        value: 'Sociales y Humanas',
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
        value: 'Administrador',
        viewValue: 'ADMINISTRADOR(A)'
      },
      {
        value: 'Revisor',
        viewValue: 'REVISOR(A)'
      }
    ]
  }
}
