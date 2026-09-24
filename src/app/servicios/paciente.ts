import { Injectable } from '@angular/core';
import { Paciente } from '../modelos/paciente';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private siguienteId = 1;
  private readonly pacientes: Paciente[] = [];

  registrarPaciente(
    nombres: string,
    apellidos: string,
    documento: string,
    correo: string,
    telefono: string,
    fechaNacimiento: string,
    sexo: string
  ): Paciente {
    const paciente: Paciente = {
      id: this.siguienteId++,
      nombres,
      apellidos,
      documento,
      correo,
      telefono,
      fechaNacimiento,
      sexo,
    };
    this.pacientes.push(paciente);
    return paciente;
  }

  listarPacientes(): Paciente[] {
    return [...this.pacientes];
  }
}
