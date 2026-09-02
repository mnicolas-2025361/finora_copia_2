import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // 1. Importado para redireccionar
import { ingresoComponent } from './nuevo-ingreso';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, ingresoComponent],
  templateUrl: './ingresos.html',
  styleUrl: './ingresos.css'
})
export class IngresosComponent {

  ingresos: any[] = [];

  mostrarModal = false;

  totalIngresos = 0;
  ingresoMes = 0;

  // 2. Añadido el Router en el constructor
  constructor(private http: HttpClient, private router: Router) {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.http.get<any[]>('http://localhost:3000/api/ingresos').subscribe({
      next: (data) => {
        this.ingresos = data;
        this.calcularTotales();
      },
      error: (err) => {
        console.error('Error al cargar los ingresos:', err);
      }
    });
  }

  calcularTotales() {
    this.totalIngresos = this.ingresos.reduce(
      (total, ingreso) => total + Number(ingreso.monto),
      0
    );

    const mesActual = new Date().getMonth();
    const añoActual = new Date().getFullYear();

    this.ingresoMes = this.ingresos
      .filter(ingreso => {
        const fecha = new Date(ingreso.fecha);

        return fecha.getMonth() === mesActual &&
               fecha.getFullYear() === añoActual;
      })
      .reduce(
        (total, ingreso) => total + Number(ingreso.monto),
        0
      );
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  ingresoGuardado() {
    this.cargarIngresos();
  }

  // 3. Nueva función para redirigir a /ingreso
  irANuevoIngreso() {
    this.router.navigate(['/ingreso']);
  }

}