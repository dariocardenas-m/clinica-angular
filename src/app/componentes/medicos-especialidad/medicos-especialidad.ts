import { Component } from '@angular/core';
import { Especialidad } from '../../modelos/especialidad';
import { Medico } from '../../modelos/medico';
import { MedicoService } from '../../servicios/medico';
import { ModalCita } from '../modal-cita/modal-cita';

@Component({
  imports: [ModalCita],
  selector: 'app-medicos-especialidad',
  styleUrl: './medicos-especialidad.css',
  templateUrl: './medicos-especialidad.html',
})
export class MedicosEspecialidad {
  especialidades: Especialidad[] = [];
  especialidadActiva = '';
  descripcionEspecialidad = '';
  medicos: Medico[] = [];
  todosLosMedicos: Medico[] = [];
  medicoSeleccionadoSidebar: number | null = null;
  modalVisible = false;
  medicoSeleccionadoId: number | null = null;

  constructor(private readonly medicoService: MedicoService) {
    this.especialidades = this.medicoService.especialidades;
    this.todosLosMedicos = this.medicoService.listarMedicos();
    this.seleccionarEspecialidad(this.especialidades[0].nombre);
  }

  seleccionarEspecialidad(nombre: string): void {
    this.especialidadActiva = nombre;
    this.medicoSeleccionadoSidebar = null;
    const especialidad = this.especialidades.find((item) => item.nombre === nombre);
    this.descripcionEspecialidad = especialidad?.descripcion ?? '';
    this.medicos = this.medicoService.listarPorEspecialidad(nombre);
  }

  mostrarTodosLosMedicos(): void {
    this.especialidadActiva = 'Todos';
    this.medicoSeleccionadoSidebar = null;
    this.descripcionEspecialidad =
      'Plantilla completa del campus: 8 profesionales de seis áreas, listos para consulta presencial o virtual.';
    this.medicos = this.medicoService.listarMedicos();
  }

  seleccionarMedicoDeLista(medico: Medico): void {
    this.mostrarTodosLosMedicos();
    this.medicoSeleccionadoSidebar = medico.id;
  }

  abrirCita(medicoId: number): void {
    this.medicoSeleccionadoId = medicoId;
    this.modalVisible = true;
  }

  cerrarCita(): void {
    this.modalVisible = false;
  }
}
