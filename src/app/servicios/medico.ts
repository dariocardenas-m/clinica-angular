import { Injectable } from '@angular/core';
import { Especialidad } from '../modelos/especialidad';
import { Medico } from '../modelos/medico';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private siguienteId = 1;
  private readonly medicos: Medico[] = [];

  readonly especialidades: Especialidad[] = [
    {
      nombre: 'Terapia neural',
      descripcion:
        'Intervenciones puntuales con anestésicos diluidos para modular inflamación, migraña tensional y puntos gatillo, con seguimiento clínico cercano.',
    },
    {
      nombre: 'Quiropraxia',
      descripcion:
        'Evaluación biomecánica de cuello, pelvis y marcha; se combinan movilizaciones articulares con recomendaciones de ergonomía en oficina y estudio.',
    },
    {
      nombre: 'Fisioterapia',
      descripcion:
        'Programas de recuperación funcional para lesiones deportivas, postoperatorio y adulto mayor, con metas medibles semana a semana.',
    },
    {
      nombre: 'Nutrición y Dietética Terapéutica',
      descripcion:
        'Consultas centradas en metabolismo, digestión y rendimiento: menús reales, listas de mercado y control de hábitos sin dietas extremas.',
    },
    {
      nombre: 'Medicina general',
      descripcion:
        'Puerta de entrada a la clínica: chequeos, control de crónicos, orientación familiar y coordinación con el resto del equipo terapéutico.',
    },
    {
      nombre: 'Psicología',
      descripcion:
        'Espacio para estrés académico, sueño, duelo y adherencia a tratamientos; se trabaja con metas cortas y herramientas prácticas.',
    },
  ];

  constructor() {
    this.cargarMedicosIniciales();
  }

  listarMedicos(): Medico[] {
    return [...this.medicos];
  }

  listarPorEspecialidad(especialidad: string): Medico[] {
    return this.medicos.filter((medico) => medico.especialidad === especialidad);
  }

  buscarPorId(id: number): Medico | undefined {
    return this.medicos.find((medico) => medico.id === id);
  }

  private registrar(
    nombres: string,
    apellidos: string,
    especialidad: string,
    horarioAtencion: string,
    aniosExperiencia: number,
    bibliografia: string,
    imagen: string,
    subespecialidades: string,
    motivacion: string
  ): void {
    this.medicos.push({
      id: this.siguienteId++,
      nombres,
      apellidos,
      especialidad,
      horarioAtencion,
      aniosExperiencia,
      bibliografia,
      imagen,
      subespecialidades,
      motivacion,
    });
  }

  private cargarMedicosIniciales(): void {
    const iniciales: Omit<Medico, 'id'>[] = [
      {
        nombres: 'Natalia',
        apellidos: 'Rojas Valencia',
        especialidad: 'Terapia neural',
        horarioAtencion: 'Lunes a jueves 9:00-17:00',
        aniosExperiencia: 11,
        bibliografia: 'Médica con práctica en dolor orofacial y cicatrices activas.',
        imagen: 'imagenes/medicos/laura.jpg',
        subespecialidades: 'Migraña, cicatrices, ATM',
        motivacion: 'Busco aliviar el dolor persistente con intervenciones precisas y poco invasivas.',
      },
      {
        nombres: 'Ricardo',
        apellidos: 'Mejía Palacio',
        especialidad: 'Quiropraxia',
        horarioAtencion: 'Miércoles a domingo 8:00-16:00',
        aniosExperiencia: 14,
        bibliografia: 'Quiropráctico certificado en biomecánica de hombro y cadera.',
        imagen: 'imagenes/medicos/andres.jpg',
        subespecialidades: 'Cervicalgia, cadera, teletrabajo',
        motivacion: 'Una columna estable cambia cómo estudias, trabajas y descansas.',
      },
      {
        nombres: 'Valentina',
        apellidos: 'Quintero Paz',
        especialidad: 'Fisioterapia',
        horarioAtencion: 'Martes a sábado 6:30-14:30',
        aniosExperiencia: 9,
        bibliografia: 'Fisioterapeuta de alto rendimiento y readaptación ACL.',
        imagen: 'imagenes/medicos/camila.jpg',
        subespecialidades: 'Ligamentos, tobillo, running',
        motivacion: 'Regresar al deporte es posible si el plan respeta los tiempos del tejido.',
      },
      {
        nombres: 'Esteban',
        apellidos: 'Muñoz Riascos',
        especialidad: 'Nutrición y Dietética Terapéutica',
        horarioAtencion: 'Martes y jueves 11:00-19:00',
        aniosExperiencia: 8,
        bibliografia: 'Nutricionista clínico en hipertensión y síndrome metabólico.',
        imagen: 'imagenes/medicos/julian.jpg',
        subespecialidades: 'Presión arterial, lípidos, cocina local',
        motivacion: 'La dieta funciona cuando cabe en el mercado del barrio.',
      },
      {
        nombres: 'Patricia',
        apellidos: 'Salazar Vélez',
        especialidad: 'Medicina general',
        horarioAtencion: 'Lunes a viernes 7:30-13:00 y 15:00-18:30',
        aniosExperiencia: 16,
        bibliografia: 'Médica familiar con énfasis en prevención universitaria.',
        imagen: 'imagenes/medicos/sofia.jpg',
        subespecialidades: 'Chequeo anual, crónicos, vacunación',
        motivacion: 'Detectar a tiempo ahorra tratamientos largos y costosos.',
      },
      {
        nombres: 'Camilo',
        apellidos: 'Arango Duque',
        especialidad: 'Psicología',
        horarioAtencion: 'Lunes, miércoles y viernes 9:00-18:00',
        aniosExperiencia: 7,
        bibliografia: 'Psicólogo clínico en burnout, sueño y adherencia terapéutica.',
        imagen: 'imagenes/medicos/diego.jpg',
        subespecialidades: 'Estrés, insomnio, motivación',
        motivacion: 'Un plan de salud se sostiene solo si la mente también descansa.',
      },
      {
        nombres: 'Isabel',
        apellidos: 'Peña Cardona',
        especialidad: 'Fisioterapia',
        horarioAtencion: 'Lunes a viernes 13:00-19:00',
        aniosExperiencia: 6,
        bibliografia: 'Especialista en vestibulología y equilibrio del adulto mayor.',
        imagen: 'imagenes/medicos/elena.jpg',
        subespecialidades: 'Mareo, equilibrio, caídas',
        motivacion: 'Caminar sin miedo es una meta tan válida como correr un 5K.',
      },
      {
        nombres: 'Tomás',
        apellidos: 'Benavides Lasso',
        especialidad: 'Nutrición y Dietética Terapéutica',
        horarioAtencion: 'Sábados 8:00-15:00',
        aniosExperiencia: 5,
        bibliografia: 'Nutricionista vegetariano y de intolerancias alimentarias.',
        imagen: 'imagenes/medicos/martin.jpg',
        subespecialidades: 'Plant-based, colon irritable, energía',
        motivacion: 'Comer rico y sentirse bien no tienen que ser caminos opuestos.',
      },
    ];

    iniciales.forEach((medico) =>
      this.registrar(
        medico.nombres,
        medico.apellidos,
        medico.especialidad,
        medico.horarioAtencion,
        medico.aniosExperiencia,
        medico.bibliografia,
        medico.imagen,
        medico.subespecialidades,
        medico.motivacion
      )
    );
  }
}
