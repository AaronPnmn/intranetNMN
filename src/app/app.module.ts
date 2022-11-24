import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CapturaActividadModule } from './intranet/CapturaAct.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CapturaActividadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
