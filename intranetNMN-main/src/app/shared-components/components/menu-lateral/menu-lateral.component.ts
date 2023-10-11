import { Component, Input, OnInit } from '@angular/core';
//import { MatIconRegistry } from '@angular/material/icon';
//import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
    user: Usuario = {
    uid: '',
    name: '',
    token: '',
    rol: ''
  }
  @Input() pagina: string = '';

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {


    this.user = this.authService.usuario

    

  }

  navigate(ruta:string):void {
    this.router.navigateByUrl(ruta);
  }

  


}
