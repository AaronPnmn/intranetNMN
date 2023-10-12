import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { SidenavService } from '../../services/sidenav.service';


@Component({
  selector: 'app-tarjeta-actividad',
  templateUrl: './tarjeta-actividad.component.html',
  styleUrls: ['./tarjeta-actividad.component.css']
})



export class TarjetaActividadComponent implements OnInit {

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

  timeStatus: string = 'asignada'
  


  constructor( private capturaService: CapturaActividadService,
               private sidenavService:SidenavService, ) { }

  abrirActividad( act: registroActividad ){
    console.log(act);
    this.capturaService.detalleActividad(act);
    //this.capturaService.modificarDrawer(true);
    this.capturaService.modeDrawer = 'over';
    this.sidenavService.toggle();
    //this.capturaService.toggle(); //toggleSidenav
  }

  ngOnInit(): void {
    

    

    if (this.actividad.tiempoInicio === 0 && this.actividad.tiempoFinal === 0) {
      this.timeStatus = 'asignada'
    }

    if (this.actividad.tiempoInicio !== 0 && this.actividad.tiempoFinal !== 0) {
      this.timeStatus = 'tiempoFinal'
      this.timeStatus = `${this.difTiempo(this.actividad.tiempoInicio, this.actividad.tiempoFinal).resHor}:${this.difTiempo(this.actividad.tiempoInicio, this.actividad.tiempoFinal).resMin}`
    }

    if (this.actividad.tiempoInicio !== 0 && this.actividad.tiempoFinal === 0) {
      this.timeStatus = 'EN CURSO'
     
    }

  }

  difTiempo(inicio:number , final:number){
    let horaInicio:any = new Date(inicio)
    let h1 = horaInicio.getHours();
    let m1 = horaInicio.getMinutes();
    let s1 = horaInicio.getSeconds();

    let horaFinal:any = new Date(final)
    let h2 = horaFinal.getHours();
    let m2 = horaFinal.getMinutes();
    let s2 = horaFinal.getSeconds();

    let tiempo: any = {
      resHor: h2 - h1,
      resMin: m2 - m1,
      resSeg: s2 - s1
    }


    if (Math.sign(tiempo.resSeg) == -1) {
      tiempo.resSeg = tiempo.resSeg + 60;
      tiempo.resMin = tiempo.resMin - 1;
    }

    if (Math.sign(tiempo.resMin) == -1) {
      tiempo.resMin = tiempo.resMin + 60;
      tiempo.resHor = tiempo.resHor - 1;
    }

    if (tiempo.resHor < 10) {
      tiempo.resHor = '0' + tiempo.resHor
    }

    if (tiempo.resMin < 10) {
      tiempo.resMin = '0' + tiempo.resMin
    }

    if (tiempo.resSeg < 10) {
      tiempo.resSeg = '0' + tiempo.resSeg
    }

    return  tiempo
  }

}
