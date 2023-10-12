import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-estado-duplicar',
  templateUrl: './estado-duplicar.component.html',
  styleUrls: ['../../capturaActividad.css']
})
export class EstadoDuplicarComponent {
  
  @Input() actividad: any = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      id:'',
      name:''
    }],
    cliente: [{
      id:'',
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

  fechaCopia: any;

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  nuevaActividadDuplicada_envio: any = {

    nombre: '', //desde formulario ✅ 
    descripcion: '',  //desde formulario ✅ puede ir vacio
    prioridadAlta: false, //desde formulario ✅
    autor: '', //se recupera el nombre del usuario ✅
    colaborador: '', //se recupera el nombre del colaborador ❌ || se puede cambiar en formulario SI ES ADMINISTRADOR ✅
    cliente: '',  //desde formulario ✅
    proyecto: '', //desde formulario ✅
    semana: 0,//semana ✅
    mes: 0,//mes ✅
    anio: 0,//anio ✅
    tiempoInicio: 0, //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    tiempoFinal: 0,  //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    fecha: 0,  //se inicia con la fecha del dia seleccionado ✅ || se puede cambiar en formulario ✅
    lista: [] //se recupera la checkList del componente ✅

  };
  constructor( private capturaService:CapturaActividadService,
               private datePipe: DatePipe,
               private sidenavService:SidenavService,
               private router: Router,
               private snackBar: MatSnackBar, ) {}

  duplicarActividad(){
    console.log(this.fechaCopia);
    
    console.log(this.actividad);

    this.nuevaActividadDuplicada_envio.nombre = this.actividad.nombre
    this.nuevaActividadDuplicada_envio.descripcion = this.actividad.descripcion
    this.nuevaActividadDuplicada_envio.prioridadAlta = this.actividad.prioridadAlta
    this.nuevaActividadDuplicada_envio.autor = this.actividad.autor[0]._id
    this.nuevaActividadDuplicada_envio.colaborador  = this.actividad.colaborador[0]._id
    this.nuevaActividadDuplicada_envio.cliente = this.actividad.cliente[0]._id
    this.nuevaActividadDuplicada_envio.proyecto = this.actividad.proyecto[0]._id
    this.nuevaActividadDuplicada_envio.fecha = this.fechaCopia.getTime()
    this.nuevaActividadDuplicada_envio.semana =  parseInt(this.datePipe.transform(this.fechaCopia, 'w')!);
    this.nuevaActividadDuplicada_envio.mes = this.fechaCopia.getMonth() + 1
    this.nuevaActividadDuplicada_envio.anio = this.fechaCopia.getFullYear()
    this.nuevaActividadDuplicada_envio.tiempoInicio = 0
    this.nuevaActividadDuplicada_envio.tiempoFinal = 0
    this.nuevaActividadDuplicada_envio.lista = this.actividad.lista
    this.nuevaActividadDuplicada_envio.facturable = this.actividad.facturable

    console.log(this.nuevaActividadDuplicada_envio);
    
    this.capturaService.postNuevaActvidad(this.nuevaActividadDuplicada_envio)
    .subscribe(resp => {
      ++this.capturaService.reloadSemana
      this.sidenavService.toggle();
      const message = 'La actividad se duplicó correctamente';
      const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
      setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
    });
    
  }

  checkElemento( index:number ): void{

    this.actividad.lista[index].estatus = !this.actividad.lista[index].estatus

    

  }

  eliminarElemento( index:number ): void{
    console.log("elemento a eliminar:", this.actividad.lista[index].contenido);
    this.actividad.lista[index].estatus
    if (index > -1) { 
    this.actividad.lista.splice(index, 1); 
    }
  }


  agregarCheckList() {

    if (this.nuevo.contenido.trim().length === 0) { return; }

    this.actividad.lista.push({ ...this.nuevo });
    this.nuevo.contenido = '';

  }


}
