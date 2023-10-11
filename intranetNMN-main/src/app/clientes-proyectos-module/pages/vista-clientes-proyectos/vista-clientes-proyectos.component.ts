import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ReporteClientesProyService } from '../../services/reporte-clientes-proy.service';


@Component({
  selector: 'app-vista-clientes-proyectos',
  templateUrl: './vista-clientes-proyectos.component.html',
  styleUrls: ['./vista-clientes-proyectos.component.css']
})
export class VistaClientesProyectosComponent implements OnInit {


  reloadedChart: boolean = true;

  user: Usuario = {
    uid: '',
    name: '',
    token: '',
    rol: ''
  }

  estatus: string = 'main';

  detalleProyecto: any;

  clientes: any[] = [];

  proyectos: any[] = [];

  actividades: any[] = [];

  clientesGraph: any = [];

  lastClient: any;

  fechaInicio: any;

  fechaFin: any;

  fechaActual: any;

//   detalleProyecto: any = {
//     nombre: '',
//     _id: '',
//     fechaInicio: 0,
//     fechaFin: 0,
//   }
  
  constructor(private authService: AuthService,
              private reportesService: ReporteClientesProyService,
              private router: Router) { }

  ngOnInit(): void {


    this.user = this.authService.usuario

    //console.log(this.user);

    this.fechaActual = new Date();
    
    this.fechaFin = new Date();

    this.fechaInicio = new Date(this.fechaActual.setDate(this.fechaActual.getDate() - 2));
    

    this.imprimeClientes();


  }





  navigate(ruta:string):void {
    localStorage.setItem('token', '')
    this.router.navigateByUrl(ruta);
  }


  formatClientess(arrayClientes: any){

    this.clientes = []

    arrayClientes.newData.forEach((element:any) => {
      if (element.proyectos.length > 0) {
        this.clientes.push(element) 
      }
    });
    
    this.clientes.sort(
        (p1, p2) => (p1.proyectos.length < p2.proyectos.length) ? 1 : (p1.proyectos.length > p2.proyectos.length) ? -1 : 0);
      
  }

  cambiaEstatus(estatus: string){
    
    this.estatus = estatus;
    
  }

  imprimeClientes(){

    this.reportesService.getActividades_byTime(this.fechaInicio.getTime(),this.fechaFin.getTime())
    .subscribe( actividades =>{  

        console.log(actividades);
        
        this.formatClientess(actividades);

        let grphCli: any = []
    
        this.clientes.forEach( ( element:any ) => {
        
            if (element.proyectos.length > 0) {
    
                let totalMin = (element.horas.resHor * 60) + element.horas.resMin
                let totalHor = Math.floor(totalMin / 60)
                let residuoHoras =  parseFloat((totalHor + (totalMin % 60) / 60).toFixed(1))
                let clienteGraph = {
                    nombre: element.razon_social,
                    horas: residuoHoras,
                    color: this.random_rgba(),
                }
    
                grphCli.push(clienteGraph)
    
            }
            
        });
    
        this.clientesGraph = grphCli;

        this.reloadChart();
        
    })

  }

  focusCliente(cliente: any){

    console.log(cliente.proyectos[0]);

    let grphCli: any = []
    
    if ( this.lastClient == cliente ) {
        //tarjetas cerradas - mostrar grafica general
        console.log("tarjetas cerradas");

        this.clientes.forEach( ( element:any ) => {
        
            if (element.proyectos.length > 0) {
    
                let totalMin = (element.horas.resHor * 60) + element.horas.resMin
                let totalHor = Math.floor(totalMin / 60)
                let residuoHoras =  parseFloat((totalHor + (totalMin % 60) / 60).toFixed(1))
                let clienteGraph = {
                    nombre: element.razon_social,
                    horas: residuoHoras,
                    color: this.random_rgba(),
                }
    
                grphCli.push(clienteGraph)
    
            }
            
        });
    
        this.clientesGraph = grphCli;
        
    }else{
        //tarjeta abierta - mostrar grafica de cliente
        console.log("tarjeta abierta");

        cliente.proyectos.forEach( ( element:any ) => {

            let totalMin = (element.horas.resHor * 60) + element.horas.resMin
            let totalHor = Math.floor(totalMin / 60)
            let residuoHoras =  parseFloat((totalHor + (totalMin % 60) / 60).toFixed(1))
            let clienteGraph = {
                nombre: element.nombre,
                horas: residuoHoras,
                color: this.random_rgba(),
            }
    
            grphCli.push(clienteGraph)
            
        });
    
        this.clientesGraph = grphCli;
        
    }

    this.lastClient = cliente;
    
 
    this.reloadChart();
        
  }

  

  reloadChart(){
    this.reloadedChart = false;

    setTimeout(() => {
        this.reloadedChart = true;
    }, 500);
  }
  
  openDetalleProy(cliente:any){

    let detalleProyecto = {
      idProyecto : cliente.proyectos[0]._id,
      nombreProyecto: cliente.proyectos[0].nombre,
      idCliente: cliente._id,
      nombreCliente: cliente.razon_social,
      tiempoInicio: this.fechaInicio,
      tiempoFin: this.fechaFin
    }
    

    this.cambiaEstatus('detalle-proyecto')
    this.detalleProyecto = detalleProyecto;
    
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
  }
















}
