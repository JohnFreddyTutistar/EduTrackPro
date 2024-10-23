import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

    // -------------------------- Métodos HTTP globales -------------------------------- //
  /**
   * Método encargado de obtener la Data desde la base de datos, con conexión en BACK-END
   *
   * @param {string} api Variable complementaria para el EndPoint
   * @return Retorna la respuesta obtenida por el Back
   * @memberof GlobalService
   */

  getData(url: string, api?: string): Observable<any>{
    return this.http.get(url + api);
  }

    /**
   * Método encargado de traer la data desde la base de datos de un objeto en especifico, con conexión en BACK-END
   *
   * @param port Variable donde se recibe el puerto de conexión al back
   * @param api Variable complementaria para el EndPoint
   * @param id Id del objeto a consultar
   * @return Retorna la respuesta obtenida por el Back
   * @memberof GlobalServiceService
   */

    getById(url: string, api: string, id: number): Observable<any>{
      return this.http.get(url + api + id);
    }
}
