import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaClientesProyectosComponent } from './pages/vista-clientes-proyectos/vista-clientes-proyectos.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MaterialModule } from '../material/material.module';
import { TarjetaClienteComponent } from './components/tarjeta-cliente/tarjeta-cliente.component';
import { DetalleProyectoComponent } from './pages/detalle-proyecto/detalle-proyecto.component';
import { EditarActividadForm } from './pages/detalle-proyecto/detalle-proyecto.component';
import { FormsModule } from "@angular/forms";
import { GraficaClientesComponent } from './components/grafica-clientes/grafica-clientes.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TimeEditPipe } from './pipes/time-edit.pipe';

@NgModule({
  declarations: [
    VistaClientesProyectosComponent,
    TarjetaClienteComponent,
    EditarActividadForm,
    DetalleProyectoComponent,
    GraficaClientesComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    
    MaterialModule,
    SharedComponentsModule,
    FormsModule
  ],
  providers:[
    TimeEditPipe
]
})
export class ClientesProyectosModule { }
