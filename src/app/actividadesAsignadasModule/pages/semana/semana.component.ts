import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CapturaActividadService } from '../../services/capturaActividad.service';

@Component({
  selector: 'app-semana',
  templateUrl: './semana.component.html',
  styleUrls: ['./semana.component.css']
})
export class SemanaComponent implements OnInit {

  
  @Input() rol:string ='';

  fechaActual: any;

  fechaAlterada: boolean = false;

  fechaSeleccionada: any;

  diasEnSemana: number[] = []

  diaActual: number = 0;

  id_colaboradorSeleccionado:any;

  selected: any;

  refresh: boolean = false;

  acumuladoSemanal: string = '';


  public _colaboradores: any[] = [];

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
   this.capturaService.modificarColaboradoSeleccionado(this.id_colaboradorSeleccionado)
    this.refreshSemana()
  }

  formatColaboradores(arrayColaboradores: any) {
    arrayColaboradores.data.forEach((element: any) => {
      this._colaboradores.push({
        id: element._id,
        nombre: element.name.toUpperCase()
      }
      )
    });
  }

  refreshSemana(){
    ++this.capturaService.reloadSemana
  }

  constructor(private capturaService: CapturaActividadService,
              private authService: AuthService) { }

  ngOnInit(): void {


    console.log("appSemana onInit");
    

    this.id_colaboradorSeleccionado = this.authService.usuario.uid

    this.capturaService.modificarColaboradoSeleccionado(this.id_colaboradorSeleccionado)

    this.capturaService.getColaboradores()
    .subscribe(colaboradores => {
      this.formatColaboradores(colaboradores)
    }
    );

    this.fechaActual = new Date();

    this.diaActual = new Date().getDay();

    this.fechaSeleccionada = this.fechaActual;

    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )

  }

  procesaPropagar(mensaje:any) {
    this.acumuladoSemanal = mensaje
  }
}
