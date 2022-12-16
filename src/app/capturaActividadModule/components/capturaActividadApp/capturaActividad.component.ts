import { Component } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';



@Component({
  selector: 'app-capturarActividad',
  templateUrl: `capturaActividad.component.html`,
  styleUrls: ['../../capturaActividad.css']
})
export class CapturaActividadComponent {


  actividad: registroActividad = {
    nombre: 'Actividad 1',
    prioridadAlta: true,
    autor: 'Colaborador 6',
    cliente: 'Alveg',
    proyecto: 'Mantenimiento sitio Web',
    fecha: '2022-12-08',
    tiempoInicio: 0,
    tiempoFinal: 0,
    tiempoAcumulado: {
        hora: '00',
        minuto: '00',
        segundo: '00'
    },
    lista: [
        {contenido: 'queda pendiente componente 2',
        estatus: true 
        },
        {contenido: 'queda pendiente modulo 5',
        estatus: false
        },
        {contenido: 'queda pendiente estilos menu',
        estatus: true
        }
    ]
  }

  estado: string = 'captura';


  constructor() {}

  cambiaEstado(nuevoEstado: string){
    this.estado = nuevoEstado;
  }




}
