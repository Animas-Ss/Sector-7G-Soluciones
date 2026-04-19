# PLAN DE TRABAJO - Sector 7G - CRUD Talento Evolutivo S.A.

## Consigna
Desarrollo de un CRUD con interacciones entre módulos.

**Contexto general**

Un CRUD (Create, Read, Update, Delete) permite gestionar datos de manera básica. En sistemas más completos, los diferentes módulos CRUD pueden interactuar entre sí, formando relaciones que reflejan procesos de negocio más complejos.

**Ejemplo de interacción genérica:**
  - Un pedido pertenece a un cliente y puede contener varios productos.
  - Una reserva se asocia a un usuario y a un servicio.
  - Un empleado puede estar asignado a varias tareas o proyectos.

**Requerimientos funcionales genéricos con interacciones**

- A. Crear registro
  - Cada módulo debe poder crear registros propios (Ej: cliente, producto, pedido, etc.).
  - Algunos registros pueden requerir referencias a otros módulos:
    - Al crear un pedido, se debe seleccionar un cliente existente y productos disponibles.
  - Validar que los datos obligatorios estén completos y que las referencias a otros módulos sean válidas.
- B. Leer registros
  - Se puede listar información de un módulo incluyendo datos relacionados de otros módulos:
    - Mostrar un pedido junto con el nombre del cliente y la lista de productos.
    - Mostrar una reserva con el usuario y el servicio asociado.
- C. Actualizar registro
  - Permitir modificar datos propios y referencias a otros módulos:
    - Cambiar productos de un pedido.
    - Reasignar una reserva/pago/servicio/otros a otro usuario.
  - Verificar que las referencias actualizadas existan.
- D. Eliminar registro
  - Al eliminar un registro, considerar dependencias entre módulos:
    - No eliminar un cliente que tenga pedidos activos. Tener en cuenta que a veces no es eliminar sino bloquear, desactivar, etc.
    - Permitir eliminar un producto solo si no está en ningún pedido activo.

**Flujo de trabajo genérico con interacciones**
1.	Alta de registro: Se crea un registro, con referencias a otros módulos si aplica.
2.	Consulta de registros: Se visualizan los registros y, opcionalmente, información relacionada de otros módulos.
3.	Modificación del registro: Se actualiza la información y relaciones con otros módulos.
4.	Baja del registro: Se elimina un registro, verificando que no existan dependencias críticas.

Este flujo refleja cómo un sistema real maneja múltiples entidades relacionadas, evitando inconsistencias y permitiendo un control integral de las operaciones del negocio.

**Se evaluará**
- Mantener cada módulo CRUD que sea mantenible
- Enseñar buenas prácticas:
  - Validación de datos.
  - Manejo de errores si las referencias no existen.
- Separación modular: cada CRUD en su propio archivo (modelo, controlador, rutas).
- Esta estructura prepara a los estudiantes para manejar bases de datos relacionales o NoSQL más adelante.
- Todo el equipo deberá hacer una breve grabación con el funcionamiento y explicación de 10 minutos.

---

### **Caso 1: Consultora HR "Talento Evolutivo S.A."**

Se propone desarrollar un sistema para la consultora Talento Evolutivo S.A., dedicada a la gestión de liquidación de haberes para más de 50 empresas clientes, que actualmente presenta problemas derivados de la dispersión de la información, el uso de planillas manuales y la falta de indicadores estratégicos para la toma de decisiones. 
El objetivo del trabajo es diseñar e implementar un sistema que permita registrar empresas, empleados, novedades laborales, liquidaciones y socios, organizar la información del proceso de novedades, detectar errores frecuentes del circuito administrativo y generar un resumen con información relevante para la toma de decisiones institucionales.
El sistema deberá registrar el estado de las novedades (pendiente, procesada o rechazada), permitir la consulta de información filtrada por empresa o por estado, simular el impacto organizacional e incorporar un módulo de auditoría. Además, deberá generarse un resumen que muestre indicadores básicos como la cantidad de empresas activas, novedades pendientes y carga operativa estimada.
El sistema deberá organizarse siguiendo una arquitectura modular, validar datos obligatorios evitando registros incompletos o inconsistentes, responder utilizando códigos HTTP adecuados y diseñarse con criterios de mantenibilidad y escalabilidad. **El sistema deberá contar con un frontend de vistas server-side utilizando Pug**, integrando los módulos mediante formularios y listados que consuman los servicios ya implementados. La implementación deberá reflejar buenas prácticas de desarrollo orientadas a la construcción de sistemas reales y sostenibles en entornos organizacionales complejos. 

---

### **Sebastián Sosa** (`Animas-Ss`):

- [x] Revisión del README principal (`README.md`)
- [x] Estructura base de autenticación: `auth.routes.js`, `auth.controllers.js`, `auth.services.js`, `auth.models.js` (esqueleto)
- [x] Simplificación de `index.js` (configuración básica sin middleware de errores)
- [x] Archivos placeholder (`index.txt`) en `config/`, `libs/`, `middlewares/`, `interfaces/`
- [ ] Configurar Pug en Express (`app.set('view engine', 'pug')`, carpeta `views/`)
- [ ] Layout base (`views/layout.pug`): navbar con links a todos los módulos, bloque de contenido
- [ ] Vista inicio (`views/index.pug`): bienvenida con links a cada sección
- [ ] Vistas de Empresas: listado (`views/empresas/index.pug`), detalle (`views/empresas/detalle.pug`), formulario alta/edición (`views/empresas/form.pug`)
- [ ] Vista de Reporte/Resumen (`views/reporte/resumen.pug`): mostrar indicadores y tabla de impacto por empresa
- [ ] Actualizar `empresa.controller.js` y `reporte.controller.js` para renderizar vistas Pug

---

### **Florencia Marcazzo** (`Floh2023`):

- [x] Arquitectura completa del backend (primer commit en `dev`)
- [x] Módulo Empresa: modelo, controller, service, db, rutas con validaciones
- [x] Módulo Empleado: modelo, controller, service, db, rutas con validaciones cruzadas
- [x] Módulo Novedad: modelo, controller, service, db, rutas, validación de estados y relación empleado-empresa
- [x] Módulo Seguimiento: modelo, controller, service, db, rutas
- [x] Módulo Auditoría: model, service, controller, rutas (registra creación, modificación, baja lógica, cambio de estado)
- [x] Módulo Reporte: service, controller, rutas (`/resumen` con indicadores y simulación de impacto)
- [x] Capa de persistencia en JSON: `json.store.js` con `getAll`, `getById`, `create`, `update`, `remove` (soft delete)
- [x] Middlewares: `error.middleware.js` (manejo centralizado de errores) y `validation.middleware.js` (`requireFields`, `requireBody`)
- [x] Libs: `errors.js` (`AppError`, `badRequest`, `notFound`), `asyncHandler.js`, `time.js`
- [x] Configuración centralizada: `app.config.js` (`PORT`, `DATA_DIR`, `NOVEDAD_ESTADOS`)
- [x] Datos semilla: `empresas.json`, `empleados.json`, `novedades.json`, `seguimiento.json`, `auditoria.json`
- [x] Documentación del API en `backend/README.md` (endpoints, ejemplos curl, arquitectura)

---

### **Andrea Maccan** (`amaccan`):

- [ ] Módulo Liquidaciones: modelo (`liquidacion.js`)
- [ ] Módulo Liquidaciones: capa de persistencia (`liquidacion.db.js` + `liquidaciones.json` con datos semilla)
- [ ] Módulo Liquidaciones: service (`liquidacion.service.js`) con validaciones cruzadas (empresa y empleado deben existir y estar activos)
- [ ] Módulo Liquidaciones: controller (`liquidacion.controller.js`) y rutas (`liquidacion.routes.js`) con CRUD completo
- [ ] Registrar auditoría en creación, modificación y baja lógica de liquidaciones
- [ ] Conectar el router de liquidaciones en `index.routes.js`
- [ ] Vistas de Liquidaciones: listado (`views/liquidaciones/index.pug`), detalle (`views/liquidaciones/detalle.pug`), formulario alta/edición (`views/liquidaciones/form.pug`)
- [ ] Actualizar `liquidacion.controller.js` para renderizar vistas Pug

---

### **Cecilia Gómez** (``):

- [ ] Módulo Socios: modelo (`socio.js`)
- [ ] Módulo Socios: capa de persistencia (`socio.db.js` + `socios.json` con datos semilla)
- [ ] Módulo Socios: service (`socio.service.js`) con validaciones (DNI/CUIT único, baja lógica sin eliminar si tiene dependencias)
- [ ] Módulo Socios: controller (`socio.controller.js`) y rutas (`socio.routes.js`) con CRUD completo
- [ ] Registrar auditoría en creación, modificación y baja lógica de socios
- [ ] Conectar el router de socios en `index.routes.js`
- [ ] Vistas de Socios: listado (`views/socios/index.pug`), detalle (`views/socios/detalle.pug`), formulario alta/edición (`views/socios/form.pug`)
- [ ] Actualizar `socio.controller.js` para renderizar vistas Pug

---

### **Guillermo Aybar** (``):

- [ ] Vistas de Empleados: listado (`views/empleados/index.pug`), detalle (`views/empleados/detalle.pug`), formulario alta/edición (`views/empleados/form.pug`)
- [ ] Vistas de Novedades: listado con filtros de estado y empresa (`views/novedades/index.pug`), detalle con seguimientos (`views/novedades/detalle.pug`), formulario (`views/novedades/form.pug`)
- [ ] Vistas de Auditoría: listado con filtros (`views/auditoria/index.pug`)
- [ ] Actualizar `empleado.controller.js`, `novedad.controller.js` y `auditoria.controller.js` para renderizar vistas Pug
- [ ] QA: probar todos los endpoints y vistas con casos válidos e inválidos
- [ ] QA: verificar validaciones cruzadas entre módulos (empresa→empleado→novedad→seguimiento)
- [ ] Integración: merge de `dev` → `main` incluyendo todos los módulos y vistas
- [ ] Verificar que el servidor levanta correctamente con `npm start` tras el merge
- [ ] Coordinar y grabar el video grupal de 10 minutos

---

## VIDEO - Responsabilidad Grupal (10 minutos)

- [ ] Grabar demostración del flujo completo:
  - Crear empresa → Registrar empleados → Registrar novedades → Ver seguimiento → Ver reportes
- [ ] Mostrar: Estados de novedades (Pendiente → Procesada → Rechazada)
[ ] Mostrar: Integración entre módulos (empresa-empleado-novedad-liquidación-socios)
[ ] Mostrar: Auditoría registrando todos los cambios
[ ] Explicar: Arquitectura modular y buenas prácticas
[ ] Explicar: Manejo de errores y validaciones
[ ] Editar video (máximo 10 minutos)
[ ] Publicar/compartir

---

## ACCIONABLES CLAVE POR MÓDULO

- EMPRESA: ✅ Florencia
- EMPLEADO: ✅ Florencia
- NOVEDAD: ✅ Florencia
- SEGUIMIENTO: ✅ Florencia
- AUDITORÍA: ✅ Florencia
- REPORTE: ✅ Florencia
- LIQUIDACIÓN: 🔲 Andrea
- SOCIOS: 🔲 Cecilia
- QA/VALIDACIÓN: 🔲 Guillermo

---

## DISTRIBUCIÓN FINAL

| Integrante | Módulos | % Completado | Accionables Pendientes |
|------------|---------|--------------|------------------------|
| Sebastián Sosa | Auth (base), README, Setup Pug, Vistas Empresas + Reporte | 25% | Setup Pug + 4 vistas + actualizar controllers |
| Florencia Marcazzo | Empresa, Empleado, Novedad, Seguimiento, Auditoría, Reporte | 100% | — |
| Andrea Maccan | Liquidaciones + Vistas Liquidaciones | 0% | CRUD completo + auditoría + 3 vistas |
| Cecilia Gómez | Socios + Vistas Socios | 0% | CRUD completo + auditoría + 3 vistas |
| Guillermo Aybar | Vistas Empleados, Novedades, Auditoría + QA + Integración + Video | 0% | 7 vistas + testing + merge + video |
| **TODOS** | **VIDEO** | **0%** | Grabar y editar demostración |


