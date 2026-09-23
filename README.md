# Mi Agenda

🔗 Producción: https://matecode-tasks-tau.vercel.app/

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

- **Firestore + `onSnapshot`**: se eligió sincronización en tiempo real en lugar de fetch manual, para que los cambios de tareas se reflejen al instante sin recargar ni pollear.
- **Separación por capas**: `services/` (lógica de acceso a Firebase, ej. `authService.ts` y `taskService.ts`) desacoplada de `hooks/` (`useAuth.ts`, `useTasks.ts`) y de los componentes de UI, para que la lógica de negocio no dependa de React.
- **Context API para auth**: `AuthContext` centraliza el estado de sesión y evita prop drilling entre rutas protegidas.
- **`ProtectedRoute`**: guard de rutas a nivel de router, no de componente, para que el control de acceso sea consistente en toda la app.
- **TypeScript**: tipado estático para reducir errores en tiempo de desarrollo, especialmente en los modelos de tarea y usuario.
- **Vite**: elegido por tiempos de build y HMR más rápidos frente a alternativas como CRA.

> _Completá o ajustá esta sección si tomaste alguna decisión adicional que quieras poder defender en la evaluación._

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

> _Verificá que estos nombres coincidan exactamente con tu `.env.example` — ajustá si usaste otros._

## Flujo de envío de emails

**Estado: en definición con el equipo docente.**

La app contempla notificaciones por email (ej. recordatorios de vencimiento de tareas) usando AWS SES. La integración está pendiente de confirmación sobre el proveedor a utilizar, ya que AWS SES requiere datos de facturación para salir de sandbox. En cuanto se defina, esta sección se actualiza con: proveedor final, trigger de envío (ej. Cloud Function al crear/actualizar tarea) y formato del email.

## Uso de IA en el proceso de desarrollo

Documentación detallada del proceso de trabajo con IA, casos donde fue más efectiva, y buenas prácticas identificadas:

🔗 **[Completar con el link a la documentación de IA]**