import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [
    MenuLateralComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    
  ],
  exports: [
    MenuLateralComponent,
  ]
})
export class SharedComponentsModule { }
