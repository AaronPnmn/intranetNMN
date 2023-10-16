import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-cliente',
  templateUrl: './tarjeta-cliente.component.html',
  styleUrls: ['./tarjeta-cliente.component.css']
})
export class TarjetaClienteComponent implements OnInit {

  @Input() cliente: any;

  
  // @Output() nombreProyecto  = new EventEmitter<string>();
  // @Output() nombreCliente   = new EventEmitter<string>();

  constructor() { }

  //proyecto._id, proyecto.nombre, cliente.razon_social, proyectos, proyecto.horasProyecto

  totalProyectos: number = 0;

  proyectos: any = [];

  horasTotal: string = '';

  detalleProyecto: any;

  ngOnInit(): void {


    this.totalProyectos = this.cliente.proyectos.length;

    
    let minutosTotales = (this.cliente.horas.resHor * 60) + this.cliente.horas.resMin;

    this.horasTotal = `${Math.floor(minutosTotales / 60)} horas ${minutosTotales % 60} min`;

    




  }










}
