import { Component, OnDestroy, OnInit } from '@angular/core';

interface SlidePromocion {
  imagen: string;
  alt: string;
  titulo: string;
  texto: string;
}

@Component({
  imports: [],
  selector: 'app-carrusel',
  styleUrl: './carrusel.css',
  templateUrl: './carrusel.html',
})
export class Carrusel implements OnInit, OnDestroy {
  indice = 0;
  private temporizador: ReturnType<typeof setInterval> | undefined;

  readonly slides: SlidePromocion[] = [
    {
      imagen: 'imagenes/promociones/chequeo.jpg',
      alt: 'Jornada de vacunación y laboratorio',
      titulo: 'Jornada de laboratorio sin cita previa',
      texto: 'Hemograma y glicemia el primer sábado de cada mes, con orientación médica el mismo día.',
    },
    {
      imagen: 'imagenes/promociones/fisioterapia.jpg',
      alt: 'Evaluación postural',
      titulo: 'Análisis de postura en 40 minutos',
      texto: 'Mapeo de hombros, pelvis y marcha para estudiantes y personal de oficina.',
    },
    {
      imagen: 'imagenes/promociones/nutricion.jpg',
      alt: 'Taller de sueño y alimentación',
      titulo: 'Taller de sueño y merienda nocturna',
      texto: 'Dos encuentros grupales para regular cafeína, horarios y cenas ligeras.',
    },
  ];

  ngOnInit(): void {
    this.temporizador = setInterval(() => this.siguiente(), 5000);
  }

  ngOnDestroy(): void {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }

  irA(indice: number): void {
    this.indice = indice;
  }

  siguiente(): void {
    this.indice = (this.indice + 1) % this.slides.length;
  }

  anterior(): void {
    this.indice = (this.indice - 1 + this.slides.length) % this.slides.length;
  }
}
