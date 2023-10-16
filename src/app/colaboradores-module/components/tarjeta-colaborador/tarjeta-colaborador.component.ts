import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-colaborador',
  templateUrl: './tarjeta-colaborador.component.html',
  styleUrls: ['./tarjeta-colaborador.component.css']
})
export class TarjetaColaboradorComponent implements OnInit {

  @Input() colaborador: any;

  
  // @Output() nombreProyecto  = new EventEmitter<string>();
  // @Output() nombreCliente   = new EventEmitter<string>();

  constructor() { }

  //proyecto._id, proyecto.nombre, cliente.razon_social, proyectos, proyecto.horasProyecto

  totalProyectos: number = 0;

  proyectos: any = [];

  horasTotal: string = '';

  detalleProyecto: any;

  avatarColab : string = 'background-image: url(../../../../assets/images/Mural-NMN.png);';

  ngOnInit(): void {
    
    this.totalProyectos = this.colaborador.proyectos.length;

    this.avatarColab = `background-image: url(../../../../assets/images/avatar_${this.colaborador._id}.jpg);`;
    
    let minutosTotales = (this.colaborador.horas.resHor * 60) + this.colaborador.horas.resMin;

    this.horasTotal = `${Math.floor(minutosTotales / 60)} horas ${minutosTotales % 60} min`;

    




  }










}
