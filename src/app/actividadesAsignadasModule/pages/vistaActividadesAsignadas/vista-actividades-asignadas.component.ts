import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-vista-actividades-asignadas',
  templateUrl: './vista-actividades-asignadas.component.html',
  styleUrls: ['./vista-actividades-asignadas.component.css'],
  providers: [DatePipe]
})
export class VistaActividadesAsignadasComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav; //revisar - toggleSidenav
  
  onToggled: boolean = false;

  user: Usuario = {
    uid: '',
    name: '',
    token: '',
    rol: ''
  }

  fechaActual: any;

  semanaActual: any;

  
  get drawerActivo():boolean{
    return this.capturaService.drawerAbierto;
  }  

  get actividad():any {
      return this.capturaService.actividad;
  }

  get reloadSemana():number{
    return this.capturaService.reloadSemana
  }


  constructor( private capturaService:CapturaActividadService,
               private sidenavService:SidenavService,
               private authService:AuthService,
               private datePipe:DatePipe,
               private router: Router ) { }
  

  refreshSemana(){
    ++this.capturaService.reloadSemana
  }

  navigate(ruta:string):void {
    this.router.navigateByUrl(ruta);
  }
  
  onClosed(){

    
    this.onToggled = true

    this.capturaService.cambiaEstadoService('captura')

    
    this.capturaService.modificarDrawer(false); 
    

    // if ( this.capturaService.contador ) { //Al cerrar, el cronometro está iniciado
      
    //   clearInterval(this.capturaService.contador)
    //   this.capturaService.contador = null;  
    //   this.capturaService.buttonLabel = 'Iniciar';

    //   console.log("Al cerrar, el cronometro está iniciado");  

    // } else { //Al cerrar, el cronometro NO está iniciado

    //   console.log("Al cerrar, el cronometro NO está iniciado");  

    // }




    //console.log(this.capturaService.contador)
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit() {
    //this.capturaService.sideNavToggleSubject.subscribe(()=> { //toggleSidenav
    //  this.sidenav.toggle();
    //});

    this.user = this.authService.usuario

    console.log(this.user);

    this.fechaActual = new Date();

    this.semanaActual = this.datePipe.transform( this.fechaActual,'w');

    

  
  
    
    
    
  }

}
