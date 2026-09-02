import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-ingreso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay">

      <div class="modal-card">

        <h3>Registrar Nuevo Ingreso</h3>

        <p style="color: #888; font-size: 0.85rem; margin-bottom: 20px;">
          Ingresa los detalles de la entrada de dinero.
        </p>

        <div style="margin-bottom: 15px;">
          <label>Descripción</label>

          <input
            type="text"
            [(ngModel)]="descripcion"
            placeholder="Ej. Venta, Salario..."
            class="search-input-finora"
          />
        </div>

        <div style="margin-bottom: 15px;">
          <label>Monto (Q.)</label>

          <input
            type="number"
            [(ngModel)]="monto"
            placeholder="0.00"
            class="search-input-finora"
          />
        </div>

        <div style="margin-bottom: 20px;">
          <label>Categoría</label>

          <select
            [(ngModel)]="categoria"
            class="search-input-finora"
            style="background-color: #071714;"
          >

            <option value="Trabajo">Trabajo</option>
            <option value="Freelance">Freelance</option>
            <option value="Extra">Extra</option>
            <option value="Inversión">Inversión</option>

          </select>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">

          <button
            class="boton-accion"
            (click)="cerrarModalLocal()"
            style="background: transparent; border: 1px solid #13382d;">
            Cancelar
          </button>

          <button
            class="boton-accion"
            (click)="guardar()">
            Guardar Ingreso
          </button>

        </div>

      </div>

    </div>
  `
})
export class ingresoComponent {

  descripcion: string = '';
  monto: number | null = null;
  categoria: string = 'Trabajo';

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardadoExitoso = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  guardar() {

    if (
      !this.descripcion ||
      this.monto === null ||
      this.monto === undefined
    ) {
      alert('Por favor completa la descripción y el monto.');
      return;
    }

    const nuevo = {
      descripcion: this.descripcion,
      monto: Number(this.monto),
      categoria: this.categoria,
      fecha: new Date().toISOString().split('T')[0]
    };

    this.http
      .post('http://localhost:3000/api/ingresos', nuevo)
      .subscribe({

        next: () => {
          this.guardadoExitoso.emit();
          this.cerrarModalLocal();
        },

        error: (err: any) => {
          console.error('Error al guardar el ingreso:', err);
          alert('No se pudo guardar el ingreso.');
        }

      });
  }

  cerrarModalLocal() {

    this.descripcion = '';
    this.monto = null;
    this.categoria = 'Trabajo';

    this.cerrar.emit();
  }
}