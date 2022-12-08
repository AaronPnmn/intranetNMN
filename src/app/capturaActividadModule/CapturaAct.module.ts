import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CapturaActividadComponent } from './capturaActividadApp/capturaActividad.component';
import { FormsModule } from '@angular/forms';
import { EstadoCapturaComponent } from './estado-captura/estado-captura.component';
import { EstadoEdicionComponent } from './estado-edicion/estado-edicion.component';
import { EstadoDuplicarComponent } from './estado-duplicar/estado-duplicar.component';


@NgModule({
    declarations: [
        CapturaActividadComponent,
        EstadoCapturaComponent,
        EstadoEdicionComponent,
        EstadoDuplicarComponent
    ],
    exports: [
        CapturaActividadComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers:[
        
    ]

})
export class CapturaActividadModule {}