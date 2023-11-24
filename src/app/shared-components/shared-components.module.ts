import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { MaterialModule } from '../material/material.module';
import { SideBarNavComponent } from './components/side-bar-nav/side-bar-nav.component';




@NgModule({
  declarations: [
    MenuLateralComponent,
    SideBarNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    
  ],
  exports: [
    MenuLateralComponent,
    SideBarNavComponent
  ]
})
export class SharedComponentsModule { }
