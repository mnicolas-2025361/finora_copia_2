import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para usar pipes como {{ gastado | currency }} en el HTML
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  imports: [CommonModule], // Agregamos CommonModule aquí
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  // Iniciamos las variables en 0
  presupuesto = 0;
  gastado = 0;
  
  // Guardamos la referencia de la gráfica por si necesitamos actualizarla después
  chart: any;

  // Inyectamos el HttpClient para hacer peticiones al backend
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // En lugar de pintar los datos fijos, llamamos al backend
    this.obtenerDatosDeBaseDeDatos();
  }

  obtenerDatosDeBaseDeDatos() {
    // Reemplaza esto con la ruta real de tu backend en Spring Boot (ej. http://localhost:8080/api/finanzas/resumen)
    const apiUrl = 'http://localhost:8080/api/endpoint-de-tus-datos'; 

    this.http.get<any>(apiUrl).subscribe({
      next: (datos) => {
        // Asumimos que tu backend devuelve un JSON como: { "presupuesto": 3500, "gastado": 2183.87 }
        this.presupuesto = datos.presupuesto;
        this.gastado = datos.gastado;

        // Una vez que tenemos los datos reales, dibujamos la gráfica
        this.crearGrafica();
      },
      error: (err) => {
        console.error('Error al obtener datos de la base de datos:', err);
      }
    });
  }

  crearGrafica() {
    const disponible = this.presupuesto - this.gastado;

    // Si ya existe una gráfica previa, la destruimos para evitar errores visuales al recargar
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