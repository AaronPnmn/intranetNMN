

import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReporteColaboradoresService {

  constructor( private http: HttpClient ) { }
  private baseUrl: string = environment.apiBaseUrl;

  getActividades_byTime(time1:number, time2:number){
    const url = `${ this.baseUrl }/reportes/horas/${time1}/${time2}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }

  getActividadesProyecto_byTime(idProyecto: string ,time1:number ,time2:number){ 
    const url = `${ this.baseUrl }/reportes/horas/proyecto/${idProyecto}/${time1}/${time2}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }
  getActividadesColaboradores_byTime(time1:number ,time2:number){ 
    const url = `${ this.baseUrl }/reportes/horas/tcolaborador/${ time1 }/${ time2 }`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }

  getActividadesColaborador_byTime(idColaborador: string, time1:number ,time2:number){ 
    // const url = `${ this.baseUrl }/reportes/horas/proyecto/${idColaborador}/${time1}/${time2}`;
    
    const url = `${ this.baseUrl }/reportes/horas/colaborador/${idColaborador}/${time1}/${time2}`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }


  getCliente(){ 
    const url = `${ this.baseUrl }/clientes`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }

  putEditaActvidad( actividad:any, idActividad:any ){
    const url = `${ this.baseUrl }/actividades/${idActividad}`;
    const body = actividad;
    const token = localStorage.getItem('token');
    console.log('putEditaActividad', idActividad);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<any>( url, body ,{ headers })
  }








  getProyectosClientes(){ 
    const url = `${ this.baseUrl }/clientes/proyecto`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }

  getClientes(){
    const url = `${ this.baseUrl }/clientes`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } ); 
  }

}
