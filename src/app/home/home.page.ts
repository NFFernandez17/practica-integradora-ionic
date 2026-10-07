import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonList, IonLabel,
} from '@ionic/angular';

interface Alumno {
  nombre: string;
  calificacion: number;
  estado: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonList, IonLabel,
  ],
})
export class HomePage {
  // ---------- Parte A ----------
  nombre = '';
  calificacion: string | number | null = null;
  mensaje = '';
  alumnos: Alumno[] = [];
  resumen = '';

  // ---------- Parte B ----------
  numero: string | number | null = null;
  mensajeNumero = '';
  tabla: string[] = [];
  regresiva: number[] = [];

  agregarAlumno() {
    const nota = Number(this.calificacion);
    const nombreLimpio = (this.nombre ?? '').trim();

    // SELECTIVA: if simple (validar campos vacíos)
    if (nombreLimpio === '' || this.calificacion === null || this.calificacion === '') {
      this.mensaje = 'Escribe el nombre y la calificación.';
      return;
    }

    // SELECTIVA: if-else (validar rango)
    if (isNaN(nota) || nota < 0 || nota > 100) {
      this.mensaje = 'La calificación debe estar entre 0 y 100.';
      return;
    } else {
      this.mensaje = '';
    }

    // SELECTIVA: if - else if - else (clasificar)
    let estado: string;
    if (nota >= 90) {
      estado = 'Excelente';
    } else if (nota >= 70) {
      estado = 'Aprobado';
    } else {
      estado = 'Reprobado';
    }

    this.alumnos.push({ nombre: nombreLimpio, calificacion: nota, estado });
    this.mensaje = `${nombreLimpio}: ${nota} → ${estado}`;
    this.nombre = '';
    this.calificacion = null;
    this.calcularResumen();
  }

  calcularResumen() {
    if (this.alumnos.length === 0) {
      this.resumen = 'Aún no hay alumnos registrados.';
      return;
    }

    let suma = 0;
    let aprobados = 0;
    let reprobados = 0;

    // ITERATIVA: for clásico (sumar calificaciones)
    for (let i = 0; i < this.alumnos.length; i++) {
      suma += this.alumnos[i].calificacion;
    }

    // ITERATIVA: for...of (contar aprobados y reprobados)
    for (const alumno of this.alumnos) {
      if (alumno.estado === 'Reprobado') {
        reprobados++;
      } else {
        aprobados++;
      }
    }

    // ITERATIVA: while (buscar la calificación más alta)
    let mayor = this.alumnos[0].calificacion;
    let indice = 1;
    while (indice < this.alumnos.length) {
      if (this.alumnos[indice].calificacion > mayor) {
        mayor = this.alumnos[indice].calificacion;
      }
      indice++;
    }

    const promedio = suma / this.alumnos.length;
    this.resumen =
      `Total: ${this.alumnos.length} | Promedio: ${promedio.toFixed(2)} | ` +
      `Aprobados: ${aprobados} | Reprobados: ${reprobados} | Más alta: ${mayor}`;
  }

  limpiarLista() {
    this.alumnos = [];
    this.resumen = '';
    this.mensaje = '';
  }

  generarSecuencias() {
    const n = Number(this.numero);
    this.tabla = [];
    this.regresiva = [];

    // SELECTIVA: if (validar número entero 1-100)
    if (this.numero === null || this.numero === '' || isNaN(n) || !Number.isInteger(n) || n < 1 || n > 100) {
      this.mensajeNumero = 'Escribe un número entero entre 1 y 100.';
      return;
    }
    this.mensajeNumero = '';

    // ITERATIVA: for (tabla de multiplicar)
    for (let i = 1; i <= 10; i++) {
      this.tabla.push(`${n} x ${i} = ${n * i}`);
    }

    // ITERATIVA: while (cuenta regresiva)
    let contador = n;
    while (contador >= 1) {
      this.regresiva.push(contador);
      contador--;
    }
  }
}