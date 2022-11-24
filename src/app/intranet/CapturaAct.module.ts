import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CapturaActividadComponent } from './capturaActividad/capturaActividad.component';


@NgModule({
    declarations: [
        CapturaActividadComponent
    ],
    exports: [
        CapturaActividadComponent
    ],
    imports: [
        CommonModule
    ]

})
export class CapturaActividadModule {}