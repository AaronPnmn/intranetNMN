import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CapturaActividadModule } from './actividadesAsignadasModule/CapturaAct.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { TimeEditPipe } from './actividadesAsignadasModule/pipes/time-edit.pipe';
import { ClientesProyectosModule } from './clientes-proyectos-module/clientes-proyectos-module.module';






@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    TimeEditPipe,
  ],
  imports: [
    BrowserModule,
    CapturaActividadModule,
    ClientesProyectosModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
