import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { SidenavService } from '../../services/sidenav.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tarjeta-actividad',
  templateUrl: './tarjeta-actividad.component.html',
  styleUrls: ['./tarjeta-actividad.component.css']
})



export class TarjetaActividadComponent implements OnInit {

  @Input() actividad: any = {
      nombre: '',
      prioridadAlta: false,
      autor: [{
        id: '',
        name: ''
      }],
      cliente: [{
        _id: '',
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

  timeStatus: string = 'asignada';
  
  imgCliente: string = 'background-image: url()';

  registrosTiempo: any = []; //array con registros de tiempo {tiempo inicio, tiempo final y total}

  registrosTotales: any = []; //array con los totales de los registros (tiempo transcurrido entre tiempo inicio y tiempo final)

  totalRegistros: any; //suma del total de los registros


  constructor( private capturaService: CapturaActividadService,
               private sidenavService:SidenavService,
               private datePipe: DatePipe, ) { }

  abrirActividad( act: registroActividad ){
    // console.log(act);
    this.capturaService.detalleActividad(act);
    //this.capturaService.modificarDrawer(true);
    this.capturaService.modeDrawer = 'over';
    this.sidenavService.toggle();
    //this.capturaService.toggle(); //toggleSidenav
  }

  ngOnInit(): void {
    
    // console.log(this.actividad.tarjetaOrigen);

    this.actividad.registros.forEach((registroCrudo:any) => {
      // console.log(this.difTiempo(registroCrudo.tiempoInicio, registroCrudo.tiempoFinal));
      // console.log(this.datePipe.transform(registroCrudo.tiempoInicio, 'hh:mm'));
      const registroIndividual = {
        inicio: this.datePipe.transform(registroCrudo.tiempoInicio, 'hh:mm'),
        fin: this.datePipe.transform(registroCrudo.tiempoFinal, 'hh:mm'),
        total: this.difTiempo(registroCrudo.tiempoInicio, registroCrudo.tiempoFinal).resHor + ':' + this.difTiempo(registroCrudo.tiempoInicio, registroCrudo.tiempoFinal).resMin
      }

      this.registrosTiempo.push(registroIndividual)
      
    });

    if (this.registrosTiempo.length > 1) { //si hay registros multiples
      // console.log(this.registrosTiempo);
      const arrTotales: any = [];

      this.registrosTiempo.forEach((registros:any) => {
        arrTotales.push(registros.total);
      });

      this.totalRegistros = this.sumaTiempos(arrTotales);
      
    }

    // console.log(this.totalRegistros);

    
    

    this.imgCliente = '../../../../assets/images/clientes/cliente_' + this.actividad.cliente[0]._id + '.png';

    if (this.actividad.tiempoInicio === 0 && this.actividad.tiempoFinal === 0) {
      this.timeStatus = 'asignada'
      this.timeStatus = '00:00'
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

  sumaTiempos(arrayDiaTime: any[]): string {

    let accHora = 0
    let accMin = 0
    let totalMin = 0

    arrayDiaTime.forEach(element => {
      const arr = element.split(':')
      const hora = parseInt(arr[0])
      const minuto = parseInt(arr[1])

      accHora = accHora + hora
      accMin = accMin + minuto

    });

    totalMin = (accHora * 60) + accMin

    if (totalMin === 0) {
      return '-'
    }

    let horasRaw = Math.floor(totalMin / 60);
    let minutosRaw = totalMin % 60;
    const horas = horasRaw < 10 ? '0' + horasRaw : horasRaw;
    const minutos = minutosRaw < 10 ? '0' + minutosRaw : minutosRaw;

    return `${horas}:${minutos}`
  }
}
