import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";
import { acumuladorTiempo, acumuladorTiempoNumber, acumuladorTiempoString, registroActividad } from "../Interfaces/capturaActividad.interface";



@Injectable({
  providedIn:'root'
})
export class CapturaActividadService {

  //public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null); //toggleSidenav
  private _idActividad = '';
  private _actividad: any = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      name: '',
      id: ''
    }],
    cliente: [{
      id: '',
      razon_social: ''
    }],
    proyecto: [{
      id: '',
      nombre: ''
    }],
    fecha: 0,
    dia: 0,
    tiempoAcumulado: {
      hora: '',
      minuto: '',
      segundo: ''
    },
    lista: [],
    tiempoInicio: 0,
    tiempoFinal: 0,
    idActividad: 0,
    colaboradorAsignado: [{
      id:'',
      name:''
    } ]
  }

  private _tiempoAcumulado: acumuladorTiempo = {
    resHor: '00',
    resMin: '00',
    resSeg: '00'
  }

  private _drawerAbierto:boolean = false;

  private _idColaboradorSeleccionado:string = '';

  get drawerAbierto():boolean {
    return this._drawerAbierto
  }

  get idColaboradoSeleccionado():string {
    return this._idColaboradorSeleccionado
  }

  reloadSemana:number = 0;

  actInicial:any;

  buttonLabel: string = 'Iniciar'

  contador:any = null; //Cronometro

  estado: string = 'captura';

  get actividad(): registroActividad {
    return this._actividad;
  }

  get idActividad(): string {
    return this._idActividad;
  }

  get tiempoInicio(): number {
    return this._actividad.tiempoInicio;
  }

  get tiempoFinal(): number {
    return this._actividad.tiempoFinal;
  }

  get tiempoAcumulado(): any {
    return this._tiempoAcumulado
  }

  constructor( private http: HttpClient ){}

  //toggle() { //toggleSidenav
  //  return this.sideNavToggleSubject.next(null);
  //}

  cambiaEstadoService(nuevoEstado: string){
    this.estado = nuevoEstado;
  }

  postNuevaActvidad( actividad:any ){
    const url = `https://nmn.com.mx/api/actividades`;
    const body = actividad;
    const token = localStorage.getItem('token');
    console.log('postNuevaActividad');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>( url, body ,{ headers })
  }

  putEditaActvidad( actividad:any, idActividad:any ){
    const url = `https://nmn.com.mx/api/actividades/${idActividad}`;
    const body = actividad;
    const token = localStorage.getItem('token');
    console.log('putEditaActividad', idActividad);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<any>( url, body ,{ headers })
  }

  getActividadesSemana(id_col?:string, anio?:string, semana?:string){
    const url = `https://nmn.com.mx/api/actividades/semana/${id_col}/${anio}/${semana}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } );
  }

  getClientes(){
    const url = `https://nmn.com.mx/api/clientes`;
    //console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    // const headers = new HttpHeaders()
    //   .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get( url, { headers } );
  }

  getColaboradores(){
    const url = `https://nmn.com.mx/api/users`;
    //console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } );
  }

  getProyectosPorCliente(idCliente:string){
    const url = `https://nmn.com.mx/api/proyectos/cliente/${idCliente}`;
    //console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } );
  }

  deleteActividad(idActividad:any ){
    const url = `https://nmn.com.mx/api/actividades/${idActividad}`;
    const token = localStorage.getItem('token');
    console.log('eliminaActividad', idActividad);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<any>( url, { headers })
  }


  detalleActividad( act: registroActividad ){
    
    console.log("detalle")
    this.actInicial = {...act};
    this._actividad = act;
    console.log("detalle actividad", this._actividad)
    this._idActividad = this._actividad._id
    console.log("id actividad", this._idActividad)
    
  }
  

  generarActividad( actividadVacia: registroActividad ){
    this._actividad = actividadVacia;
  }


  modificarDrawer( valor: boolean ): void{
    this._drawerAbierto = valor;
  }

  modificarColaboradoSeleccionado( id: string ): void{
    this._idColaboradorSeleccionado = id;    
  }


}
