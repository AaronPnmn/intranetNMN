import { Component, Input, OnInit } from '@angular/core';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estado-crear',
  templateUrl: './estado-crear.component.html',
  styleUrls: ['../../capturaActividad.css'],
})
export class EstadoCrearComponent implements OnInit {

  @Input() actividad: registroActividad = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      id: '',
      name: ''
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
      id: '',
      name: ''
    }]
  }
  private _baseUrl: string = environment.apiBaseUrl;
  public _clientes: any[] = [];
  public _proyectos: any[] = [];
  public _colaboradores: any[] = [];

  colaboradores: any[] = this._colaboradores; // pruebas 

  clientes: any[] = this._clientes; // pruebas 

  proyectos: any[] = this._proyectos; // pruebas 

  // colaboradores: string[]= ['Colaborador 1','Colaborador 2','Colaborador 3','Colaborador 4','Colaborador 5','Colaborador 6']; // pruebas 

  // clientes: string[]= ['Novidesa','Alveg','Medpoint','Fluix']; // pruebas 

  // proyectos: string[]= ['Campañas','Revisión de contenido','Mantenimiento sitio Web','Redes','Junta semanal']; // pruebas 

  nuevaLista: elementoLista[] = [];

  autor: string = '';

  colaborador: string = '';

  fechaPrueba = '04/01/2023';

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  nuevaActividad:FormGroup = this.fb.group({

    nombre: ['',[ Validators.required ]], //desde formulario ✅ 
    descripcion: [''],  //desde formulario ✅ puede ir vacio
    prioridadAlta: [false,[ Validators.required ]], //desde formulario ✅
    autor: this.autor, //se recupera el nombre del usuario ✅
    colaboradorAsignado: ['',[ Validators.required ]], //se recupera el nombre del colaborador ❌ || se puede cambiar en formulario SI ES ADMINISTRADOR ✅
    cliente: ['',[ Validators.required ]],  //desde formulario ✅
    proyecto: ['',[ Validators.required ]], //desde formulario ✅
    semana: [''],//semana
    mes: [''],//mes
    anio: [''],//anio
    tiempoInicio: [''], //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    tiempoFinal: [''],  //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    fecha: ['',[ Validators.required ]],  //se inicia con la fecha del dia seleccionado ❌ || se puede cambiar en formulario ❌
    lista: this.actividad.lista, //se recupera la checkList del componente ✅
    
  });


  constructor( private capturaService:CapturaActividadService,
               private authService:AuthService,
               private fb:FormBuilder,
               private http: HttpClient,
               private pipe: DatePipe ) { }

  ngOnInit(): void {
    this.capturaService.getColaboradores()
    .subscribe(colaboradores => {
      this.formatColaboradores(colaboradores)
    }
    );
  this.capturaService.getClientes()
    .subscribe(clientes => {
      this.formatClientes(clientes)
    }
    );
  this.capturaService.getProyectos()
    .subscribe(proyectos => {
      this.formatProyectos(proyectos)
    }
    );
    
    this.nuevaActividad.value.nombre = this.actividad.fecha
    console.log("oninit estadocrear" ,this.nuevaActividad.value.nombre );
    
    let fecha = new Date(this.actividad.fecha)
    this.nuevaActividad.patchValue({
      fecha: fecha
    })
  }

  horaMinutoToDate( horaMinuto: string, fecha:any ){
    let tiempoArr:any[] = horaMinuto.split(":")
    let fechaArr:any[] = fecha.split("/")


    let resultado = new Date(fechaArr[2], fechaArr[1] - 1 , fechaArr[0] ,tiempoArr[0],tiempoArr[1],tiempoArr[2])
    return resultado

  }



  crearNuevaActividad(){

    
    
    let fechaSimple = this.pipe.transform(this.nuevaActividad.value.fecha, 'yyyy/MM/dd')

    
    

    
    
    if (this.nuevaActividad.value.tiempoInicio === '') { //si esta vacio se manda en 0 ✅
      this.nuevaActividad.value.tiempoInicio = 0;
    }else{
      let prueba = this.horaMinutoToDate(  this.nuevaActividad.value.tiempoInicio , fechaSimple  )
      console.log(prueba);  
      
    }

    if (this.nuevaActividad.value.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.nuevaActividad.value.tiempoFinal = 0;
    }

    
    this.nuevaActividad.value.autor = this.authService.usuario.name //se recupera el nombre del usuario ✅
    this.nuevaActividad.value.lista = this.actividad.lista //se recupera la checkList del componente ✅
    console.log(this.nuevaActividad.value);
    

    
    
    
    //return this.http.post<any>( url, body ).subscribe(ok => {console.log(ok);})
    
  }

  agregarCheckList(){
  
    if ( this.nuevo.contenido.trim().length === 0 ) { return; }
  
    this.actividad.lista.push( {...this.nuevo} );
    this.nuevo.contenido = '';
  
  }

  formatClientes(arrayClientes: any) {
    arrayClientes.data.forEach((element: any) => {
      this._clientes.push({
        id: element._id,
        razon_social: element.razon_social.toUpperCase()
      }
      )
    });
  }

  formatColaboradores(arrayColaboradores: any) {
    arrayColaboradores.data.forEach((element: any) => {
      this._colaboradores.push({
        id: element._id,
        nombre: element.name.toUpperCase()
      }
      )
    });

  }

  formatProyectos(arrayProyectos: any) {
    arrayProyectos.data.forEach((element: any) => {
      this._proyectos.push({
        id: element._id,
        nombre: element.nombre.toUpperCase()
      }
      )
    });
    console.log(this._proyectos)
  }
}
