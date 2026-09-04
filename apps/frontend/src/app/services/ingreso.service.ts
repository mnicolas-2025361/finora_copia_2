import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingreso {
    id: number;
    usuario_id?: number;
    descripcion: string;
    monto: number;
    fecha: string;
    categoria: string;
}

// Lo que enviamos al crear (sin id, lo genera la base de datos)
export type NuevoIngreso = Omit<Ingreso, 'id' | 'usuario_id'>;

@Injectable({ providedIn: 'root' })
export class IngresoService {
    private http = inject(HttpClient);

  // Una sola fuente de verdad para la URL. Si cambia el puerto, se cambia aqui.
    private readonly api = 'http://localhost:3000/api/ingresos';

    listar(): Observable<Ingreso[]> {
        return this.http.get<Ingreso[]>(this.api);
    }

    crear(ingreso: NuevoIngreso): Observable<Ingreso> {
        return this.http.post<Ingreso>(this.api, ingreso);
    }

    eliminar(id: number): Observable<{ mensaje: string }> {
        return this.http.delete<{ mensaje: string }>(`${this.api}/${id}`);
    }
}
