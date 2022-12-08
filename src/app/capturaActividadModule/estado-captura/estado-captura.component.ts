import { Component, Input } from '@angular/core';
import { acumuladorTiempoNumber, acumuladorTiempoString, elementoLista, registroActividad } from '../Interfaces/capturaActividad.interface';


@Component({
  selector: 'app-estado-captura',
  templateUrl: './estado-captura.component.html',
  styleUrls: ['../capturaActividad.css']
})
export class EstadoCapturaComponent{

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

  acumuladorPrincipal: acumuladorTiempoNumber ={ //Cronometro
    hora: 0,
    minuto: 0,
    segundo: 0
  };

  acumuladorInicial: acumuladorTiempoString ={ //Cronometro
    hora: '00',
    minuto: '00',
    segundo: ''
  };

  acumuladorFinal: acumuladorTiempoString ={ //Cronometro
    hora: '00',
    minuto: '00',
    segundo: ''
  };

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  buttonLabel: string = 'Iniciar'; //Cronometro

  contador:any = null; //Cronometro
  
  constructor() { }

  

  getHoras(timestamp: number):number{return new Date(timestamp).getHours();}

  getMinutos(timestamp: number):number{return new Date(timestamp).getMinutes();}

  startCrono(){ //Cronometro
    if (this.contador == undefined) { //No está iniciado
    if (this.acumuladorFinal.hora != '00' && this.acumuladorFinal.minuto != '00') {
      this.acumuladorFinal.hora = '00';
      this.acumuladorFinal.minuto = '00';
    }
    this.acumuladorPrincipal.segundo = 0;
    this.acumuladorPrincipal.minuto = 0;
    this.acumuladorPrincipal.hora = 0;
    this.actividad.tiempoInicio = Date.now();
    this.acumuladorInicial.hora = this.getHoras(this.actividad.tiempoInicio) < 10? "0"+this.getHoras(this.actividad.tiempoInicio).toString() : this.getHoras(this.actividad.tiempoInicio).toString();
    this.acumuladorInicial.minuto = this.getMinutos(this.actividad.tiempoInicio) < 10? "0"+this.getMinutos(this.actividad.tiempoInicio).toString() : this.getMinutos(this.actividad.tiempoInicio).toString();
    
    this.buttonLabel = 'Detener';

    this.contador = setInterval( ()=>{ // Reloj
        this.acumuladorPrincipal.segundo +=1;
        if (this.acumuladorPrincipal.segundo < 10) {this.actividad.tiempoAcumulado.segundo = "0"+this.acumuladorPrincipal.segundo;}
        else {this.actividad.tiempoAcumulado.segundo = this.acumuladorPrincipal.segundo.toString();}
        if (this.acumuladorPrincipal.segundo == 60) {
        this.acumuladorPrincipal.segundo = 0;
        this.actividad.tiempoAcumulado.segundo = "0"+this.acumuladorPrincipal.segundo;
        
        this.acumuladorPrincipal.minuto += 1;
        if (this.acumuladorPrincipal.minuto < 10) {this.actividad.tiempoAcumulado.minuto = "0"+this.acumuladorPrincipal.minuto;}
        else {this.actividad.tiempoAcumulado.minuto = this.acumuladorPrincipal.minuto.toString();}
        if (this.acumuladorPrincipal.minuto == 60) {
            this.acumuladorPrincipal.minuto = 0;
            this.actividad.tiempoAcumulado.minuto = "0"+this.acumuladorPrincipal.minuto;
            this.acumuladorPrincipal.hora += 1;
            console.log(this.acumuladorPrincipal.hora)
            if (this.acumuladorPrincipal.hora < 10) {this.actividad.tiempoAcumulado.hora = "0"+this.acumuladorPrincipal.hora;}
            else {this.actividad.tiempoAcumulado.hora = this.acumuladorPrincipal.hora.toString();}
          }
        }
    } , 1000 );


    }else{//Está iniciado
    clearInterval(this.contador); //detiene reloj

    this.actividad.tiempoFinal = Date.now();

    this.acumuladorFinal.hora = this.getHoras(this.actividad.tiempoFinal) < 10? "0"+this.getHoras(this.actividad.tiempoFinal).toString() : this.getHoras(this.actividad.tiempoFinal).toString();
    this.acumuladorFinal.minuto = this.getMinutos(this.actividad.tiempoFinal) < 10? "0"+this.getMinutos(this.actividad.tiempoFinal).toString() : this.getMinutos(this.actividad.tiempoFinal).toString();
    
    this.contador = null;
    this.buttonLabel = 'Iniciar';
    }
  }

  agregarCheckList(){
  
    if ( this.nuevo.contenido.trim().length === 0 ) { return; }
  
    this.actividad.lista.push( {...this.nuevo} );
    this.nuevo.contenido = '';


  }




}
