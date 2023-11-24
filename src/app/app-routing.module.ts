import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import {  VistaActividadesAsignadasComponent } from './actividadesAsignadasModule/pages/vistaActividadesAsignadas/vista-actividades-asignadas.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { VistaClientesProyectosComponent } from './clientes-proyectos-module/pages/vista-clientes-proyectos/vista-clientes-proyectos.component';
import { VistaColaboradoresComponent } from './colaboradores-module/pages/vista-colaboradores/vista-colaboradores.component';
import { LoginComponent } from './auth/pages/login/login.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    component: LoginComponent, 
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividadesAsignadasModule/CapturaAct.module').then( m => m.CapturaActividadModule ),
    component: VistaActividadesAsignadasComponent, 
    canLoad: [ AuthGuard ]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes-proyectos-module/clientes-proyectos-module.module').then( m => m.ClientesProyectosModule ),
    component: VistaClientesProyectosComponent, 
    canLoad: [ AuthGuard ]
  },
  {
    path: 'colaboradores',
    loadChildren: () => import('./colaboradores-module/colaboradores-module.module').then( m => m.ColaboradoresModule ),
    component: VistaColaboradoresComponent, 
    canLoad: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent 
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
