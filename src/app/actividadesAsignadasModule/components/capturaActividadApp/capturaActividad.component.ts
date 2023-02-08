import { Component, Input } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { SidenavService } from '../../services/sidenav.service';



@Component({
  selector: 'app-capturarActividad',
  templateUrl: `capturaActividad.component.html`,
  styleUrls: ['../../capturaActividad.css']
})
export class CapturaActividadComponent {


  @Input() onToggled: boolean = false;
  
  @Input() rol: string = '';

  
  get actividad() {
    return this.capturaService.actividad;
  }

  get estado() {
    return this.capturaService.estado;
  }


  constructor ( private capturaService:CapturaActividadService,
                private sidenavService:SidenavService ) {}

  cambiaEstado(nuevoEstado: string){
    
    this.capturaService.cambiaEstadoService(nuevoEstado);
    
  }

  cerrarDrawer(){
    
    this.sidenavService.close();
    
  }




}
