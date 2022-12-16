import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CapturaActividadComponent } from './components/capturaActividadApp/capturaActividad.component';
import { FormsModule } from '@angular/forms';
import { EstadoCapturaComponent } from './components/estado-captura/estado-captura.component';
import { EstadoEdicionComponent } from './components/estado-edicion/estado-edicion.component';
import { EstadoDuplicarComponent } from './components/estado-duplicar/estado-duplicar.component';
import { MaterialModule } from '../material/material.module';
import { SemanaComponent } from './pages/semana/semana.component';
import { MesComponent } from './pages/mes/mes.component';
import { HomeComponent } from './pages/home/home.component';
import { ActividadesRoutingModule } from './actividades-routing.module';
import { ColaboradorSemanaComponent } from './components/colaborador-semana/colaborador-semana.component';
import { DiaSemanaComponent } from './components/dia-semana/dia-semana.component';
import { TarjetaActividadComponent } from './components/tarjeta-actividad/tarjeta-actividad.component';


@NgModule({
    declarations: [
        CapturaActividadComponent,
        EstadoCapturaComponent,
        EstadoEdicionComponent,
        EstadoDuplicarComponent,
        SemanaComponent,
        MesComponent,
        HomeComponent,
        ColaboradorSemanaComponent,
        DiaSemanaComponent,
        TarjetaActividadComponent
    ],
    exports: [
        CapturaActividadComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ActividadesRoutingModule
    ],
    providers:[
        
    ]

})
export class CapturaActividadModule {}