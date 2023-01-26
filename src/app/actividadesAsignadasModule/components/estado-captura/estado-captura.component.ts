import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { acumuladorTiempo, acumuladorTiempoNumber, acumuladorTiempoString, elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { TimeEditPipe } from '../../pipes/time-edit.pipe';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { DialogService } from '../../services/dialog.service';
import { SidenavService } from '../../services/sidenav.service';


@Component({
  selector: 'app-estado-captura',
  templateUrl: './estado-captura.component.html',
  styleUrls: ['../../capturaActividad.css'],
  
})
export class EstadoCapturaComponent implements OnInit, OnChanges{

  @Input() onToggled: boolean = false;
  
  @Input() actividad: any = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      name: '',
      id: ''
    }],
    cliente: [{
      razon_social: '',
      id: ''
    }],
    proyecto: [{
      nombre: '',
      id:''
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
    }],
    descripcion: ''
  }

  
  
  tiempoInicio:any;

  tiempoFinal:any;

  buttonLabel: string = 'Iniciar'

  tiempoAcumulado: acumuladorTiempo = {
    resHor: '00',
    resMin: '00',
    resSeg: '00'
  }

  contador:any = null; //Cronometro
  

  actualizaActividad_envio: any = {

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


 




  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }


  
  constructor( private capturaService:CapturaActividadService,
               private dialog: DialogService,
               private snackBar: MatSnackBar,
               private sidenavService:SidenavService,
               private timePipe: TimeEditPipe,
               private datePipe: DatePipe, ) { }
  
  ngOnChanges(changes: any): void {


    console.log(this.onToggled);
          
    
  }

  ngOnInit(): void {

    
    this.iniciadorActividad();
    
    
  }

  iniciadorActividad(){

    

    this.tiempoInicio = this.actividad.tiempoInicio
    this.tiempoFinal = this.actividad.tiempoFinal

    if (this.actividad.tiempoInicio == 0) { //Sin registros  --- CASO 1 ---

      
      this.tiempoAcumulado = {
        resSeg: '00',
        resHor: '00',
        resMin: '00'
      };

      

      console.log("caso 1");

    
  }else{ //con tiempo inicio

    if (this.actividad.tiempoFinal == 0) { //sin tiempo final  --- CASO 3 ---
      

      let timeNow: number = Date.now();
      let difTiempo: any = this.difTiempo(this.actividad.tiempoInicio, timeNow)
      this.tiempoAcumulado = difTiempo;
      this.tiempoInicio = this.timePipe.transform(this.actividad.tiempoInicio) 
      this.iniciarCrono(difTiempo);
      console.log("caso 3");
      

    } else{ //Con tiempo final  --- CASO 2 ---

      this.tiempoAcumulado = this.difTiempo(this.actividad.tiempoInicio , this.actividad.tiempoFinal);
      this.tiempoInicio = this.timePipe.transform(this.actividad.tiempoInicio) 
      this.tiempoFinal = this.timePipe.transform(this.actividad.tiempoFinal) 
      
      console.log(this.actividad.tiempoFinal);
      console.log("caso 2");

    }
      
  }
  }

  iniciarCrono( tiempoAcumulado?: acumuladorTiempo ){
    
 
    


    let hora:any = 0;
    let minuto:any = 0;
    let segundo:any = 0;  


  

    if ( tiempoAcumulado ) { //hay tiempo acumulado
      
      hora = parseInt(tiempoAcumulado.resHor);
      this.tiempoAcumulado.resHor >= 10 ? 
      this.tiempoAcumulado.resHor = hora: 
      this.tiempoAcumulado.resHor = "0"+hora;

      minuto = parseInt(tiempoAcumulado.resMin);
      
      this.tiempoAcumulado.resMin >= 10 ? 
      this.tiempoAcumulado.resMin = minuto : 
      this.tiempoAcumulado.resMin = "0"+minuto;
      
      segundo = parseInt(tiempoAcumulado.resSeg);
      
      this.tiempoAcumulado.resSeg >= 10 ? 
      this.tiempoAcumulado.resSeg = segundo: 
      this.tiempoAcumulado.resSeg = "0"+segundo;
      
    }

    console.log(this.actividad.tiempoFinal);
    
    if ( this.actividad.tiempoInicio > 0 && this.actividad.tiempoFinal > 0  ){ 
      console.log('entra');
      
      this.tiempoInicio = this.timePipe.transform(Date.now())
    }
    
    if (this.contador == undefined) { //No está iniciado
    
      
      console.log("no esta iniciado");
      
      this.actividad.tiempoInicio == 0 ? 
        this.tiempoInicio = this.timePipe.transform(Date.now()): //NO hay tiempo inicio
        this.actividad.tiempoInicio; //hay tiempo inicio

      this.actividad.tiempoFinal =!  0 ? 
        this.tiempoFinal = '00:00' : //NO hay tiempo final
        this.actividad.tiempoFinal; //hay tiempo final



      this.actividad.tiempoInicio == 0 ? 
        this.actividad.tiempoInicio = Date.now(): //NO hay tiempo inicio
        this.actividad.tiempoInicio; //hay tiempo inicio

      this.actividad.tiempoFinal =!  0 ? 
        this.actividad.tiempoFinal = 0 : //NO hay tiempo final
        this.actividad.tiempoFinal; //hay tiempo final
      
      
      this.buttonLabel = 'Detener';
  
      this.contador = setInterval( ()=>{ // Reloj
        
        
        segundo +=1;
        if (segundo < 10) {this.tiempoAcumulado.resSeg = "0"+segundo;}
        else{this.tiempoAcumulado.resSeg = segundo;}


          if (segundo == 60) {


            segundo = 0;
            this.tiempoAcumulado.resSeg = "0"+segundo;
            minuto += 1;

            if (minuto < 10) {this.tiempoAcumulado.resMin = "0"+minuto;}
            else{this.tiempoAcumulado.resMin = minuto;}
          

            if (minuto == 60) {
                minuto = 0;
                this.tiempoAcumulado.resMin = "0"+minuto;
                hora += 1;
                if (hora < 10) {this.tiempoAcumulado.resHor = "0"+hora;}
                else{this.tiempoAcumulado.resHor = hora;}
                
              }
          }
      } , 1000 );
  
  
      }else{//Está iniciado
      clearInterval(this.contador); //detiene reloj
      
      this.tiempoFinal = this.timePipe.transform(Date.now())
      
      this.contador = null;
      this.buttonLabel = 'Iniciar';
      }
  }

  agregarCheckList(){
    

    if ( this.nuevo.contenido.trim().length === 0 ) { return; }
    
    this.actividad.lista.push( {...this.nuevo} );
    this.nuevo.contenido = '';


  }

  actualizarActividad(){
    console.log(this.actividad);

    console.log(this.tiempoInicio);
    console.log(this.tiempoFinal);

    this.actualizaActividad_envio.nombre = this.actividad.nombre
    this.actualizaActividad_envio.descripcion = this.actividad.descripcion
    this.actualizaActividad_envio.prioridadAlta = this.actividad.prioridadAlta
    this.actualizaActividad_envio.colaborador = this.actividad.colaborador[0]._id
    this.actualizaActividad_envio.cliente = this.actividad.cliente[0]._id
    this.actualizaActividad_envio.proyecto = this.actividad.proyecto[0]._id
    this.actualizaActividad_envio.autor = this.actividad.autor[0]._id
    this.actualizaActividad_envio.fecha = this.actividad.fecha 
    this.actualizaActividad_envio.lista = this.actividad.lista
    this.actualizaActividad_envio.semana = this.actividad.semana
    this.actualizaActividad_envio.mes = this.actividad.mes
    this.actualizaActividad_envio.anio = this.actividad.anio
    // this.actualizaActividad_envio.tiempoInicio = this.actividad.tiempoInicio
    // this.actualizaActividad_envio.tiempoFinal = this.actividad.tiempoFinal

    console.log('Actividad a editar:', this.actualizaActividad_envio);

    const fechaSimple = this.datePipe.transform(this.actividad.fecha , 'yyyy/MM/dd')

    if (this.tiempoInicio === '00:00' || this.tiempoInicio === '') { //si esta vacio se manda en 0 ✅
      this.actualizaActividad_envio.tiempoInicio = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoInicioTimeStamp = this.horaMinutoToDate(this.tiempoInicio + ':00', fechaSimple)
      this.actualizaActividad_envio.tiempoInicio = tiempoInicioTimeStamp;
    }

    if (this.tiempoFinal === '00:00' || this.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.actualizaActividad_envio.tiempoFinal = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoFinalTimeStamp = this.horaMinutoToDate(this.tiempoFinal + ':00', fechaSimple)
      this.actualizaActividad_envio.tiempoFinal = tiempoFinalTimeStamp;
    }

    this.capturaService.putEditaActvidad(this.actualizaActividad_envio , this.actividad._id)
      .subscribe(resp => {
        ++this.capturaService.reloadSemana
        this.sidenavService.toggle();
        const message = 'La actividad se actualizó correctamente';
        const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
      });
    
  }

  llamarDialog() {
    this.dialog
      .confirmDialog({
        title: 'Eliminar actividad',
        message: '¿Desea eliminar ésta actividad?',
        confirmCaption: 'Eliminar',
        cancelCaption: 'Cancelar',
      })
      .subscribe((confirmed) => {
        if (confirmed) this.capturaService.deleteActividad(this.actividad._id).subscribe(resp => {
          ++this.capturaService.reloadSemana
          this.sidenavService.toggle();
          const message = 'La actividad se eliminó correctamente';
          const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
          setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
        });
      });
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

  horaMinutoToDate(horaMinuto: string, fecha: any) {
    let tiempoArr: any[] = horaMinuto.split(":")
    let fechaArr: any[] = fecha.split("/")

    //                       |   año    |        mes      |    dia      |   hora     |  minuto    |  segundo  | 
    let resultado = new Date(fechaArr[0], fechaArr[1] - 1, fechaArr[2], tiempoArr[0], tiempoArr[1], tiempoArr[2]).getTime()

    return resultado

  }

  

  




}
