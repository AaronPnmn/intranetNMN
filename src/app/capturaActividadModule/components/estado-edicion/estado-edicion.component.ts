import { Component, Input, OnInit } from '@angular/core';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';

@Component({
  selector: 'app-estado-edicion',
  templateUrl: './estado-edicion.component.html',
  styleUrls: ['../../capturaActividad.css']
})
export class EstadoEdicionComponent implements OnInit {

  @Input() actividad: registroActividad = {
    nombre: '',
    prioridadAlta: false,
    autor: '',
    cliente: '',
    proyecto: '',
    fecha: '',
    tiempoAcumulado: {
      hora: '',
      minuto: '',
      segundo: ''
    },
    lista: [],
    tiempoInicio: 0,
    tiempoFinal: 0
  }

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

  constructor() { }
  ngOnInit(): void {
    this.horaInicial =  this.getHoras(this.actividad.tiempoInicio);
    this.minutoInicial =  this.getMinutos(this.actividad.tiempoInicio);
    this.horaFinal =  this.getHoras(this.actividad.tiempoFinal);
    this.minutoFinal =  this.getMinutos(this.actividad.tiempoFinal);
  }

  getHoras(timestamp: number):number{return new Date(timestamp).getHours();}
  getMinutos(timestamp: number):number{return new Date(timestamp).getMinutes();}

}
