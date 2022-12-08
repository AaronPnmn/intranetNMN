import { Component, Input } from '@angular/core';
import { registroActividad } from '../Interfaces/capturaActividad.interface';

@Component({
  selector: 'app-estado-duplicar',
  templateUrl: './estado-duplicar.component.html',
  styleUrls: ['../capturaActividad.css']
})
export class EstadoDuplicarComponent {
  
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
  constructor() { }



}
