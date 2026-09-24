import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../servicios/paciente';
import { Validacion } from '../../servicios/validacion';

@Component({
  imports: [FormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  formulario = {
    nombres: '',
    apellidos: '',
    documento: '',
    correo: '',
    confirmarCorreo: '',
    telefono: '',
    fechaNacimiento: '',
    sexo: '',
    aceptaTerminos: false,
  };

  errores = {
    nombres: '',
    apellidos: '',
    documento: '',
    correo: '',
    confirmarCorreo: '',
    telefono: '',
    fechaNacimiento: '',
    sexo: '',
    aceptaTerminos: '',
  };

  mensajeErrorSubmit = '';
  mensajeExito = '';

  constructor(
    private readonly validacion: Validacion,
    private readonly pacienteService: PacienteService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  validarAlCambiarFoco(campo: keyof typeof this.errores): void {
    this.errores[campo] = this.obtenerError(campo);
    this.cdr.detectChanges();
  }

  registrar(evento: Event): void {
    evento.preventDefault();
    this.mensajeExito = '';
    const esValido = this.validarFormularioAlRegistrar();
    this.cdr.detectChanges();
    if (!esValido) {
      this.mensajeErrorSubmit = 'Hay campos con datos incorrectos';
      alert('Hay campos con datos incorrectos');
      this.cdr.detectChanges();
      return;
    }

    const paciente = this.pacienteService.registrarPaciente(
      this.formulario.nombres.trim(),
      this.formulario.apellidos.trim(),
      this.formulario.documento.trim(),
      this.formulario.correo.trim(),
      this.formulario.telefono.trim(),
      this.formulario.fechaNacimiento,
      this.formulario.sexo
    );

    this.mensajeErrorSubmit = '';
    this.mensajeExito = `Registro confirmado. Enviaremos la confirmación a ${paciente.correo}`;
    alert(`Registro confirmado. Enviaremos la confirmación a ${paciente.correo}`);
    this.limpiarFormulario();
    this.cdr.detectChanges();
  }

  private validarFormularioAlRegistrar(): boolean {
    (Object.keys(this.errores) as Array<keyof typeof this.errores>).forEach((campo) => {
      this.errores[campo] = this.obtenerError(campo);
    });
    return Object.values(this.errores).every((mensaje) => mensaje === '');
  }

  private obtenerError(campo: keyof typeof this.errores): string {
    switch (campo) {
      case 'nombres':
        return this.validacion.textoConLongitud(
          this.formulario.nombres,
          1,
          20,
          'Los nombres son obligatorios',
          'Los nombres deben tener entre 1 y 20 caracteres'
        );
      case 'apellidos':
        return this.validacion.textoConLongitud(
          this.formulario.apellidos,
          1,
          20,
          'Los apellidos son obligatorios',
          'Los apellidos deben tener entre 1 y 20 caracteres'
        );
      case 'documento':
        return this.validacion.documento(this.formulario.documento);
      case 'correo':
        return this.validacion.correo(
          this.formulario.correo,
          'El correo es obligatorio para confirmar su registro',
          'Ingrese un correo electrónico válido'
        );
      case 'confirmarCorreo': {
        const formato = this.validacion.correo(
          this.formulario.confirmarCorreo,
          'Debe confirmar el correo de registro',
          'Ingrese un correo electrónico válido'
        );
        if (formato) {
          return formato;
        }
        return this.validacion.correosIguales(
          this.formulario.correo,
          this.formulario.confirmarCorreo,
          'Los correos no coinciden'
        );
      }
      case 'telefono':
        return this.validacion.telefono(this.formulario.telefono);
      case 'fechaNacimiento':
        return this.validacion.campoObligatorio(
          this.formulario.fechaNacimiento,
          'La fecha de nacimiento es obligatoria'
        );
      case 'sexo':
        return this.formulario.sexo ? '' : 'Debe seleccionar el sexo';
      case 'aceptaTerminos':
        return this.formulario.aceptaTerminos ? '' : 'Debe aceptar los términos para registrarse';
      default:
        return '';
    }
  }

  private limpiarFormulario(): void {
    this.formulario = {
      nombres: '',
      apellidos: '',
      documento: '',
      correo: '',
      confirmarCorreo: '',
      telefono: '',
      fechaNacimiento: '',
      sexo: '',
      aceptaTerminos: false,
    };
    this.errores = {
      nombres: '',
      apellidos: '',
      documento: '',
      correo: '',
      confirmarCorreo: '',
      telefono: '',
      fechaNacimiento: '',
      sexo: '',
      aceptaTerminos: '',
    };
  }
}
