# Documentación de la API - Talento Evolutivo S.A.

Esta carpeta contiene la documentación de los endpoints de la API en formato **OpenAPI 3.0 (YAML)**.

Cada módulo tiene su propio archivo. Para agregar la documentación de un nuevo módulo, crear un archivo `<nombre-modulo>.yaml` siguiendo la misma estructura, y **referenciarlo en `index.yaml`** (ver sección más abajo).

| Archivo | Módulo | Responsable |
|---|---|---|
| `index.yaml` | Raíz — consolida todos los módulos | — |
| `liquidaciones.yaml` | Liquidaciones | Andrea Maccan |
| `bundle.yaml` | Colección unificada generada (no editar) | — |

---

## Importar TODOS los módulos de una sola vez (recomendado)

Se puede generar un único archivo `bundle.yaml` que consolida todos los módulos:

```bash
npm run docs:bundle
```

Eso genera `docs/bundle.yaml`. Luego importar **ese archivo** en Postman o Thunder Client y tendrás todos los endpoints de todos los módulos en una sola colección.

> `bundle.yaml` es generado automáticamente. No modificarlo a mano ni commitearlo — ya está en `.gitignore`.

---

## Cómo agregar documentación de un nuevo módulo

1. Crear `docs/<modulo>.yaml` con la estructura OpenAPI 3.0.3 del módulo
2. Agregar las rutas del módulo a `docs/index.yaml` bajo `paths:` con `$ref: './<modulo>.yaml#/paths/...'`
3. Agregar los schemas del módulo bajo `components/schemas:` si se quieren exponer globalmente
4. Ejecutar `npm run docs:bundle` para regenerar `bundle.yaml`

---

## Cómo importar en Postman

1. Abrir Postman
2. Ir a **File → Import** (o el botón **Import** en la barra lateral)
3. Seleccionar el archivo `.yaml` del módulo deseado
4. Postman genera automáticamente la colección con todos los endpoints, parámetros y ejemplos
5. Ajustar la variable de entorno `baseUrl` a `http://localhost:3000` si no se setea sola

---

## Cómo importar en Thunder Client (VS Code)

1. Abrir Thunder Client en VS Code
2. Ir a la pestaña **Collections**
3. Click en el ícono de menú → **Import**
4. Seleccionar el archivo `.yaml` correspondiente

---

## Cómo usar con el servidor local

Asegurarse de tener el servidor corriendo antes de probar:

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`.

---

## Estructura de los archivos YAML

Cada archivo sigue el estándar **OpenAPI 3.0.3** e incluye:

- **paths**: todos los endpoints del módulo con sus métodos HTTP
- **parameters**: query params y path params con tipos y ejemplos
- **requestBody**: body requerido para POST y PUT con campos obligatorios marcados
- **responses**: respuestas posibles por endpoint (`200`, `201`, `400`, `404`, `500`)
- **components/schemas**: definición reutilizable de los objetos de la entidad
- **components/responses**: respuestas de error reutilizables

---

## Convenciones de errores

Todos los errores siguen la misma estructura:

```json
{
  "error": true,
  "statusCode": 400,
  "message": "Descripción del error"
}
```

| Código | Significado |
|---|---|
| `400` | Datos inválidos o restricción de negocio |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |
