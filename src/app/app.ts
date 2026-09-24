import { Component } from '@angular/core';
import { BarraNavegacion } from './componentes/barra-navegacion/barra-navegacion';
import { Carrusel } from './componentes/carrusel/carrusel';
import { Encabezado } from './componentes/encabezado/encabezado';
import { Footer } from './componentes/footer/footer';
import { MedicosEspecialidad } from './componentes/medicos-especialidad/medicos-especialidad';
import { Productos } from './componentes/productos/productos';
import { Registro } from './componentes/registro/registro';

@Component({
  imports: [
    Encabezado,
    BarraNavegacion,
    Carrusel,
    MedicosEspecialidad,
    Registro,
    Productos,
    Footer,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
