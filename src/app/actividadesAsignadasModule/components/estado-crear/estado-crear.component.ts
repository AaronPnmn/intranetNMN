import { Component, Input, OnInit } from '@angular/core';
import { acumuladorTiempo, elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DatePipe, getLocaleFirstDayOfWeek } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { DialogService } from '../../services/dialog.service';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';


@Component({
  selector: 'app-estado-crear',
  templateUrl: './estado-crear.component.html',
  styleUrls: ['../../capturaActividad.css'],
})
export class EstadoCrearComponent implements OnInit {

  colaboradoresAsignados = new FormControl('');

  cliProySeleccionado: any = {};

  stateGroupOptions: any;

  @Input() rol: string = ''

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
  clientes: any[] = [];
  proyectos: any[] = [];
  colaboradores: any[] = [];

  clientesProyecto: any[] = []

  

  

  nuevaLista: elementoLista[] = [];

  tiempoAcumulado: acumuladorTiempo = {
    resHor: '00',
    resMin: '00',
    resSeg: '00'
  }


  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  nuevaActividadFormulario: FormGroup = this.fb.group({

    //nombre: ['', [Validators.required]],
    descripcion: [''],
    prioridadAlta: [false, [Validators.required]],
    //autor: this.autor, //se recupera el nombre del usuario ✅
    colaboradorAsignado: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    proyecto: ['', [Validators.required]],
    //semana: [''],//semana
    //mes: [''],//mes
    //anio: [''],//anio
    tiempoInicio: [''],
    tiempoFinal: [''],
    fecha: ['', [Validators.required]],

  });

  nuevaActividad_envio: any = {

    nombre: '', //desde formulario ✅ 
    descripcion: '',  //desde formulario ✅ puede ir vacio
    prioridadAlta: false, //desde formulario ✅
    autor: '', //se recupera el nombre del usuario ✅
    colaborador: '', //se recupera el nombre del colaborador ❌ || se puede cambiar en formulario SI ES ADMINISTRADOR ✅
    cliente: '',  //desde formulario ✅
    proyecto: '', //desde formulario ✅
    semana: 0,//semana ✅
    mes: 0,//mes ✅
    anio: 0,//anio ✅
    tiempoInicio: '', //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    tiempoFinal: '',  //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    fecha: 0,  //se inicia con la fecha del dia seleccionado ✅ || se puede cambiar en formulario ✅
    lista: [] //se recupera la checkList del componente ✅

  };


  constructor(private capturaService: CapturaActividadService,
    private sidenavService:SidenavService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: DialogService,
    private pipe: DatePipe) { 
        
    }

  ngOnInit(): void {
        
    this.actividad.fecha = new Date(this.actividad.fecha)
    
    this.initColaboradorAsignado(this.capturaService.idColaboradoSeleccionado);
    
    this.capturaService.getClientesProyecto()
    .subscribe(clientesProy => {
      this.formatClientesProyecto(clientesProy)
      
      
    }
    );

    this.capturaService.getColaboradores()
      .subscribe(colaboradores => {
        this.formatColaboradores(colaboradores)
      }
      );
    this.capturaService.getClientes()
      .subscribe(clientes => {
        this.formatClientes(clientes)
      }
      );


    // this.nuevaActividadFormulario.value.nombre = this.actividad.fecha
    // console.log("oninit estadocrear", this.nuevaActividadFormulario.value.nombre);

    let fecha = new Date(this.actividad.fecha)
    this.nuevaActividadFormulario.patchValue({
      fecha: fecha
    })
  }


  horaMinutoToDate(horaMinuto: string, fecha: any) {
    let tiempoArr: any[] = horaMinuto.split(":")
    let fechaArr: any[] = fecha.split("/")

    //                       |   año    |        mes      |    dia      |   hora     |  minuto    |  segundo  | 
    let resultado = new Date(fechaArr[0], fechaArr[1] - 1, fechaArr[2], tiempoArr[0], tiempoArr[1], tiempoArr[2]).getTime()

    return resultado

  }

  initColaboradorAsignado(colaboradorAsignado:string) {
    const anotherList: any = [
        `${colaboradorAsignado}`
    ]

    this.colaboradoresAsignados.setValue(anotherList)
  }


  crearNuevaActividad() {
    
    console.log(this.colaboradoresAsignados);
    

    this.nuevaActividad_envio.nombre //obligatorio
    this.nuevaActividad_envio.descripcion
    this.nuevaActividad_envio.fecha = this.actividad.fecha.getTime()
    this.nuevaActividad_envio.prioridadAlta
    this.nuevaActividad_envio.autor = this.authService.usuario.uid;
    this.nuevaActividad_envio.colaborador
    this.nuevaActividad_envio.cliente //obligatorio
    this.nuevaActividad_envio.proyecto //obligatorio
    this.nuevaActividad_envio.semana = parseInt(this.pipe.transform(this.nuevaActividad_envio.fecha, 'w')!)
    this.nuevaActividad_envio.mes = this.actividad.fecha.getMonth() + 1;
    this.nuevaActividad_envio.anio = this.actividad.fecha.getFullYear();
    this.nuevaActividad_envio.lista = this.actividad.lista
    
    const fechaSimple = this.pipe.transform(this.nuevaActividad_envio.fecha, 'yyyy/MM/dd')

    if (this.nuevaActividad_envio.tiempoInicio === '') { //si esta vacio se manda en 0 ✅      
      this.nuevaActividad_envio.tiempoInicio = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoInicioTimeStamp = this.horaMinutoToDate(this.nuevaActividad_envio.tiempoInicio + ':00', fechaSimple)
      this.nuevaActividad_envio.tiempoInicio = tiempoInicioTimeStamp;
    }

    if (this.nuevaActividad_envio.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.nuevaActividad_envio.tiempoFinal = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoFinalTimeStamp = this.horaMinutoToDate(this.nuevaActividad_envio.tiempoFinal + ':00', fechaSimple)
      this.nuevaActividad_envio.tiempoFinal = tiempoFinalTimeStamp;
    }


    console.log('Nueva actividad a enviar:', this.nuevaActividad_envio);
    
    let colArr:any = [];

    colArr = this.colaboradoresAsignados.value;
    
    //v1 -------

    if ( colArr.length > 1) { //multi colaboradores
      console.log('mas de uno');
      for (let i = 0; i < colArr.length; i++) {
        const colaboradorID = colArr[i];

        this.nuevaActividad_envio.colaborador = colaboradorID;

        this.capturaService.postNuevaActvidad(this.nuevaActividad_envio)
        .subscribe(resp => {
          if (i == colArr.length -1) {
            ++this.capturaService.reloadSemana
            this.sidenavService.toggle();
            const message = 'Las actividades se crearon correctamente';
            const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
            setTimeout(snackBarRef.dismiss.bind(snackBarRef), 5000);
          }
        });
      }
      

    }else{ //un colaborador
      
      this.nuevaActividad_envio.colaborador = colArr[0];

      this.capturaService.postNuevaActvidad(this.nuevaActividad_envio)
      .subscribe(resp => {
        ++this.capturaService.reloadSemana
        this.sidenavService.toggle();
        const message = 'La actividad se creo correctamente';
        const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
      });
    }

    //v1 -------
    
    // this.capturaService.postNuevaActvidad(this.nuevaActividad_envio)
    //   .subscribe(resp => {
    //     ++this.capturaService.reloadSemana
    //     this.sidenavService.toggle();
    //     const message = 'La actividad se creo correctamente';
    //     const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
    //     setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
    //   });
  }

  agregarCheckList() {

    if (this.nuevo.contenido.trim().length === 0) { return; }

    this.actividad.lista.push({ ...this.nuevo });
    this.nuevo.contenido = '';

  }

  cambiaClienteProyecto(event:any){
    
    let cliProyArray = event.target.value.split(",")
    this.cliProySeleccionado = {
      nombreCliente: cliProyArray[0],
      idProyecto: cliProyArray[1],
      idCliente: cliProyArray[2]
    }  

    this.nuevaActividad_envio.cliente = this.cliProySeleccionado.idCliente
    this.nuevaActividad_envio.proyecto  = this.cliProySeleccionado.idProyecto

    console.log(this.cliProySeleccionado);
  }

  cambiaCliente(event:any){
    console.log(event.target.value);
    this.capturaService.getProyectosPorCliente(event.target.value)
    .subscribe(proyectos => {
      console.log("proyectos",proyectos);
      
      this.formatProyectos(proyectos)
    }
    );
  }

  formatClientes(arrayClientes: any) {
    arrayClientes.data.forEach((element: any) => {
      this.clientes.push({
        id: element._id,
        razon_social: element.razon_social.toUpperCase()
      }
      )
    });
  }

  formatColaboradores(arrayColaboradores: any) {
    arrayColaboradores.data.forEach((element: any) => {
      this.colaboradores.push({
        id: element._id,
        nombre: element.name.toUpperCase()
      }
      )
    });

  }

  formatClientesProyecto(arrayClientesProyecto: any) {
    
    arrayClientesProyecto.clientes.forEach((element: any) => {
    
      this.clientesProyecto.push({
        id: element._id,
        razon_social: element.razon_social,
        proyectos: element.proyectos
      })
    });

    console.log(this.clientesProyecto);

  }

  formatProyectos(arrayProyectos: any) {
    this.proyectos = [];
    this.nuevaActividad_envio.proyecto = ''
    arrayProyectos.data.forEach((element: any) => {
      this.proyectos.push({
        id: element._id,
        nombre: element.nombre.toUpperCase()
      }
      )
    });
    console.log(this.proyectos)
  }

  cancelarActividad(){

    this.dialog
      .confirmDialog({
        title: 'Cancelar',
        message: '¿Desea cancelar la creación de ésta actividad?',
        confirmCaption: 'SI',
        cancelCaption: 'NO',
      })
      .subscribe((confirmed) => {
        if (confirmed === true) {
          this.sidenavService.toggle();  
        }
        
        
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

  restaTiempos(){
    
    if (this.nuevaActividad_envio.tiempoInicio === '00:00' || this.nuevaActividad_envio.tiempoFinal === '00:00') { 
      this.tiempoAcumulado = {
        resHor: '00',
        resMin: '00',
        resSeg: '00'
      }  
      return
    }


    const tiempoInicioTimeStamp = this.horaMinutoToDate(this.nuevaActividad_envio.tiempoInicio + ':00', '2023/01/01')
    const tiempoFinalTimeStamp = this.horaMinutoToDate(this.nuevaActividad_envio.tiempoFinal + ':00', '2023/01/01')


    this.tiempoAcumulado = this.difTiempo(tiempoInicioTimeStamp, tiempoFinalTimeStamp) 
  }

  checkElemento( index:number ): void{

    this.actividad.lista[index].estatus = !this.actividad.lista[index].estatus

    

  }

  eliminarElemento( index:number ): void{
    console.log("elemento a eliminar:", this.actividad.lista[index].contenido);
    this.actividad.lista[index].estatus
    if (index > -1) { 
    this.actividad.lista.splice(index, 1); 
    }
  }
}
