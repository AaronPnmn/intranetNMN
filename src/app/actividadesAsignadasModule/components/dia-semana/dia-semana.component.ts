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

  respuestaActividadesTemp : any =
  {
    "data": [
        {
            "_id": "651ef56ceb9fddcdd5b62241",
            "registros": [
                {
                    "_id": "6536b132c3a034fb22df2bd1",
                    "tiempoInicio": 1698075900000,
                    "tiempoFinal": 1698077700000,
                    "fecha": 1698040800134,
                    "semana": 43,
                    "mes": 10,
                    "anio": 2023,
                    "ordenPersonalizado": null,
                    "createdAt": 1697846153573,
                    "autor": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "cliente": [
                        {
                            "_id": "63b76578e7138a3a87046b02",
                            "razon_social": "NUMEN DIGITAL"
                        }
                    ],
                    "proyecto": [
                        {
                            "_id": "63d85deaac3c352e02468a0a",
                            "nombre": "nmn_Actividades"
                        }
                    ],
                    "colaborador": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "nombre": "misma fecha",
                    "descripcion": "",
                    "prioridadAlta": false,
                    "actividad": "651ef56ceb9fddcdd5b62241"
                },
                {
                    "_id": "6536b5f5d6b9554a1fdcd4bf",
                    "tiempoInicio": 1698077700000,
                    "tiempoFinal": 1698097700000,
                    "fecha": 1698040800134,
                    "semana": 43,
                    "mes": 10,
                    "anio": 2023,
                    "ordenPersonalizado": null,
                    "createdAt": 1697846153573,
                    "autor": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "cliente": [
                        {
                            "_id": "63b76578e7138a3a87046b02",
                            "razon_social": "NUMEN DIGITAL"
                        }
                    ],
                    "proyecto": [
                        {
                            "_id": "63d85deaac3c352e02468a0a",
                            "nombre": "nmn_Actividades"
                        }
                    ],
                    "colaborador": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "nombre": "misma fecha",
                    "descripcion": "",
                    "prioridadAlta": false,
                    "actividad": "651ef56ceb9fddcdd5b62241"
                },
                {
                    "_id": "6536b132c3a034fb22df2bd1",
                    "tiempoInicio": 1698077700000,
                    "tiempoFinal": 1698274751000,
                    "fecha": 1698192000000,
                    "semana": 43,
                    "mes": 10,
                    "anio": 2023,
                    "ordenPersonalizado": null,
                    "createdAt": 1697846153573,
                    "autor": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "cliente": [
                        {
                            "_id": "63b76578e7138a3a87046b02",
                            "razon_social": "NUMEN DIGITAL"
                        }
                    ],
                    "proyecto": [
                        {
                            "_id": "63d85deaac3c352e02468a0a",
                            "nombre": "nmn_Actividades"
                        }
                    ],
                    "colaborador": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "nombre": "diferente fecha",
                    "descripcion": "",
                    "prioridadAlta": false,
                    "actividad": "651ef56ceb9fddcdd5b62241"
                },
                {
                    "_id": "6536b132c3a034fb22df2bd1",
                    "tiempoInicio": 1698075900000,
                    "tiempoFinal": 1698077700000,
                    "fecha": 1698192000000,
                    "semana": 43,
                    "mes": 10,
                    "anio": 2023,
                    "ordenPersonalizado": null,
                    "createdAt": 1697846153573,
                    "autor": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "cliente": [
                        {
                            "_id": "63b76578e7138a3a87046b02",
                            "razon_social": "NUMEN DIGITAL"
                        }
                    ],
                    "proyecto": [
                        {
                            "_id": "63d85deaac3c352e02468a0a",
                            "nombre": "nmn_Actividades"
                        }
                    ],
                    "colaborador": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "nombre": "diferente fecha",
                    "descripcion": "",
                    "prioridadAlta": false,
                    "actividad": "651ef56ceb9fddcdd5b62241"
                },
                {
                  "_id": "6536b132c3a034fb22df2bd1",
                  "tiempoInicio": 1698075900000,
                  "tiempoFinal": 1698077700000,
                  "fecha": 1698192000000,
                  "semana": 43,
                  "mes": 10,
                  "anio": 2023,
                  "ordenPersonalizado": null,
                  "createdAt": 1697846153573,
                  "autor": [
                      {
                          "_id": "63a4d7e40a0301ffe0c9090c",
                          "name": "Miguel Angel Santos"
                      }
                  ],
                  "cliente": [
                      {
                          "_id": "63b76578e7138a3a87046b02",
                          "razon_social": "NUMEN DIGITAL"
                      }
                  ],
                  "proyecto": [
                      {
                          "_id": "63d85deaac3c352e02468a0a",
                          "nombre": "nmn_Actividades"
                      }
                  ],
                  "colaborador": [
                      {
                          "_id": "63a4d7e40a0301ffe0c9090c",
                          "name": "Miguel Angel Santos"
                      }
                  ],
                  "nombre": "diferente fecha",
                  "descripcion": "",
                  "prioridadAlta": false,
                  "actividad": "651ef56ceb9fddcdd5b62241"
              }
            ]
        },
        {
            "_id": "6536b53cc3a034fb22df2be7",
            "registros": [
                {
                    "_id": "6536b53cc3a034fb22df2be9",
                    "tiempoInicio": 1698075900000,
                    "tiempoFinal": 1698077700000,
                    "fecha": 1698040800134,
                    "semana": 43,
                    "mes": 10,
                    "anio": 2023,
                    "ordenPersonalizado": null,
                    "createdAt": 1697846153573,
                    "autor": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "cliente": [
                        {
                            "_id": "63b76578e7138a3a87046b02",
                            "razon_social": "NUMEN DIGITAL"
                        }
                    ],
                    "proyecto": [
                        {
                            "_id": "63d85deaac3c352e02468a0a",
                            "nombre": "nmn_Actividades"
                        }
                    ],
                    "colaborador": [
                        {
                            "_id": "63a4d7e40a0301ffe0c9090c",
                            "name": "Miguel Angel Santos"
                        }
                    ],
                    "nombre": "Registro solo",
                    "descripcion": "",
                    "prioridadAlta": false,
                    "actividad": "651ef56ceb9fddcdd5b62241"
                }
            ]
        },
        {
          "_id": "6536b53cc3a034fb22df2be7",
          "registros": [
              {
                  "_id": "6536b53cc3a034fb22df2be9",
                  "tiempoInicio": 0,
                  "tiempoFinal": 0,
                  "fecha": 1698040800134,
                  "semana": 43,
                  "mes": 10,
                  "anio": 2023,
                  "ordenPersonalizado": null,
                  "createdAt": 1697846153573,
                  "autor": [
                      {
                          "_id": "63a4d7e40a0301ffe0c9090c",
                          "name": "Miguel Angel Santos"
                      }
                  ],
                  "cliente": [
                      {
                          "_id": "63b76578e7138a3a87046b02",
                          "razon_social": "NUMEN DIGITAL"
                      }
                  ],
                  "proyecto": [
                      {
                          "_id": "63d85deaac3c352e02468a0a",
                          "nombre": "nmn_Actividades"
                      }
                  ],
                  "colaborador": [
                      {
                          "_id": "63a4d7e40a0301ffe0c9090c",
                          "name": "Miguel Angel Santos"
                      }
                  ],
                  "nombre": "Registro sin tiempo",
                  "descripcion": "",
                  "prioridadAlta": false,
                  "actividad": "651ef56ceb9fddcdd5b62241"
              }
          ]
      }
    ]
}
  @Input() diasEnSemana: number[] = [];

  @Input() diaActual: number = 0;

  @Input() fechaSeleccionada: any;

  @Input() colaboradorSeleccionado: any;

  @Output() propagar = new EventEmitter<string>();

  actividad: any;

  humanDate: any = "";

  anio: any;

  semana: any;

  semanaTime: any[] = [];

  acumuladoSemanal: string = '00:00'


  get vistaDia():any {
    return this.capturaService.vistaDia;
  }



  lunes: registroActividad[] = [];

  lunesTime: any[] = [];

  acumuladoLunes: string = '00:00'

  lunesCurso: boolean = false;


  martes: registroActividad[] = [];

  martesTime: any[] = [];

  acumuladoMartes: string = '00:00'

  martesCurso: boolean = false;


  miercoles: registroActividad[] = [];

  miercolesTime: any[] = [];

  acumuladoMiercoles: string = '00:00'

  miercolesCurso: boolean = false;


  jueves: registroActividad[] = [];

  juevesTime: any[] = [];

  acumuladoJueves: string = '00:00'

  juevesCurso: boolean = false;


  viernes: registroActividad[] = [];

  viernesTime: any[] = [];

  acumuladoViernes: string = '00:00'

  viernesCurso: boolean = false;


  sabado: registroActividad[] = [];

  sabadoTime: any[] = [];

  acumuladoSabado: string = '00:00'

  sabadoCurso: boolean = false;


  domingo: registroActividad[] = [];

  domingoTime: any[] = [];

  acumuladoDomingo: string = '00:00';

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


    // this.respuestaActividadesTemp.data.forEach((element:any, index: any) => {
      arrayActividades.data.forEach((element:any, index: any) => {

      let diaPrimeraActividad: string;
      let registrosTiempo: any = {
        dom: [],
        lun: [],
        mar: [],
        mié: [],
        jue: [],
        vie: [],
        sáb: [],
      };
      let actividadTarjeta: any;

      let longitudArr:number = element.registros.length; //guarda la longitud del array para usarlo posteriormente

      if (longitudArr > 1) { // si hay mas de un registro se segmentan las actividades por dia y se fusionan

        element.registros.forEach((element:any, index:any) => {

          this.actividad = element;

          this.humanDate = new Date((element.fecha)) //transforma el Timestamp a un objeto fecha

          this.actividad.dia = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"}) //saca el dia de la fecha en formato de tres letras (lunes => "lun")

          if (index == 0) { //determina el primer dia de los registros de la actividad
            diaPrimeraActividad = this.actividad.dia;
            actividadTarjeta = this.actividad;
          }


          const registroTiempo = {
            tiempoInicio: this.actividad.tiempoInicio,
            tiempoFinal: this.actividad.tiempoFinal
          }


          switch (this.actividad.dia) { //segmenta registros por dia
            case "dom": //domingo
              registrosTiempo.dom.push(registroTiempo);
              break;

            case "lun": //lunes
              registrosTiempo.lun.push(registroTiempo);
              break;

            case "mar": //martes
              registrosTiempo.mar.push(registroTiempo);
              break;

            case "mié": //miercoles
            registrosTiempo.mié.push(registroTiempo);
              break;

            case "jue": //jueves
            registrosTiempo.jue.push(registroTiempo);
              break;

            case "vie": //viernes
            registrosTiempo.vie.push(registroTiempo);
              break;

            case "sáb": //sabado
            registrosTiempo.sáb.push(registroTiempo);
              break;

            default:
              break;
          }


          if (longitudArr == index +1) { //comprueba que es la ultima vuelta de los registros

            for (const diaSemana in registrosTiempo) { //recorre el objeto de registros de tiempo para evitar que se envien actividades duplicadas
              if (registrosTiempo[diaSemana].length > 0) {
                const registros = registrosTiempo[diaSemana];
                actividadTarjeta = this.actividad;
                actividadTarjeta.dia = diaSemana;
                actividadTarjeta.tarjetaOrigen = actividadTarjeta.dia == diaPrimeraActividad; //agrega el valor "tarjetaOrigen" y se lo asigna true si el dia es el mismo de la actividad origen
                actividadTarjeta.registros = registros;
                delete actividadTarjeta.tiempoInicio;
                delete actividadTarjeta.tiempoFinal;

                this.sortAct( actividadTarjeta ); //manda la actividad a la funcion 'sortAct()' y ésta la asigna en su dia correspondiente


              }
            }

          }


        });
      }else { //no se fusiona la actividad se manda directo
        // console.log('registro solo', element.registros[0]);
        this.actividad = element.registros[0];

        this.humanDate = new Date((element.registros[0].fecha)) //transforma el Timestamp a un objeto fecha
        this.actividad.dia = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"}) //saca el dia de la fecha en formato de tres letras (lunes => "lun")
        this.actividad.tarjetaOrigen = true; //agrega el valor "tarjetaOrigen" y se lo asigna true siempre
        this.actividad.registros = [
          {
            tiempoInicio: this.actividad.tiempoInicio,
            tiempoFinal: this.actividad.tiempoFinal
          }
        ];
        delete this.actividad.tiempoInicio;
        delete this.actividad.tiempoFinal;
        this.sortAct( this.actividad ); //manda la actividad a la funcion 'sortAct()' y ésta la asigna en su dia correspondiente
      }



    });








    // arrayActividades.data.forEach((element: any) => {

    //   this.actividad = element

    //   //console.log('actual' ,element);


    //   this.humanDate = new Date((element.fecha)) //transforma el Timestamp a un objeto fecha
    //   let prueba = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"})

    //   this.actividad.dia = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"}) //saca el dia de la fecha en formato de tres letras (lunes => "lun")

    //   this.sortAct( this.actividad ); //manda la actividad a la funcion 'sortAct()' y ésta la asigna en su dia correspondiente
    //   console.log( 'actividad',this.actividad);

    // });



    // this.domingo = this.sortByTime(this.domingo)
    // this.lunes = this.sortByTime(this.lunes)
    // this.martes = this.sortByTime(this.martes)
    // this.miercoles = this.sortByTime(this.miercoles)
    // this.jueves = this.sortByTime(this.jueves)
    // this.viernes = this.sortByTime(this.viernes)
    // this.sabado = this.sortByTime(this.sabado)






  }

  sortByTime( dayArray: any[] ){
    let arrayOrdenado = dayArray.sort(
      (p1, p2) => (p1.tiempoInicio > p2.tiempoInicio) ? 1 : (p1.tiempoInicio < p2.tiempoInicio) ? -1 : 0);
    return arrayOrdenado
  }




  sortAct(actividad: any){

    // let tiempoAcumulado

    // console.log(actividad.registros.length);
    // console.log(actividad.dia);

    let tiempoTotalTarjeta;

    if (actividad.registros.length > 1) { //si la actividad tiene mas de un registro
      // console.log(actividad.registros);

      let tiempoAcumuladoTarjeta: any = [];

      actividad.registros.forEach((element:any) => { //recorre los registros y saca la suma

        const diferencia = this.difTiempo(element.tiempoInicio,element.tiempoFinal)
        const tiempo = diferencia.resHor + ':' + diferencia.resMin;

        tiempoAcumuladoTarjeta.push(tiempo);

      });

      tiempoTotalTarjeta = this.sumaTiempos(tiempoAcumuladoTarjeta);

    }else{ // si la actividad tiene solo un registro
      const diferencia = this.difTiempo(actividad.registros[0].tiempoInicio, actividad.registros[0].tiempoFinal);
      const registro = diferencia.resHor + ':' + diferencia.resMin;
      tiempoTotalTarjeta = registro;

      // console.log('tiempos uniregistro', tiempoTotalTarjeta);
    }


    switch (actividad.dia) {
      case "dom": //domingo
        this.domingo.push( {...actividad} );
        this.domingoTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.domingoCurso = true;}

        break;

      case "lun": //lunes
        this.lunes.push( {...actividad} );
        this.lunesTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.lunesCurso = true;}
        break;

      case "mar": //martes
        this.martes.push( {...actividad} );
        this.martesTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.martesCurso = true;}

        break;

      case "mié": //miercoles
        this.miercoles.push( {...actividad} );
        this.miercolesTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.miercolesCurso = true;}

        break;
      case "jue": //jueves
        this.jueves.push( {...actividad} );
        this.juevesTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.juevesCurso = true;}

        break;

      case "vie": //viernes
        this.viernes.push( {...actividad} );
        this.viernesTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.viernesCurso = true;}

        break;

      case "sáb": //sabado
        this.sabado.push( {...actividad} );
        this.sabadoTime.push( tiempoTotalTarjeta );
        // if (actividad.tiempoInicio !== 0 && actividad.tiempoFinal === 0) {this.sabadoCurso = true;}

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

  // getAcumuladoDia(arrayDiaTime: any[]):string {

  //   let accHora = 0
  //   let accMin = 0
  //   let totalMin = 0

  //   arrayDiaTime.forEach(element => {
  //     const arr = element.split(':')
  //     const hora = parseInt(arr[0])
  //     const minuto = parseInt(arr[1])

  //     accHora = accHora + hora
  //     accMin = accMin + minuto

  //   });

  //   totalMin = (accHora * 60) + accMin

  //   if (totalMin === 0) {
  //     return '00:00'
  //   }

  //   return `${Math.floor(totalMin / 60)}:${totalMin % 60}`
  // }

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
      return '00:00'
    }

    let horasRaw = Math.floor(totalMin / 60);
    let minutosRaw = totalMin % 60;
    const horas = horasRaw < 10 ? '0' + horasRaw : horasRaw;
    const minutos = minutosRaw < 10 ? '0' + minutosRaw : minutosRaw;

    return `${horas}:${minutos}`
  }

  ngOnInit(): void {

    this.semana = this.datePipe.transform(this.fechaSeleccionada, 'w')

    this.anio = this.datePipe.transform(this.fechaSeleccionada, 'y')

    // this.capturaService.getActividadesSemana(this.colaboradorSeleccionado,this.anio,this.semana)
    //   .subscribe( actividades =>{

            // this.formatActs(actividades)

            this.formatActs(this.respuestaActividadesTemp);

            this.acumuladoDomingo = this.sumaTiempos(this.domingoTime);
            console.log('SUMA TIEMPOO', this.lunesTime);
            
            this.acumuladoLunes = this.sumaTiempos(this.lunesTime);
            this.acumuladoMartes = this.sumaTiempos(this.martesTime);
            this.acumuladoMiercoles = this.sumaTiempos(this.miercolesTime);
            this.acumuladoJueves = this.sumaTiempos(this.juevesTime);
            this.acumuladoViernes = this.sumaTiempos(this.viernesTime);
            this.acumuladoSabado = this.sumaTiempos(this.sabadoTime);


            this.semanaTime.push(this.acumuladoDomingo);
            this.semanaTime.push(this.acumuladoLunes);
            this.semanaTime.push(this.acumuladoMartes);
            this.semanaTime.push(this.acumuladoMiercoles);
            this.semanaTime.push(this.acumuladoJueves);
            this.semanaTime.push(this.acumuladoViernes);
            this.semanaTime.push(this.acumuladoSabado);

            this.acumuladoSemanal = this.sumaTiempos(this.semanaTime)

            // console.log('acumulado', this.acumuladoSemanal);

            this.propagar.emit(this.acumuladoSemanal);
      // });




  }

}
