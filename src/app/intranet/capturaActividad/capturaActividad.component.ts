import { Component} from '@angular/core';


interface elementoLista {
  contenido: string;
  estatus: boolean;
}

interface acumuladorTiempo {
  hora: number;
  minuto: number;
  segundo: number;
}

interface registroActividad {
  nombre: string;
  prioridadAlta: boolean;
  autor: string;
  cliente: string;
  proyecto: string;
  fecha: string;
  tiempoInicio?: any;
  tiempoFinal?: number;
  tiempoAcumulado: acumuladorTiempo;
  lista: elementoLista[];
}


@Component({
  selector: 'app-capturarActividad',
  templateUrl: `capturaActividad.component.html`,
  styleUrls: ['./capturaActividad.component.css']
})
export class CapturaActividadComponent {


  actividad: registroActividad = {
    nombre: 'Actividad 1',
    prioridadAlta: true,
    autor: 'Colaborador 6',
    cliente: 'Alveg',
    proyecto: 'Mantenimiento sitio Web',
    fecha: new Date().toLocaleDateString(),
    tiempoInicio: 0,
    tiempoFinal: 0,
    tiempoAcumulado: {
      hora: 0,
      minuto: 0,
      segundo: 0
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

  constructor(){
    
  }


  // -----------------------------
  // ----- Inicia CRONOMETRO ----- 
  // -----------------------------


  public contador:any = null;
  public buttonLabel:string = 'Iniciar';

  public horaInicio: number = 0;
  public minutoInicio: number = 0;
  public segundoInicio: number = 0;

  public horaFinal: number = 0;
  public minutoFinal: number = 0;
  public segundoFinal: number = 0;
 
  start(){
    if (this.contador == undefined) {
      
      this.horaInicio = new Date().getHours();
      this.minutoInicio = new Date().getMinutes();
      this.segundoInicio = new Date().getSeconds();
      
      this.actividad.tiempoInicio = Date.now();
      this.buttonLabel = 'Detener';
      this.contador = setInterval( ()=>{
        this.actividad.tiempoAcumulado.segundo +=1;
        if (this.actividad.tiempoAcumulado.segundo == 60) {
          this.actividad.tiempoAcumulado.segundo = 0;
          this.actividad.tiempoAcumulado.minuto += 1;
          if (this.actividad.tiempoAcumulado.minuto == 60) {
            this.actividad.tiempoAcumulado.minuto = 0;
            this.actividad.tiempoAcumulado.hora += 1;
          }
        }
      } , 1000 );
    }
  }

  stop(){

    this.horaFinal = new Date().getHours();
    this.minutoFinal = new Date().getMinutes();
    this.segundoFinal = new Date().getSeconds();

    this.actividad.tiempoFinal = Date.now();
    clearInterval(this.contador);
    this.contador = null;
    this.buttonLabel = 'Iniciar';
  }

  // ------------------------------
  // ----- Termina CRONOMETRO -----
  // ------------------------------
}
