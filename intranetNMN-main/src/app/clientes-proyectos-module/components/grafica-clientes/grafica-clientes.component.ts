import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { Chart, registerables  } from "node_modules/chart.js";
Chart.register(...registerables);

@Component({
  selector: 'app-grafica-clientes',
  templateUrl: './grafica-clientes.component.html',
  styleUrls: ['./grafica-clientes.component.css']
})
export class GraficaClientesComponent implements OnInit, OnChanges, AfterViewInit {
  
  @ViewChild('pieChart') pieChart: any;
  
  @Input() graphClientes: any;

  nombresCliente: string[] = [];

  horas:          number[] = [];
  
  colores:        string[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    
    if (this.graphClientes.length > 0 ) {
      
      
      this.renderGraph()
    }
        
  }


  ngOnInit(): void {

    

    
  }

  ngOnChanges(): void {

    
    

    if (this.pieChart != null && this.graphClientes.length > 0) {
        
        this.renderGraph()

    }


    
  }

  renderGraph(){
    //console.log(this.graphClientes);
    
    this.graphClientes.forEach((element: any) => {

      this.nombresCliente.push(element.nombre);

      this.horas.push(element.horas);

      this.colores.push(element.color);

    });

    
    

    this.pieChart = new Chart(this.pieChart.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
          labels: this.nombresCliente,
            datasets: [{
              label: 'Horas',
              data: this.horas,
              backgroundColor: this.colores,
              hoverOffset: 4
            }],
      },
      options: {
        plugins: {
            legend: {
              position: 'bottom'
            }
        }
    }
  });  
  }


}
