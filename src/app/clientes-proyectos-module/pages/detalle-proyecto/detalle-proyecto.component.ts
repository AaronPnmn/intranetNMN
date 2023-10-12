import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { ReporteClientesProyService } from '../../services/reporte-clientes-proy.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CapturaActividadService } from 'src/app/actividadesAsignadasModule/services/capturaActividad.service';
import { DialogService } from '../../services/dialog.service';
import {
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { TimeEditPipe } from '../../pipes/time-edit.pipe';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetalleProyectoComponent implements OnInit {

  @Output() estatus = new EventEmitter<string>();

  @Input() detalleProyecto: any;

  fechaInicio: any; //nuevo

  fechaFin: any; //nuevo

  listadoProyectos: any = [] //nuevo

  proyectoActual: any = {
    nombre: '',
    tiempo: '',
    id: ''
  }

  arrHorasFacturables: any[] = []
  horasFacturables: string = ''

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





  actividades: any;

  ACTIVIDADES_DATA: any[] = [];

  timeActGraph: any = [];

  reloadedChart: boolean = true;

  horasProyectos: any = [];

  clienteActual: any = {

    _id: '',
    razon_social: '',
    rfc: '',
    calle: '',
    no_int: '',
    no_ext: '',
    localidad: '',
    municipio: '',
    estado: '',
    cp: '',
    telefono: '',
    email: '',
    condicion: '',
    regimen: '',
    uso_cfdi: '',
    forma_pago: '',
    metodo_pago: '',
    deleted: '',
    createdAt: '',
    updatedAt: ''

  };

  dataSource: any = this.ACTIVIDADES_DATA;
  //dataSource: any = [];
  //columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay = ['Nombre', 'Tiempo', 'Fecha', 'Facturable'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;

  constructor(private reportesService: ReporteClientesProyService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private capturaService: CapturaActividadService,
    private dialog: DialogService,
    private _bottomSheet: MatBottomSheet) {


  }

  ngOnInit(): void {

    this.fechaInicio = this.detalleProyecto.tiempoInicio

    this.fechaFin = this.detalleProyecto.tiempoFin

    this.listaProyectos();

    this.abreProyecto(this.detalleProyecto.idProyecto, this.detalleProyecto.nombreProyecto)







    // this.formatHorasProyecto(this.detalleProyecto.proyectos)
    // this.abrirProyecto( this.detalleProyecto.idProyecto, this.detalleProyecto.nombreProyecto, this.detalleProyecto.horas )


    // this.reportesService.getCliente()
    // .subscribe( (clientes:any) =>{

    //   this.formatCliente(clientes)

    // })

  }

  editaActividad(f: NgForm) {
    console.log(f.value);


    this.editaActividad_envio.nombre = f.value.nombre
    // this.editaActividad_envio.descripcion = this.actividad.descripcion
    // this.editaActividad_envio.prioridadAlta = this.actividad.prioridadAlta
    // this.editaActividad_envio.colaborador = this.actividad.colaborador[0]._id
    // this.editaActividad_envio.cliente = this.actividad.cliente[0]._id
    // this.editaActividad_envio.proyecto = this.actividad.proyecto[0]._id
    // this.editaActividad_envio.autor = this.actividad.autor[0]._id
    // this.editaActividad_envio.fecha = this.fecha.getTime()
    // this.editaActividad_envio.lista = this.actividad.lista
    // this.editaActividad_envio.semana = parseInt(this.datePipe.transform(this.editaActividad_envio.fecha, 'w')!);
    // this.editaActividad_envio.mes = this.fecha.getMonth() + 1
    // this.editaActividad_envio.anio = this.fecha.getFullYear()



  }

  listaProyectos() {

    this.listadoProyectos = []
    this.reportesService.getActividades_byTime(this.fechaInicio.getTime(), this.fechaFin.getTime())
      .subscribe((proyectos: any) => {
        console.log("proyectoos", proyectos);

        proyectos.newData.forEach((element: any) => { //recorre la lista de los proyectos por cliente
          if (element._id == this.detalleProyecto.idCliente) { //encuentra la coincidencia del cliente
            element.proyectos.forEach((proyectoElmnt: any) => { //recorre la lista de los proyectos de la coincidencia

              const proyecto = { //Asigna y agrega un elemento en el listado de proyectos
                nombre: proyectoElmnt.nombre,
                _id: proyectoElmnt._id,
                tiempo: this.horasProyecto(proyectoElmnt.horas.resHor, proyectoElmnt.horas.resMin)
              }

              this.listadoProyectos.push(proyecto)

            });
          }
        });

      })
  }

  abreProyecto(idProyecto: string, nombreProyecto: string) {

    this.reportesService.getActividadesProyecto_byTime(idProyecto, this.fechaInicio.getTime(), this.fechaFin.getTime())
      .subscribe((actividades: any) => {

        this.formatActividades(actividades) // agrega las actividades a la tabla

        let arrayTime: any = []
        let arrayTimeFact: any = []

        actividades.data.forEach((element: any) => {
          let tiempoActividad = `${this.difTiempo(element.tiempoInicio, element.tiempoFinal).resHor}:${this.difTiempo(element.tiempoInicio, element.tiempoFinal).resMin}`
          
          arrayTime.push(tiempoActividad)

          if (element.facturable) {
            arrayTimeFact.push(tiempoActividad)
          }
        });

        this.proyectoActual.nombre = nombreProyecto;
        this.proyectoActual.tiempo = this.sumaTiempos(arrayTime);
        this.horasFacturables = this.sumaTiempos(arrayTimeFact);
        this.proyectoActual.id = idProyecto;

        console.log("Horas Facturables INICIO", this.horasFacturables);
        

      });


  }





  horasProyecto(resHor: number, resMin: number): string {
    let totalMin = (resHor * 60) + resMin;
    let horasRaw = Math.floor(totalMin / 60);
    let minutosRaw = totalMin % 60;
    const horas = horasRaw < 10 ? '0' + horasRaw : horasRaw;
    const minutos = minutosRaw < 10 ? '0' + minutosRaw : minutosRaw;

    return `${horas}:${minutos}`
  }




  llamarDialog(idActividad: string) {
    this.dialog
      .confirmDialog({
        title: 'Eliminar actividad',
        message: '¿Desea eliminar ésta actividad?',
        confirmCaption: 'Eliminar',
        cancelCaption: 'Cancelar',
      })
      .subscribe((confirmed) => {
        if (confirmed) this.capturaService.deleteActividad(idActividad).subscribe(resp => {
          const message = 'La actividad se eliminó correctamente';
          const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
          setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
        });
      });
  }

  regresarCliente(estatus: string) {
    this.estatus.emit(estatus);
  }

  formatCliente(arrayClientes: any) {
    arrayClientes.data.forEach((element: any) => {

      if (element._id == this.detalleProyecto.idCliente) {

        this.clienteActual = element

      }
    });
  }

  filtrarTiempo() {

    this.listaProyectos();

    this.abreProyecto(this.detalleProyecto.idProyecto, this.detalleProyecto.nombreProyecto)

    // this.reportesService.getActividadesProyecto_byTime(this.detalleProyecto.idProyecto, this.detalleProyecto.fechaInicio.getTime(), this.detalleProyecto.fechaFin.getTime())
    // .subscribe( (actividades:any) =>{


    //   this.formatActividades(actividades)

    //   let arrayTime: any = []

    //   actividades.data.forEach((element:any) => {
    //     let tiempoActividad = `${this.difTiempo(element.tiempoInicio,element.tiempoFinal).resHor}:${this.difTiempo(element.tiempoInicio,element.tiempoFinal).resMin}`

    //     arrayTime.push(tiempoActividad)

    //   });

    //   this.detalleProyecto.horas = this.sumaTiempos(arrayTime)

    //   this.reportesService.getActividades_byTime(this.detalleProyecto.fechaInicio.getTime(), this.detalleProyecto.fechaFin.getTime())
    //   .subscribe( (clientes:any) =>{

    //     clientes.newData.forEach((element:any) => {

    //       if (element._id == this.clienteActual._id) {

    //         this.formatHorasProyecto(element.proyectos)

    //       }

    //     });
    //   });


    // })

  }

  abrirProyecto(idProyecto: string, nombreProyecto: string, horas: any) {

    this.detalleProyecto.nombreProyecto = nombreProyecto
    this.detalleProyecto._id = idProyecto
    this.detalleProyecto.horas = horas

    //let minutosTotales = (horas.resHor * 60) + horas.resMin;

    //this.detalleProyecto.horas = `${Math.floor(minutosTotales / 60)} horas ${minutosTotales % 60} min`;

    this.reportesService.getActividadesProyecto_byTime(idProyecto, this.detalleProyecto.fechaInicio.getTime(), this.detalleProyecto.fechaFin.getTime())
      .subscribe(actividades => {


        this.formatActividades(actividades)


      })

  }

  formatHorasProyecto(proyectos: any) {

    this.horasProyectos = [];

    proyectos.forEach((element: any) => {

      const totalMin = (element.horas.resHor * 60) + element.horas.resMin
      const horasRaw = Math.floor(totalMin / 60);
      const minutosRaw = totalMin % 60;
      const horas = horasRaw < 10 ? '0' + horasRaw : horasRaw;
      const minutos = minutosRaw < 10 ? '0' + minutosRaw : minutosRaw;

      const residuoHoras = parseFloat((horasRaw + (minutosRaw % 60) / 60).toFixed(1))

      const horaObj = {
        hrsStr: `${horas}:${minutos}`,
        hrsNmr: residuoHoras
      }

      this.horasProyectos.push(horaObj);

    });

    console.log(this.horasProyectos);


  }

  formatActividades(actividades: any) {

    this.ACTIVIDADES_DATA = []

    this.actividades = actividades

    this.actividades.data.forEach((element: any) => {
      let difTiempo = this.difTiempo(element.tiempoInicio, element.tiempoFinal)
      let tiempo = `${difTiempo.resHor}:${difTiempo.resMin}`;
      let fecha = this.datePipe.transform(element.fecha, 'dd-MM-yyyy');

      let actividadPreview = {
        Nombre: element.nombre,
        Tiempo: tiempo,
        Fecha: fecha,
        id: element._id,
        actividadRaw: element
      }

      this.ACTIVIDADES_DATA.push({ ...actividadPreview });
      this.dataSource = new MatTableDataSource(this.ACTIVIDADES_DATA);

    });

  }

  difTiempo(inicio: number, final: number) {
    let horaInicio: any = new Date(inicio)
    let h1 = horaInicio.getHours();
    let m1 = horaInicio.getMinutes();
    let s1 = horaInicio.getSeconds();

    let horaFinal: any = new Date(final)
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

    return tiempo
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

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
  }


  reloadChart() {
    this.reloadedChart = false;

    setTimeout(() => {
      this.reloadedChart = true;
    }, 500);
  }

  openBottomSheet(actividad: any): void {
    this._bottomSheet.open(EditarActividadForm, {
      data: actividad
    });
  }
  changeChkState(event: MatCheckboxChange, actividad: any): void {

    this.editaActividad_envio.nombre = actividad.nombre
    this.editaActividad_envio.descripcion = actividad.descripcion
    this.editaActividad_envio.prioridadAlta = actividad.prioridadAlta
    this.editaActividad_envio.colaborador = actividad.colaborador[0]._id
    this.editaActividad_envio.cliente = actividad.cliente[0]._id
    this.editaActividad_envio.proyecto = actividad.proyecto[0]._id
    this.editaActividad_envio.autor = actividad.autor[0]._id
    this.editaActividad_envio.fecha = actividad.fecha
    this.editaActividad_envio.lista = actividad.lista
    this.editaActividad_envio.semana = actividad.semana
    this.editaActividad_envio.mes = actividad.mes
    this.editaActividad_envio.anio = actividad.anio
    this.editaActividad_envio.facturable = event.checked
    this.editaActividad_envio.tiempoInicio = actividad.tiempoInicio
    this.editaActividad_envio.tiempoFinal = actividad.tiempoFinal

    // console.log('Id actividad:', actividad._id);
    // console.log('Actividad a editar:', this.editaActividad_envio);

    //this.abreProyecto(this.proyectoActual.id, this.proyectoActual.nombre)


    // this.reportesService.getActividadesProyecto_byTime(this.proyectoActual.id, this.fechaInicio.getTime(), this.fechaFin.getTime())
    //   .subscribe((actividades: any) => {

        let arrayTimeFact: any = []

        this.actividades.data.forEach((element: any) => {
          let tiempoActividad = `${this.difTiempo(element.tiempoInicio, element.tiempoFinal).resHor}:${this.difTiempo(element.tiempoInicio, element.tiempoFinal).resMin}`
          
          if (element.facturable) {
            arrayTimeFact.push(tiempoActividad)
          }
        });
        this.horasFacturables = this.sumaTiempos(arrayTimeFact);

        console.log("Horas Facturables CHECK CHANGE", this.horasFacturables);


      //});

    console.log(this.actividades);
    




    const idActivdad = actividad._id

    this.capturaService.putEditaActvidad(this.editaActividad_envio, idActivdad)
      .subscribe(resp => {
        // const message = 'La actividad se actualizó correctamente';
        // const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        // setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
      });
  }
}

@Component({
  selector: 'editar-actividad-form',
  templateUrl: 'editar-actividad.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class EditarActividadForm implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef,
    private datePipe: DatePipe,
    private capturaService: CapturaActividadService,
    private snackBar: MatSnackBar,
    private timePipe: TimeEditPipe) { }


  ngOnInit(): void {
    this.capturaService.getClientesProyecto()
      .subscribe(clientesProy => {
        this.formatClientesProyecto(clientesProy)
      });
    this.proyectoSeleccionado = [this.data.cliente[0].razon_social, this.data.proyecto[0]._id, this.data.cliente[0]._id]
  }

  //actividad = this.data

  cliProySeleccionado: any = {};

  clientesProyecto: any[] = []

  proyectoSeleccionado: any[] = [];

  actividad: any = {
    nombre: this.data.nombre,
    cliente: [{
      id: this.data.cliente[0]._id,
      razon_social: this.data.cliente[0].razon_social
    }],
    proyecto: [{
      id: this.data.proyecto[0]._id,
      nombre: this.data.proyecto[0]._id
    }],
    fecha: new Date(this.data.fecha),
    tiempoInicioTs: this.data.tiempoInicio,
    tiempoInicio: this.timePipe.transform(this.data.tiempoInicio),
    tiempoFinalTs: this.data.tiempoFinal,
    tiempoFinal: this.timePipe.transform(this.data.tiempoFinal),
    tiempoAcumulado: this.difTiempo(this.data.tiempoInicio, this.data.tiempoFinal)
  }

  // actividad: any = { };

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

  horaMinutoToDate(horaMinuto: string, fecha: any) {
    let tiempoArr: any[] = horaMinuto.split(":")
    let fechaArr: any[] = fecha.split("/")

    //                       |   año    |        mes      |    dia      |   hora     |  minuto    |  segundo  |
    let resultado = new Date(fechaArr[0], fechaArr[1] - 1, fechaArr[2], tiempoArr[0], tiempoArr[1], tiempoArr[2]).getTime()

    return resultado

  }

  editaActividad() {
    console.log(this.proyectoSeleccionado);

    this.editaActividad_envio.nombre = this.actividad.nombre
    this.editaActividad_envio.descripcion = this.data.descripcion
    this.editaActividad_envio.facturable = this.data.facturable
    this.editaActividad_envio.prioridadAlta = this.data.prioridadAlta
    this.editaActividad_envio.colaborador = this.data.colaborador[0]._id
    this.editaActividad_envio.cliente = this.proyectoSeleccionado[2]
    this.editaActividad_envio.proyecto = this.proyectoSeleccionado[1]
    this.editaActividad_envio.autor = this.data.autor[0]._id
    this.editaActividad_envio.fecha = this.actividad.fecha.getTime()
    this.editaActividad_envio.lista = this.data.lista
    this.editaActividad_envio.semana = parseInt(this.datePipe.transform(this.editaActividad_envio.fecha, 'w')!);
    this.editaActividad_envio.mes = this.actividad.fecha.getMonth() + 1
    this.editaActividad_envio.anio = this.actividad.fecha.getFullYear()
    this.editaActividad_envio.anio = this.actividad.fecha.getFullYear()
    const fechaSimple = this.datePipe.transform(this.editaActividad_envio.fecha, 'yyyy/MM/dd')

    if (this.actividad.tiempoInicio === '00:00' || this.actividad.tiempoInicio === '') { //si esta vacio se manda en 0 ✅
      this.editaActividad_envio.tiempoInicio = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoInicioTimeStamp = this.horaMinutoToDate(this.actividad.tiempoInicio + ':00', fechaSimple)
      this.editaActividad_envio.tiempoInicio = tiempoInicioTimeStamp;
    }

    if (this.actividad.tiempoFinal === '00:00' || this.actividad.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.editaActividad_envio.tiempoFinal = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoFinalTimeStamp = this.horaMinutoToDate(this.actividad.tiempoFinal + ':00', fechaSimple)
      this.editaActividad_envio.tiempoFinal = tiempoFinalTimeStamp;
    }
    console.log('Id actividad:', this.data._id);
    console.log('Actividad a editar:', this.editaActividad_envio);

    const idActivdad = this.data._id

    this.capturaService.putEditaActvidad(this.editaActividad_envio, idActivdad)
      .subscribe(resp => {
        const message = 'La actividad se actualizó correctamente';
        const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
        this._bottomSheetRef.dismiss();
      });
  }

  restaTiempos() {

    if (this.actividad.tiempoInicio === '00:00' || this.actividad.tiempoFinal === '00:00') {
      this.actividad.tiempoAcumulado = {
        resHor: '00',
        resMin: '00',
        resSeg: '00'
      }
      return
    }


    const tiempoInicioTimeStamp = this.horaMinutoToDate(this.actividad.tiempoInicio + ':00', '2023/01/01')
    const tiempoFinalTimeStamp = this.horaMinutoToDate(this.actividad.tiempoFinal + ':00', '2023/01/01')


    this.actividad.tiempoAcumulado = this.difTiempo(tiempoInicioTimeStamp, tiempoFinalTimeStamp)
  }

  difTiempo(inicio: number, final: number) {
    let horaInicio: any = new Date(inicio)
    let h1 = horaInicio.getHours();
    let m1 = horaInicio.getMinutes();
    let s1 = horaInicio.getSeconds();

    let horaFinal: any = new Date(final)
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

    return tiempo
  }

  cambiaClienteProyecto() {


    this.proyectoSeleccionado = this.proyectoSeleccionado.toString().split(",")
    // this.cliProySeleccionado = {
    //   nombreCliente: cliProyArray[0],
    //   idProyecto: cliProyArray[1],
    //   idCliente: cliProyArray[2]
    // }

    // this.proyectoSeleccionado.push(this.cliProySeleccionado.idCliente)
    // this.proyectoSeleccionado.push(this.cliProySeleccionado.idProyecto)
    // this.proyectoSeleccionado.push(this.cliProySeleccionado.nombreCliente)
    console.log(this.proyectoSeleccionado);
    //console.log(this.cliProySeleccionado);
  }


  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss(); cierra el bottom sheet
  //   event.preventDefault();
  // }
}