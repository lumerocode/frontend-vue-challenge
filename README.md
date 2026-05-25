# Kambista Frontend Challenge
Proyecto desarrollado como solución técnica para un flujo de onboarding y operaciones de cambio de divisas, implementado con el stack moderno de `Nuxt 4, Vue 3 y Tailwind CSS.`

## Arquitectura del Proyecto

- `app/` - Directorio raíz del frontend.
  - `app/pages/` - Definición de rutas y vistas de la aplicación.
  - `app/components/` - Componentes reutilizables y específicos del dashboard.
  - `app/layouts/` - Estructuras base para autenticación, onboarding y panel administrativo.
  - `app/server/api/` - Endpoints de API implementados con Nitro para simulación de servicios.
  - `app/assets/css/tailwind.css` - Definición de estilos globales y utilidades de diseño.
- `mocks/` - Repositorio de datos estáticos en formato JSON.
- `app/stores/` - Gestión de estado global mediante Pinia.
- `app/utils/` - Capa de utilidades, validaciones y helpers transversales.

## Decisiones Técnicas

- **Framework:** `Nuxt 4` con `app/` como carpeta principal y `app/server/api/` para endpoints Nitro.
- **Lógica:** `Vue 3 Composition API y TypeScript` para lógica de componentes, páginas y asegurar robustez en el tipado.
- **Estilos:** `Tailwind CSS` para estilos utilitarios.
- **Estado:** `Pinia` para el estado de autenticación y manejo compartido.
- **Mock API local**: Implementación de endpoints locales con simulación de comportamiento serverless.
- **Importación directa de JSON**: los endpoints de `mocks/` importan archivos JSON directamente para que funcionen en entornos serverless como Netlify.
- **Rutas y alias**: `@/*` apunta a `./app/*`, por lo que las importaciones usan `@/components/...` y similares.
- **Carga artificial** en los botones principales para simular espera de red.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Para producción local:

```bash
npm run build
npm run preview
```

## Demo y Accesos

La aplicación ya está desplegada en Netlify y se puede ver en:

- https://frontend-vue-challenge-kambista.netlify.app/

## Credenciales de acceso

- **Correo**: `usuario@kambista.com`
- **Contraseña**: `Password1`

> El login es mock y valida contra los valores definidos en `app/utils/auth-validation.ts`.

## Cupón válido

- **Código de cupón**: `RETOKAMBISTA`

Este código se aplica en el componente `app/components/dashboard/ExchangeCalculator.vue` y muestra un mensaje de éxito cuando se ingresa correctamente.

## Validaciones y errores conocidos

El flujo de usuario contempla validaciones de integridad de datos en formularios:

### Login
- El correo debe tener un formato válido.
- La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.

### Perfil / onboarding
- `DNI` debe tener exactamente 8 dígitos.
- `CE` debe tener exactamente 9 dígitos.
- `Pasaporte` debe tener entre 8 y 15 caracteres alfanuméricos.
- `Celular` debe tener exactamente 9 dígitos.
- La fecha de nacimiento debe estar en formato `DD/MM/AAAA`, no puede ser futura y el usuario debe ser mayor de edad.

### Valores que provocan errores específicos
Estos valores están mapeados en `app/server/api/profile/complete.post.ts` para simular errores de registro:

- DNI duplicado: `11111111`
- Celular duplicado: `911111111`
- Nombre que contiene `servidor` → provoca error de servidor simulado.

## Consideraciones Adicionales
- **Persistencia:** Entorno stateless; los datos de los mocks se reinician al reiniciar el servidor.
- **Data:**Los datos de cuentas bancarias y fondos se extraen desde `mocks/*.json`.
- **Entornos:** Configuración preparada para despliegues serverless sin dependencias de sistemas de archivos, por lo que no se usan `fs.writeFile` ni rutas de archivo dinámicas en los endpoints.
