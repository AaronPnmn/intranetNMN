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
    rol: '',
    avatar: ''
  }

  fechaActual: any;

  semanaActual: any;


  

  get actividad():any {
      return this.capturaService.actividad;
  }

  get modeDrawer():any {
    return this.capturaService.modeDrawer
  }

  // if (this.capturaService.estado === 'crear') {
  //   this.modeDrawer = 'side'
  // }else{
  //   this.modeDrawer = 'over'
  // }


  constructor( private capturaService:CapturaActividadService,
               private sidenavService:SidenavService,
               private authService:AuthService,
               private datePipe:DatePipe,
               private router: Router ) { }
  

  refreshSemana(){
    ++this.capturaService.reloadSemana
  }

  navigate(ruta:string):void {
    localStorage.setItem('token', '')
    this.router.navigateByUrl(ruta);
  }
  
  // onClosed(){

    
    

  //   this.capturaService.cambiaEstadoService('captura')

    
  //   this.capturaService.modificarDrawer(false); 
    
  // }

  startClose(){
    
    
    this.onToggled = !this.onToggled
    this.capturaService.modificarDiaVista('todos')
    this.capturaService.cambiaEstadoService('captura');
    this.refreshSemana();

    
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit() {
    

    this.user = this.authService.usuario

    console.log(this.user);

    this.fechaActual = new Date();

    this.semanaActual = this.datePipe.transform( this.fechaActual,'w');

    

  
  
    
    
    
  }

}
