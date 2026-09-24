import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
  readonly productos = [
    {
      imagen: 'imagenes/productos/multivitaminico.jpg',
      alt: 'Cápsulas de magnesio',
      titulo: 'Magnesio de liberación lenta',
      texto: 'Apoyo para calambres nocturnos y fatiga muscular, indicado por nutrición.',
    },
    {
      imagen: 'imagenes/productos/bandas.jpg',
      alt: 'Pelota de propiocepción',
      titulo: 'Pelota de equilibrio 55 cm',
      texto: 'Herramienta para core, postura y ejercicios de fisioterapia en casa.',
    },
    {
      imagen: 'imagenes/productos/aceite.jpg',
      alt: 'Gel de recuperación',
      titulo: 'Gel frío de árnica',
      texto: 'Alivio tópico después de sesiones de quiropraxia o entrenamiento.',
    },
    {
      imagen: 'imagenes/productos/cojin.jpg',
      alt: 'Soporte de muñeca',
      titulo: 'Muñequera de descanso',
      texto: 'Recomendada para digitación prolongada y tendinitis de estudio.',
    },
    {
      imagen: 'imagenes/productos/colchoneta.jpg',
      alt: 'Rodillo de masaje',
      titulo: 'Rodillo de fascia',
      texto: 'Automasaje de pantorrilla, ITB y planta del pie entre consultas.',
    },
    {
      imagen: 'imagenes/productos/alimentacion.jpg',
      alt: 'Té de hierbas',
      titulo: 'Infusión de descanso',
      texto: 'Mezcla de manzanilla y cidrón sugerida en hábitos de sueño.',
    },
  ];
}
