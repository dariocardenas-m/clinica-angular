import { Injectable } from '@angular/core';
import { Cita } from '../modelos/cita';
import { MedicoService } from './medico';
import { PacienteService } from './paciente';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private siguienteId = 1;
  private readonly citas: Cita[] = [];

  constructor(
    private readonly medicoService: MedicoService,
    private readonly pacienteService: PacienteService
  ) {}

  registrarCita(
    fecha: string,
    horaInicio: string,
    horaFin: string,
    medicoId: number,
    pacienteId: number,
    motivo: string,
    modalidad: string,
    correoConfirmacion: string
  ): Cita {
    if (horaFin <= horaInicio) {
      throw new Error('La hora de fin debe ser mayor a la hora de inicio');
    }

    const medico = this.medicoService.buscarPorId(medicoId);
    const paciente = this.pacienteService.listarPacientes().find((item) => item.id === pacienteId);

    if (!medico) {
      throw new Error('Médico no encontrado');
    }
    if (!paciente) {
      throw new Error('Debe registrarse como usuario antes de agendar');
    }

    const cita: Cita = {
      id: this.siguienteId++,
      fecha,
      horaInicio,
      horaFin,
      medico: `${medico.nombres} ${medico.apellidos}`,
      paciente: `${paciente.nombres} ${paciente.apellidos}`,
      motivo,
      modalidad,
      correoConfirmacion,
    };
    this.citas.push(cita);
    return cita;
  }

  listarCitas(): Cita[] {
    return [...this.citas];
  }
}
