import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';

@Component({
  selector: 'app-estado-edicion',
  templateUrl: './estado-edicion.component.html',
  styleUrls: ['../../capturaActividad.css']
})
export class EstadoEdicionComponent implements OnInit {

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
        nombre:''
      }],
      colaboradorAsignado:[{
        id:'',
        name:''
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
      idActividad: 0
  }

  get buttonLabel():any {
    return this.capturaService.buttonLabel;
 }
  get tiempoAcumulado():any {
    return this.capturaService.tiempoAcumulado;
 }

  get tiempoInicio():any {
     return this.capturaService.tiempoInicio;
  }

  get tiempoFinal():any {
    return this.capturaService.tiempoFinal;
  }

  selectedDate: any = '';
  //this.datePipe.transform(new Date(this.actividad.fecha), 'yyyy-MM-dd');

  colaboradores: string[]= ['Colaborador 1','Colaborador 2','Colaborador 3','Colaborador 4','Colaborador 5','Colaborador 6'];

  clientes: string[]= ['Novidesa','Alveg','Medpoint','Fluix'];

  proyectos: string[]= ['Campañas','Revisión de contenido','Mantenimiento sitio Web','Redes','Junta semanal'];

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  horaInicial: number =  0;
  minutoInicial: number =  0;
  horaFinal: number =  0;
  minutoFinal: number =  0;

  constructor( private capturaService:CapturaActividadService,
               private datePipe:DatePipe ) { }
  ngOnInit(): void {
      console.log(this.actividad.fecha);
      this.selectedDate = this.datePipe.transform(new Date(this.actividad.fecha), 'yyyy-MM-dd');
  }


}
