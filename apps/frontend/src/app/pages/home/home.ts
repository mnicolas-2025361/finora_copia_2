import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  imports: [CommonModule], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  presupuesto = 0;
  gastado = 0;
  chart: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.obtenerDatosDeBaseDeDatos();
  }

  obtenerDatosDeBaseDeDatos() {
    // CORREGIDO: Apunta al puerto 3000 de Node.js y a tu ruta real de PostgreSQL
    const apiUrl = 'http://localhost:3000/api/home/resumen'; 

    this.http.get<any>(apiUrl).subscribe({
      next: (datos) => {
        this.presupuesto = datos.presupuesto;
        this.gastado = datos.gastado;

        // Dibuja la gráfica con los datos reales
        this.crearGrafica();
      },
      error: (err) => {
        console.error('Error al obtener datos de la base de datos:', err);
      }
    });
  }

  crearGrafica() {
    const disponible = this.presupuesto - this.gastado;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('presupuestoChart', {
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