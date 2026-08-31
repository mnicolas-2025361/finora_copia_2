import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  presupuesto = 3500;
  gastado = 2183.87;

  ngAfterViewInit(): void {

    const disponible = this.presupuesto - this.gastado;

    new Chart('presupuestoChart', {
      type: 'doughnut',

      data: {
        labels: ['Gastado', 'Disponible'],

        datasets: [{
          data: [this.gastado, disponible],

          backgroundColor: [
            '#4fd1a1',
            '#9b6de3'
          ],

          borderWidth: 0
        }]
      },

      options: {
        cutout: '65%',

        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

  }
}
