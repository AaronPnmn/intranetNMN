import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-side-bar-nav',
  templateUrl: './side-bar-nav.component.html',
  styleUrls: ['./side-bar-nav.component.css']
})
export class SideBarNavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.usuario
  }

  user: Usuario = {
    uid: '',
    name: '',
    token: '',
    rol: '',
    avatar: ''
  }

}
