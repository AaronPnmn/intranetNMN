import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TimeEditPipe } from '../../pipes/time-edit.pipe';
import { SidenavService } from '../../services/sidenav.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-estado-edicion',
  templateUrl: './estado-edicion.component.html',
  styleUrls: ['../../capturaActividad.css']
})
export class EstadoEdicionComponent implements OnInit {

  @Input() actividad: any = {
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
    colaboradorAsignado: [{
      id: '',
      name: ''
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
    idActividad: 0
  }


  editaActividad_envio: any = {

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

  editaActividad() {
    
    

    this.editaActividad_envio.nombre = this.actividad.nombre
    this.editaActividad_envio.descripcion = this.actividad.descripcion
    this.editaActividad_envio.prioridadAlta = this.actividad.prioridadAlta
    this.editaActividad_envio.colaborador = this.actividad.colaborador[0]._id
    this.editaActividad_envio.cliente = this.actividad.cliente[0]._id
    this.editaActividad_envio.proyecto = this.actividad.proyecto[0]._id
    this.editaActividad_envio.autor = this.actividad.autor[0]._id
    this.editaActividad_envio.fecha = this.fecha.getTime() 
    this.editaActividad_envio.lista = this.actividad.lista
    this.editaActividad_envio.semana = parseInt(this.datePipe.transform(this.editaActividad_envio.fecha, 'w')!);
    this.editaActividad_envio.mes = this.fecha.getMonth() + 1
    this.editaActividad_envio.anio = this.fecha.getFullYear()

    const fechaSimple = this.datePipe.transform(this.editaActividad_envio.fecha, 'yyyy/MM/dd')

    if (this.tiempoInicio === '00:00' || this.tiempoInicio === '') { //si esta vacio se manda en 0 ✅
      this.editaActividad_envio.tiempoInicio = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoInicioTimeStamp = this.horaMinutoToDate(this.tiempoInicio + ':00', fechaSimple)
      this.editaActividad_envio.tiempoInicio = tiempoInicioTimeStamp;
    }

    if (this.tiempoFinal === '00:00' || this.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.editaActividad_envio.tiempoFinal = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoFinalTimeStamp = this.horaMinutoToDate(this.tiempoFinal + ':00', fechaSimple)
      this.editaActividad_envio.tiempoFinal = tiempoFinalTimeStamp;
    }
    console.log('Id actividad:', this.actividad._id);
    console.log('Actividad a editar:', this.editaActividad_envio);

    const idActivdad = this.capturaService.idActividad

    this.capturaService.putEditaActvidad(this.editaActividad_envio , idActivdad)
      .subscribe(resp => {
        ++this.capturaService.reloadSemana
        this.sidenavService.toggle();
        const message = 'La actividad se actualizó correctamente';
        const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
      });
  }

  get tiempoAcumulado(): any {
    return this.capturaService.tiempoAcumulado;
  }

  tiempoInicio = this.timePipe.transform(this.capturaService.tiempoInicio)
    
  tiempoFinal = this.timePipe.transform(this.capturaService.tiempoFinal)
  
  fecha:Date = new Date();

  

  clientes: any[] = [];
  proyectos: any[] = [];
  colaboradores: any[] = [];

  selectedDate: any = '';

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  horaInicial: number = 0;
  minutoInicial: number = 0;
  horaFinal: number = 0;
  minutoFinal: number = 0;

    constructor(private capturaService: CapturaActividadService,
      private authService: AuthService,
      private snackBar: MatSnackBar,
      //private fb: FormBuilder,
      private sidenavService:SidenavService,
      private router: Router,
      private datePipe: DatePipe,
      private timePipe: TimeEditPipe,
      private dialog: DialogService,
      ) { }



  ngOnInit(): void {
    this.fecha= new Date(this.actividad.fecha)
    
     console.log('Actividad',this.actividad);
    this.capturaService.getColaboradores()
      .subscribe(colaboradores => {
        this.formatColaboradores(colaboradores)
      });

    this.capturaService.getClientes()
      .subscribe(clientes => {
        this.formatClientes(clientes)
      });

    this.capturaService.getProyectosPorCliente(this.actividad.cliente[0]._id)
      .subscribe(proyectos => {
        this.formatProyectosInit(proyectos)
    });

    this.selectedDate = this.datePipe.transform(new Date(this.actividad.fecha), 'yyyy-MM-dd');
  }

  cambiaCliente(event:any){
    console.log(event.target.value);
    this.capturaService.getProyectosPorCliente(event.target.value)
    .subscribe(proyectos => {
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

  formatProyectos(arrayProyectos: any) {
    this.proyectos = [];
    this.actividad.proyecto[0]._id = ''
    arrayProyectos.data.forEach((element: any) => {
      this.proyectos.push({
        id: element._id,
        nombre: element.nombre.toUpperCase()
      }
      )
    });
  }

  formatProyectosInit(arrayProyectos: any) {
    arrayProyectos.data.forEach((element: any) => {
      this.proyectos.push({
        id: element._id,
        nombre: element.nombre.toUpperCase()
      }
      )
    });
  }

  agregarCheckList() {

    if (this.nuevo.contenido.trim().length === 0) { return; }

    this.actividad.lista.push({ ...this.nuevo });
    this.nuevo.contenido = '';

  }

  cancelarActividad(){

    this.dialog
      .confirmDialog({
        title: 'Cancelar',
        message: '¿Desea cancelar la edición de ésta actividad?',
        confirmCaption: 'SI',
        cancelCaption: 'NO',
      })
      .subscribe((confirmed) => {
        if (confirmed === true) {
          this.sidenavService.toggle();  
        }
        
        
      });
    
  }

  horaMinutoToDate(horaMinuto: string, fecha: any) {
    let tiempoArr: any[] = horaMinuto.split(":")
    let fechaArr: any[] = fecha.split("/")

    //                       |   año    |        mes      |    dia      |   hora     |  minuto    |  segundo  | 
    let resultado = new Date(fechaArr[0], fechaArr[1] - 1, fechaArr[2], tiempoArr[0], tiempoArr[1], tiempoArr[2]).getTime()

    return resultado

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
