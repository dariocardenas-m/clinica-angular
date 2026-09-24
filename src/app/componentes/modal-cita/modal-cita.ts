import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../modelos/cita';
import { Medico } from '../../modelos/medico';
import { Paciente } from '../../modelos/paciente';
import { CitaService } from '../../servicios/cita';
import { MedicoService } from '../../servicios/medico';
import { PacienteService } from '../../servicios/paciente';
import { Validacion } from '../../servicios/validacion';

@Component({
  imports: [FormsModule],
  selector: 'app-modal-cita',
  styleUrl: './modal-cita.css',
  templateUrl: './modal-cita.html',
})
export class ModalCita implements OnChanges {
  @Input() visible = false;
  @Input() medicoId: number | null = null;
  @Output() cerrar = new EventEmitter<void>();

  medicos: Medico[] = [];
  pacientes: Paciente[] = [];
  citas: Cita[] = [];

  formulario = {
    fecha: '',
    horaInicio: '',
    horaFin: '',
    medicoId: null as number | null,
    pacienteId: null as number | null,
    motivo: '',
    correoConfirmacion: '',
    modalidad: '',
  };

  errores = {
    fecha: '',
    horaInicio: '',
    horaFin: '',
    medicoId: '',
    pacienteId: '',
    motivo: '',
    correoConfirmacion: '',
    modalidad: '',
  };

  constructor(
    private readonly validacion: Validacion,
    private readonly medicoService: MedicoService,
    private readonly pacienteService: PacienteService,
    private readonly citaService: CitaService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    if (this.visible) {
      this.medicos = this.medicoService.listarMedicos();
      this.pacientes = this.pacienteService.listarPacientes();
      this.citas = this.citaService.listarCitas();
      this.formulario.medicoId = this.medicoId;
    }
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

  validarCampo(campo: keyof typeof this.errores): void {
    this.errores[campo] = this.obtenerError(campo);
    this.cdr.detectChanges();
  }

  agregarCita(evento: Event): void {
    evento.preventDefault();
    (Object.keys(this.errores) as Array<keyof typeof this.errores>).forEach((campo) => {
      this.errores[campo] = this.obtenerError(campo);
    });
    this.cdr.detectChanges();
    if (Object.values(this.errores).some((mensaje) => mensaje !== '')) {
      alert('Hay campos con datos incorrectos');
      return;
    }

    try {
      this.citaService.registrarCita(
        this.formulario.fecha,
        this.formulario.horaInicio,
        this.formulario.horaFin,
        Number(this.formulario.medicoId),
        Number(this.formulario.pacienteId),
        this.formulario.motivo.trim(),
        this.formulario.modalidad,
        this.formulario.correoConfirmacion.trim()
      );
      this.citas = this.citaService.listarCitas();
      alert('Cita registrada con éxito');
      this.formulario.fecha = '';
      this.formulario.horaInicio = '';
      this.formulario.horaFin = '';
      this.formulario.motivo = '';
      this.formulario.correoConfirmacion = '';
      this.formulario.modalidad = '';
      this.formulario.pacienteId = null;
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo registrar la cita');
    }
  }

  private obtenerError(campo: keyof typeof this.errores): string {
    switch (campo) {
      case 'fecha':
        return this.validacion.campoObligatorio(this.formulario.fecha, 'La fecha es obligatoria');
      case 'horaInicio':
        return this.validacion.campoObligatorio(this.formulario.horaInicio, 'La hora de inicio es obligatoria');
      case 'horaFin': {
        const obligatorio = this.validacion.campoObligatorio(
          this.formulario.horaFin,
          'La hora de fin es obligatoria'
        );
        if (obligatorio) {
          return obligatorio;
        }
        return this.validacion.horaFinMayor(
          this.formulario.horaInicio,
          this.formulario.horaFin,
          'La hora de fin debe ser mayor a la hora de inicio'
        );
      }
      case 'medicoId':
        return this.formulario.medicoId ? '' : 'Debe seleccionar un médico';
      case 'pacienteId':
        return this.formulario.pacienteId ? '' : 'Debe seleccionar un usuario registrado';
      case 'motivo':
        return this.validacion.textoConLongitud(
          this.formulario.motivo,
          1,
          20,
          'El motivo de la cita es obligatorio',
          'El motivo debe tener entre 1 y 20 caracteres'
        );
      case 'correoConfirmacion':
        return this.validacion.correo(
          this.formulario.correoConfirmacion,
          'El correo de confirmación es obligatorio',
          'Ingrese un correo electrónico válido'
        );
      case 'modalidad':
        return this.formulario.modalidad ? '' : 'Debe seleccionar la modalidad de la cita';
      default:
        return '';
    }
  }
}
