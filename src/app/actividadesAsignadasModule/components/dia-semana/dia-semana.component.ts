import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-dia-semana',
  templateUrl: './dia-semana.component.html',
  styleUrls: ['./dia-semana.component.css']
})
export class DiaSemanaComponent implements OnInit{

  @Input() diasEnSemana: number[] = [];

  @Input() diaActual: number = 0;

  @Input() fechaSeleccionada: any;

  @Input() colaboradorSeleccionado: any;

  @Output() propagar = new EventEmitter<string>();

  actividad: registroActividad = {
    
    nombre: '',
    prioridadAlta: false,
    autor: [{
      id: '',
      name: ''
    }],
    cliente: [{
      id: '',
      razon_social:''
    }],
    proyecto: [{
      id:'',
      nombre:''
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
      id:'',
      name:''
    }]
    
  }

  
  humanDate: any = "";

  anio: any;

  semana: any;

  semanaTime: any[] = [];

  acumuladoSemanal: string = '-'

  lunes: registroActividad[] = [];

  lunesTime: any[] = [];

  acumuladoLunes: string = '-'

 
  martes: registroActividad[] = [];

  martesTime: any[] = [];

  acumuladoMartes: string = '-'

 
  miercoles: registroActividad[] = [];

  miercolesTime: any[] = [];

  acumuladoMiercoles: string = '-'

 
  jueves: registroActividad[] = [];

  juevesTime: any[] = [];

  acumuladoJueves: string = '-'

 
  viernes: registroActividad[] = [];

  viernesTime: any[] = [];

  acumuladoViernes: string = '-'

 
  sabado: registroActividad[] = [];

  sabadoTime: any[] = [];

  acumuladoSabado: string = '-'

 
  domingo: registroActividad[] = [];

  domingoTime: any[] = [];

  acumuladoDomingo: string = '-'

  constructor( private capturaService: CapturaActividadService,
               private datePipe: DatePipe,
               private sidenavService:SidenavService, ) { }


  

  crearActividad( dia:number ){
    console.log("crea", this.diasEnSemana[dia])

    const actividadVacia: registroActividad = {
      
      nombre: '',
      prioridadAlta: false,
      autor: [{
        id: '',
        name: ''
      }],
      cliente: [{
        id: '',
        razon_social:''
      }],
      proyecto: [{
        id:'',
        nombre:''
      }],
      fecha: this.diasEnSemana[dia],
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
        id:'',
        name:''
      }]
      
    }

    this.sidenavService.toggle();
    this.capturaService.modificarDrawer(true);
    this.capturaService.cambiaEstadoService('crear');
    this.capturaService.generarActividad( actividadVacia );
  }

  formatActs( arrayActividades: any ){
    //console.log(arrayActividades.data.length)
    
    arrayActividades.data.forEach((element: any) => {
      
      this.actividad = element
      
      this.humanDate = new Date((element.fecha)) //transforma el Timestamp a un objeto fecha
      let prueba = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"})
      
      this.actividad.dia = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"}) //saca el dia de la fecha en formato de tres letras (lunes => "lun")

      this.sortAct( this.actividad ) //manda la actividad a la funcion 'sortAct()' y ésta la asigna en su dia correspondiente


    });

  }




  sortAct(actividad: any){

    let tiempoAcumulado
 
    
    if (actividad.tiempoInicio !== 0) {
      tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
      this.semanaTime.push( tiempoAcumulado );
      
    }

      
      switch (actividad.dia) {
        case "dom": //domingo
          this.domingo.push( {...actividad} );

          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.domingoTime.push( tiempoAcumulado );
            this.semanaTime.push( tiempoAcumulado );
          }
          
          break;
  
        case "lun": //lunes
          this.lunes.push( {...actividad} );
          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.lunesTime.push( tiempoAcumulado );
          }
          break;
  
        case "mar": //martes
          this.martes.push( {...actividad} );
          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.martesTime.push( tiempoAcumulado );
          }
          break;
  
        case "mié": //miercoles
          this.miercoles.push( {...actividad} );
          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.miercolesTime.push( tiempoAcumulado );
          }
          break;
        case "jue": //jueves
          this.jueves.push( {...actividad} );
          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.juevesTime.push( tiempoAcumulado );
          }
          break;
  
        case "vie": //viernes
          this.viernes.push( {...actividad} );
          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.viernesTime.push( tiempoAcumulado );
          }
          break;
  
        case "sáb": //sabado
          this.sabado.push( {...actividad} );
          if (actividad.tiempoInicio !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.sabadoTime.push( tiempoAcumulado );
          }
          break;
        
        default:
          break;
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

  getAcumuladoDia(arrayDiaTime: any[]):string {

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
    
    return `${Math.floor(totalMin / 60)}:${totalMin % 60}`
  }

  ngOnInit(): void {

    this.semana = this.datePipe.transform(this.fechaSeleccionada, 'w')

    this.anio = this.datePipe.transform(this.fechaSeleccionada, 'y')

    this.capturaService.getActividadesSemana(this.colaboradorSeleccionado,this.anio,this.semana)
      .subscribe( actividades =>{
            
            this.formatActs(actividades)

            this.acumuladoDomingo = this.getAcumuladoDia(this.domingoTime)
            this.acumuladoLunes = this.getAcumuladoDia(this.lunesTime)
            this.acumuladoMartes = this.getAcumuladoDia(this.martesTime)
            this.acumuladoMiercoles = this.getAcumuladoDia(this.miercolesTime)
            this.acumuladoJueves = this.getAcumuladoDia(this.juevesTime)
            this.acumuladoViernes = this.getAcumuladoDia(this.viernesTime)
            this.acumuladoSabado = this.getAcumuladoDia(this.sabadoTime)

            this.acumuladoSemanal = this.getAcumuladoDia(this.semanaTime)
            this.propagar.emit(this.acumuladoSemanal);
          } 
        )
  }

}
