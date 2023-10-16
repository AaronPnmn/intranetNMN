import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaColaboradoresComponent } from './pages/vista-colaboradores/vista-colaboradores.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MaterialModule } from '../material/material.module';
import { TarjetaColaboradorComponent } from './components/tarjeta-colaborador/tarjeta-colaborador.component';
import { DetalleColaboradorComponent } from './pages/detalle-colaborador/detalle-colaborador.component';
import { EditarActividadForm } from './pages/detalle-colaborador/detalle-colaborador.component';
import { FormsModule } from "@angular/forms";
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TimeEditPipe } from './pipes/time-edit.pipe';

@NgModule({
  declarations: [
    VistaColaboradoresComponent,
    TarjetaColaboradorComponent,
    EditarActividadForm,
    DetalleColaboradorComponent,
    ConfirmComponent,
    TimeEditPipe
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
export class ColaboradoresModule { }
