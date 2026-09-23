# Mi Agenda

🔗 **Producción:** https://matecode-tasks-tau.vercel.app/

## Descripción del proyecto

Mi Agenda es una SPA de gestión de tareas con vista de planificador semanal. Permite crear, editar y eliminar tareas organizadas por día, con niveles de prioridad (baja / media / alta) codificados por color y fechas de vencimiento. Toda la información se sincroniza en tiempo real contra la base de datos, y el acceso está protegido por autenticación de usuario.

**Funcionalidades principales:**
- Registro e inicio de sesión (email/contraseña y Google)
- CRUD completo de tareas con sincronización en tiempo real
- Vista semanal por columnas de día
- Prioridades visuales (baja/media/alta)
- Fechas de vencimiento y frases motivacionales

## Stack tecnológico

- **Frontend:** React + TypeScript (Vite)
- **Backend / datos:** Firebase (Firestore + Authentication)
- **Deploy:** Vercel
- **Testing:** Vitest

## Decisiones arquitectónicas

- **Organización por capas**: `services/` (acceso a Firebase) separado de `hooks/` (estado de React) y de los componentes de UI, para poder testear cada capa por separado.
- **Context API**: centraliza el usuario logueado y evita pasar props manualmente por toda la app.
- **Firestore con `onSnapshot`**: sincronización en tiempo real, la UI se actualiza sola tras crear, editar o eliminar tareas.
- **Reglas de seguridad en Firestore**: cada usuario solo puede leer/escribir sus propias tareas, validado del lado del servidor (no solo en el frontend).
- **TypeScript**: tipado de los modelos de datos para reducir errores en desarrollo.
- **Mobile-first**: estilos base para celular, con `@media queries` que amplían el layout en pantallas grandes.

## Instalación

```bash
git clone https://github.com/valefresia/matecode-tasks.git

# 2. Ingresar a la carpeta del proyecto
cd matecode-tasks

# 3. Instalar dependencias
npm install
```

Crear un archivo `.env` en la raíz basado en `.env.example` (ver sección siguiente) y luego:

```bash
npm run dev
```

Para correr los tests:

```bash
npm run test
```

## Variables de entorno

Todas las variables usan el prefijo `VITE_` (requerido por Vite para exponerlas al cliente). Se obtienen desde la consola de Firebase del proyecto:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
## Flujo de envío de emails

**Estado: en definición con el equipo docente.**

La app contempla notificaciones por email (ej. recordatorios de vencimiento de tareas) usando AWS SES. La integración está pendiente de confirmación sobre el proveedor a utilizar, ya que AWS SES requiere datos de facturación para salir de sandbox. En cuanto se defina, esta sección se actualiza con: proveedor final, trigger de envío (ej. Cloud Function al crear/actualizar tarea) y formato del email.

## Uso de IA en el proceso de desarrollo

Documentación detallada del proceso de trabajo con IA, casos donde fue más efectiva, y buenas prácticas identificadas:

🔗 (https://drive.google.com/drive/folders/1kZESx_qCTHDatftRnkMD8G75gbiRU40A)