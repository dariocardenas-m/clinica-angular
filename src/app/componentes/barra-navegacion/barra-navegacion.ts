import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-barra-navegacion',
  styleUrl: './barra-navegacion.css',
  templateUrl: './barra-navegacion.html',
})
export class BarraNavegacion {
  menuAbierto = false;

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
