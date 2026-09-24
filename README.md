# Clínica Unicauca

Aplicación web desarrollada con **Angular 22** para la gestión de servicios de una clínica. 
Permite a los usuarios explorar médicos por especialidad, registrarse como pacientes y 
agendar citas médicas a través de una interfaz moderna y responsiva.

## Funcionalidades principales
- 🏥 Visualización de médicos organizados por especialidad
- 📅 Módulo de agendamiento de citas (modal de reserva)
- 👤 Registro de pacientes
- 🖼️ Carrusel informativo y sección de productos/servicios
- 🧭 Barra de navegación y footer institucional

## Tecnologías utilizadas
- **Angular** ^22.1.0
- **Bootstrap** 5.3 + Bootstrap Icons
- **TypeScript** ~6.0
- **RxJS**

## Estructura del proyecto
- `componentes/` — componentes reutilizables (navbar, carrusel, footer, modal de citas, etc.)
- `modelos/` — interfaces de datos (Cita, Médico, Paciente, Especialidad)
- `servicios/` — servicios para lógica de citas, médicos, pacientes y validaciones

## Instalación y ejecución
```bash
npm install
ng serve
```
