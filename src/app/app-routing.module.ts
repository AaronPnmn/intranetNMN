import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import {  VistaActividadesAsignadasComponent } from './actividadesAsignadasModule/pages/vistaActividadesAsignadas/vista-actividades-asignadas.component';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { VistaClientesProyectosComponent } from './clientes-proyectos-module/pages/vista-clientes-proyectos/vista-clientes-proyectos.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
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
