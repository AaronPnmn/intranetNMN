import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { CapturaActividadComponent } from './components/capturaActividadApp/capturaActividad.component';
import { FormsModule } from '@angular/forms';
import { EstadoCapturaComponent } from './components/estado-captura/estado-captura.component';
import { EstadoEdicionComponent } from './components/estado-edicion/estado-edicion.component';
import { EstadoDuplicarComponent } from './components/estado-duplicar/estado-duplicar.component';
import { MaterialModule } from '../material/material.module';
import { SemanaComponent } from './pages/semana/semana.component';
import { MesComponent } from './pages/mes/mes.component';

//import { ActividadesRoutingModule } from './actividades-routing.module';
import { DiaSemanaComponent } from './components/dia-semana/dia-semana.component';
import { TarjetaActividadComponent } from './components/tarjeta-actividad/tarjeta-actividad.component';
import { CapturaActividadService } from './services/capturaActividad.service';
import { TimeInitPipe } from './pipes/time-init.pipe';
import { EstadoCrearComponent } from './components/estado-crear/estado-crear.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeEditPipe } from './pipes/time-edit.pipe';
import { RecargaDirective } from '../directives/recarga.directive';
import { SidenavService } from './services/sidenav.service';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { VistaActividadesAsignadasComponent } from './pages/vistaActividadesAsignadas/vista-actividades-asignadas.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
    declarations: [
        CapturaActividadComponent,
        EstadoCapturaComponent,
        EstadoEdicionComponent,
        EstadoDuplicarComponent,
        SemanaComponent,
        MesComponent,
        VistaActividadesAsignadasComponent,
        DiaSemanaComponent,
        TarjetaActividadComponent,
        TimeInitPipe,
        EstadoCrearComponent,
        RecargaDirective,
        ConfirmComponent
    ],
    exports: [
        CapturaActividadComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedComponentsModule,
        ReactiveFormsModule,
    ],
    providers:[
        CapturaActividadService,
        SidenavService,
        DatePipe,
        TimeEditPipe
    ]

})
export class CapturaActividadModule {}