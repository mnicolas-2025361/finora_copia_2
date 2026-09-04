import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Importa el Router
import { IngresoService, Ingreso } from '../../services/ingreso.service.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private ingresoService = inject(IngresoService);
  private router = inject(Router); // 2. Inyecta el Router

  ingresos: Ingreso[] = [];
  ingresoMes = 0;
  cargando = false;

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard(): void {
    this.cargando = true;
    this.ingresoService.listar().subscribe({
      next: (data) => {
        this.ingresos = data;
        this.calcularIngresoMes();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar ingresos en el dashboard:', err);
        this.cargando = false;
      }
    });
  }

  calcularIngresoMes(): void {
    const ahora = new Date();
    const mesActual = ahora.getMonth();
    const anioActual = ahora.getFullYear();

    this.ingresoMes = this.ingresos
      .filter((ingreso) => {
        const fecha = new Date(ingreso.fecha);
        return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
      })
      .reduce((total, ingreso) => total + Number(ingreso.monto), 0);
  }

  // 3. Método que le da vida al botón del HTML para ir a la vista de ingresos
  irANuevoIngreso(): void {
    this.router.navigate(['/ingresos']);
  }
}