import { Component} from '@angular/core';

@Component({
  selector: 'capturarActividad',
  templateUrl: `capturaActividad.component.html`,
  styleUrls: ['./capturaActividad.component.css']
})
export class CapturaActividadComponent {
  nombreActividad: string = 'Actividad 1';
  prioridadAlta: boolean = true;
  autor: string = 'Colaborador 6';
  cliente: string = 'Alveg';
  proyecto: string = 'Mantenimiento sitio Web';
  fecha: string = new Date().toLocaleDateString();
  tiempoInicio: number = 0;
  tiempoFin: number = 0;
  checkList: string[][] = [
    ['queda pendiente componente 2', 'checked'],
    ['cambiar colores menu', ''],
    ['cambiar colores home', ''],
  ];
  constructor(){
    
  }


  // -----------------------------
  // ----- Inicia CRONOMETRO ----- 
  // -----------------------------

  public hora:number = 0;
  public minutos:number = 0;
  public segundos:number = 0;
  public contador:any = null;
  public buttonLabel:string = 'Iniciar';
 
  start(){
    if (this.contador == undefined) {
      this.tiempoInicio = Date.now();
      this.buttonLabel = 'Detener';
      this.contador = setInterval( ()=>{
        this.segundos +=1;
        if (this.segundos == 60) {
          this.segundos = 0;
          this.minutos += 1;
          if (this.minutos == 60) {
            this.minutos = 0;
            this.hora += 1;
          }
        }
      } , 1000 );
    }
  }

  stop(){
    this.tiempoFin = Date.now();
    clearInterval(this.contador);
    this.contador = null;
    this.buttonLabel = 'Iniciar';
  }

  // ------------------------------
  // ----- Termina CRONOMETRO -----
  // ------------------------------
}
