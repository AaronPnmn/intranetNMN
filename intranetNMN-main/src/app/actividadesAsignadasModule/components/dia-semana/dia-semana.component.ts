import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { SidenavService } from '../../services/sidenav.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

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


  get vistaDia():any {
    return this.capturaService.vistaDia;
  }



  lunes: registroActividad[] = [];

  lunesTime: any[] = [];

  acumuladoLunes: string = '-'

  lunesCurso: boolean = false;

 
  martes: registroActividad[] = [];

  martesTime: any[] = [];

  acumuladoMartes: string = '-'

  martesCurso: boolean = false;

 
  miercoles: registroActividad[] = [];

  miercolesTime: any[] = [];

  acumuladoMiercoles: string = '-'
  
  miercolesCurso: boolean = false;

 
  jueves: registroActividad[] = [];

  juevesTime: any[] = [];

  acumuladoJueves: string = '-'

  juevesCurso: boolean = false;

 
  viernes: registroActividad[] = [];

  viernesTime: any[] = [];

  acumuladoViernes: string = '-'

  viernesCurso: boolean = false;

 
  sabado: registroActividad[] = [];

  sabadoTime: any[] = [];

  acumuladoSabado: string = '-'

  sabadoCurso: boolean = false;

 
  domingo: registroActividad[] = [];

  domingoTime: any[] = [];

  acumuladoDomingo: string = '-';

  domingoCurso: boolean = false;

  constructor( private capturaService: CapturaActividadService,
               private datePipe: DatePipe,
               private sidenavService:SidenavService, ) { }

  drop(event: CdkDragDrop<registroActividad[]>, fechaDestino:any) {

    console.log(new Date(fechaDestino));
      
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      this.editaActividad(event.item.data, fechaDestino)

    }
  }

  editaActividad(actividad:any, fechaDestino:any) {
    let editaActividad_envio:any = {

      nombre: '', //desde formulario ✅ 
      descripcion: '',  //desde formulario ✅ puede ir vacio
      prioridadAlta: false, //desde formulario ✅
      autor: '', //se recupera el mismo de la actividad (no se modifica) ✅
      colaborador: '', //se recupera el nombre del colaborador ❌ || se puede cambiar en formulario SI ES ADMINISTRADOR ✅
      cliente: '',  //desde formulario ✅
      proyecto: '', //desde formulario ✅
      semana: 0,//semana ❌
      mes: 0,//mes ❌
      anio: 0,//anio ❌
      tiempoInicio: 0, //si esta vacio se manda en 0 ❌ || si NO esta vacio se recupera del formulario ❌ se procesa y se convierte en timeStamp ❌
      tiempoFinal: 0,  //si esta vacio se manda en 0 ❌ || si NO esta vacio se recupera del formulario ❌ se procesa y se convierte en timeStamp ❌
      fecha: 0,  //se inicia con la fecha del dia seleccionado ❌ || se puede cambiar en formulario ❌
      lista: [] //se recupera la checkList del componente ❌
  
    };

    let fecha:Date = new Date(fechaDestino);

    editaActividad_envio.nombre = actividad.nombre
    editaActividad_envio.descripcion = actividad.descripcion
    editaActividad_envio.prioridadAlta = actividad.prioridadAlta
    editaActividad_envio.colaborador = actividad.colaborador[0]._id
    editaActividad_envio.cliente = actividad.cliente[0]._id
    editaActividad_envio.proyecto = actividad.proyecto[0]._id
    editaActividad_envio.autor = actividad.autor[0]._id
    editaActividad_envio.fecha = fecha.getTime() 
    editaActividad_envio.lista = actividad.lista
    editaActividad_envio.semana = parseInt(this.datePipe.transform(editaActividad_envio.fecha, 'w')!);
    editaActividad_envio.mes = fecha.getMonth() + 1
    editaActividad_envio.anio = fecha.getFullYear()
    editaActividad_envio.facturable = actividad.facturable

    // const fechaSimple = this.datePipe.transform(this.editaActividad_envio.fecha, 'yyyy/MM/dd')

    console.log('Id actividad:', actividad._id);
    console.log('Actividad a editar:', editaActividad_envio);

    const idActivdad = actividad._id

    this.capturaService.putEditaActvidad(editaActividad_envio , idActivdad)
      .subscribe(resp => {
        // ++this.capturaService.reloadSemana
        // const message = 'La actividad se actualizó correctamente';
        // const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        // setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
      });
  }

  crearActividad( dia:number, diaString: string ){
    console.log("crea", this.diasEnSemana[dia])

    this.capturaService.modificarDiaVista(diaString)

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
      

    this.capturaService.modeDrawer = 'side';
    this.sidenavService.toggle();
    // this.capturaService.modificarDrawer(true);
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
    
    
    
    this.domingo = this.sortByTime(this.domingo)
    this.lunes = this.sortByTime(this.lunes)
    this.martes = this.sortByTime(this.martes)
    this.miercoles = this.sortByTime(this.miercoles)
    this.jueves = this.sortByTime(this.jueves)
    this.viernes = this.sortByTime(this.viernes)
    this.sabado = this.sortByTime(this.sabado)

     



    
  }

  sortByTime( dayArray: any[] ){
    let arrayOrdenado = dayArray.sort(
      (p1, p2) => (p1.tiempoInicio > p2.tiempoInicio) ? 1 : (p1.tiempoInicio < p2.tiempoInicio) ? -1 : 0);
    return arrayOrdenado
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
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.domingoCurso = true;}
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.domingoTime.push( tiempoAcumulado );
            this.semanaTime.push( tiempoAcumulado );
          }
          
          break;
  
        case "lun": //lunes
          this.lunes.push( {...actividad} );
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.lunesCurso = true;}
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.lunesTime.push( tiempoAcumulado );
          }
          break;
  
        case "mar": //martes
          this.martes.push( {...actividad} );
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.martesCurso = true;}
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.martesTime.push( tiempoAcumulado );
          }
          break;
  
        case "mié": //miercoles
          this.miercoles.push( {...actividad} );
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.miercolesCurso = true;}
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.miercolesTime.push( tiempoAcumulado );
          }
          break;
        case "jue": //jueves
          this.jueves.push( {...actividad} );
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.juevesCurso = true;}
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.juevesTime.push( tiempoAcumulado );
          }
          break;
  
        case "vie": //viernes
          this.viernes.push( {...actividad} );

          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.viernesCurso = true;}
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
            tiempoAcumulado = `${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resHor}:${this.difTiempo(actividad.tiempoInicio, actividad.tiempoFinal).resMin}`
            this.viernesTime.push( tiempoAcumulado );
          }
          break;
  
        case "sáb": //sabado
          this.sabado.push( {...actividad} );
          
          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.sabadoCurso = true;}

          if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal !== 0) {
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
