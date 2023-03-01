import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaClientesProyectosComponent } from './pages/vista-clientes-proyectos/vista-clientes-proyectos.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    VistaClientesProyectosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedComponentsModule,
  ]
})
export class ClientesProyectosModule { }
