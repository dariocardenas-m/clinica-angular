import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Validacion {
  campoObligatorio(valor: string, mensaje: string): string {
    return valor.trim() === '' ? mensaje : '';
  }

  longitud(valor: string, min: number, max: number, mensaje: string): string {
    const longitud = valor.trim().length;
    if (longitud < min || longitud > max) {
      return mensaje;
    }
    return '';
  }

  textoConLongitud(
    valor: string,
    min: number,
    max: number,
    mensajeObligatorio: string,
    mensajeLongitud: string
  ): string {
    const obligatorio = this.campoObligatorio(valor, mensajeObligatorio);
    if (obligatorio) {
      return obligatorio;
    }
    return this.longitud(valor, min, max, mensajeLongitud);
  }

  correo(valor: string, mensajeObligatorio: string, mensajeFormato: string): string {
    const obligatorio = this.campoObligatorio(valor, mensajeObligatorio);
    if (obligatorio) {
      return obligatorio;
    }
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formatoCorreo.test(valor.trim()) ? '' : mensajeFormato;
  }

  correosIguales(correo: string, confirmar: string, mensaje: string): string {
    return correo.trim() !== confirmar.trim() ? mensaje : '';
  }

  documento(valor: string): string {
    const obligatorio = this.campoObligatorio(valor, 'El documento es obligatorio');
    if (obligatorio) {
      return obligatorio;
    }
    return /^\d{6,12}$/.test(valor.trim())
      ? ''
      : 'El documento debe tener entre 6 y 12 dígitos';
  }

  telefono(valor: string): string {
    const obligatorio = this.campoObligatorio(valor, 'El teléfono es obligatorio');
    if (obligatorio) {
      return obligatorio;
    }
    return /^\d{7,10}$/.test(valor.trim())
      ? ''
      : 'El teléfono debe tener entre 7 y 10 dígitos';
  }

  horaFinMayor(horaInicio: string, horaFin: string, mensaje: string): string {
    if (!horaInicio || !horaFin) {
      return '';
    }
    return horaFin <= horaInicio ? mensaje : '';
  }
}
