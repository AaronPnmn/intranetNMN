import { Component, Input } from '@angular/core';
//import { MatIconRegistry } from '@angular/material/icon';
//import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent  {

  @Input() pagina: string = '';

  constructor(private router: Router
              //private matIconRegistry: MatIconRegistry,
              //private domSanitizer: DomSanitizer
            ) {
                //this.matIconRegistry.addSvgIcon(
                //  'clientes',
                //  this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/clientes_icon.svg')
                
               }

  navigate(ruta:string):void {
    this.router.navigateByUrl(ruta);
  }


}
