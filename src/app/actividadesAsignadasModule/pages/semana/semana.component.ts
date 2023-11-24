import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CapturaActividadService } from '../../services/capturaActividad.service';

@Component({
  selector: 'app-semana',
  templateUrl: './semana.component.html',
  styleUrls: ['./semana.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SemanaComponent implements OnInit {

  //pruebas
  usuarioIndx:any = 0;
  idUserSelected:any;
  //pruebas

  @Input() rol:string ='';

  fechaActual: any;

  fechaAlterada: boolean = false;

  fechaSeleccionada: any;

  diasEnSemana: number[] = []

  diaActual: number = 0;

  id_colaboradorSeleccionado:any;

  info_colaboradorSeleccionado:any;

  selected: any;

  refresh: boolean = false;

  acumuladoSemanal: string = '';


  public _colaboradores: any[] = [
    {
        id: '64f0d11ec659a0b9c91e1b8d',
        nombre: 'numen'
    } //se asignan valores por defecto para evitar errores
  ];

  get reloadSemana():number{
    return this.capturaService.reloadSemana
  }


  diasSemana(diaActual: any) {
    let semana= new Array();
    let dia = new Date(diaActual);
  
    dia.setDate((dia.getDate() - dia.getDay()));
    for (let i = 0; i < 7; i++) {
      semana.push(
            new Date(dia).setHours(0,0,0)
        ); 
        dia.setDate(dia.getDate() +1);
    }
    return semana; 
  }

  sumarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  restarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }

  avanzarSemana(){
    this.fechaSeleccionada = new Date(this.sumarDias(this.fechaSeleccionada, 7))
    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )
    this.fechaAlterada = true;
    this.diaActual = 66;
    this.refreshSemana()
  }

  retrocederSemana(){
    this.fechaSeleccionada = new Date(this.restarDias(this.fechaSeleccionada, 7))
    this.fechaAlterada = true;
    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )
    this.diaActual = 66;
    this.refreshSemana()
  }

  regresarSemanaActual(){
    
    this.fechaActual = new Date();
    this.fechaSeleccionada = this.fechaActual;
    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada );
    this.diaActual = new Date().getDay();
    this.fechaAlterada = false;
    this.refreshSemana()
  }

  cambiarColaborador(){
    
   console.log("cambia colaborador");
   this.idUserSelected = this._colaboradores[this.usuarioIndx].id;
   
   this.capturaService.modificarColaboradoSeleccionado(this.idUserSelected)
    this.refreshSemana()
  }

  formatColaboradores(arrayColaboradores: any) {

    this._colaboradores = [];
    arrayColaboradores.data.forEach((element: any) => {
      this._colaboradores.push({
        id: element._id,
        nombre: element.name.toUpperCase()
      }
      )
    });

    this.colaboradorDefault()
    
  }

  refreshSemana(){
    ++this.capturaService.reloadSemana
  }

  colaboradorDefault(){
    for (let i = 0; i < this._colaboradores.length; i++) {
      const element = this._colaboradores[i];
        if (element.id == this.authService.usuario.uid) {
          //console.log(i);
          this.usuarioIndx = i;
          this.idUserSelected = this.authService.usuario.uid;
        }
    }
  }

  constructor(private capturaService: CapturaActividadService,
              private authService: AuthService) { }

  ngOnInit(): void {

    // console.log("appSemana onInit");
    

    //this.id_colaboradorSeleccionado = this.authService.usuario.uid;


    
    

    this.info_colaboradorSeleccionado = {
      id: this.authService.usuario.uid,
      nombre : this.authService.usuario.name
    };

    // this.info_colaboradorSeleccionado = {
    //   nombre: this.authService.usuario.name ,
    //   imagen: this.authService.usuario.avatar ,
    //   id: this.authService.usuario.uid
    // }

    this.capturaService.getColaboradores()
    .subscribe(colaboradores => {
      this.formatColaboradores(colaboradores)
    });

    this.fechaActual = new Date();

    this.diaActual = new Date().getDay();

    this.fechaSeleccionada = this.fechaActual;

    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )

    this.capturaService.modificarColaboradoSeleccionado(this.authService.usuario.uid);

    this.idUserSelected =  this.authService.usuario.uid;
  }



  procesaPropagar(mensaje:any) {
    this.acumuladoSemanal = mensaje
  }
}
