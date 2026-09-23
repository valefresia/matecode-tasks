Mi Agenda
Task manager full-stack desarrollado como Proyecto Integrador del Módulo 4 de Henry Bootcamp, bajo la identidad de empresa ficticia MateCode.

🔗 Producción: https://matecode-tasks-tau.vercel.app/

Descripción del proyecto
Mi Agenda es una SPA de gestión de tareas con vista de planificador semanal. Permite crear, editar y eliminar tareas organizadas por día, con niveles de prioridad (baja / media / alta) codificados por color y fechas de vencimiento. Toda la información se sincroniza en tiempo real contra la base de datos, y el acceso está protegido por autenticación de usuario.

Funcionalidades principales:

Registro e inicio de sesión (email/contraseña y Google)
CRUD completo de tareas con sincronización en tiempo real
Vista semanal por columnas de día
Prioridades visuales (baja/media/alta)
Fechas de vencimiento y frases motivacionales
Stack tecnológico
Frontend: React + TypeScript (Vite)
Backend / datos: Firebase (Firestore + Authentication)
Deploy: Vercel
Testing: Vitest
Decisiones arquitectónicas
Firestore + onSnapshot: se eligió sincronización en tiempo real en lugar de fetch manual, para que los cambios de tareas se reflejen al instante sin recargar ni pollear.
Separación por capas: services/ (lógica de acceso a Firebase, ej. authService.ts y taskService.ts) desacoplada de hooks/ (useAuth.ts, useTasks.ts) y de los componentes de UI, para que la lógica de negocio no dependa de React.
Context API para auth: AuthContext centraliza el estado de sesión y evita prop drilling entre rutas protegidas.
ProtectedRoute: guard de rutas a nivel de router, no de componente, para que el control de acceso sea consistente en toda la app.
TypeScript: tipado estático para reducir errores en tiempo de desarrollo, especialmente en los modelos de tarea y usuario.
Vite: elegido por tiempos de build y HMR más rápidos frente a alternativas como CRA.
Sin carpeta functions/ ni /api: no se agregó backend serverless porque la integración con AWS SES no llegó a habilitarse (ver Flujo de envío de emails). El resto de la persistencia se resuelve directo contra Firestore desde el cliente, protegido por Security Rules.
Firestore Security Rules con ownership: allow read/update/delete valida resource.data.userId == request.auth.uid; allow create valida request.resource.data.userId == request.auth.uid (no puede usar resource.data porque el documento aún no existe).
Completá o ajustá esta sección si tomaste alguna decisión adicional que quieras poder defender en la evaluación.

Instalación
git clone https://github.com/valefresia/matecode-tasks.git
cd matecode-tasks
npm install
Crear un archivo .env en la raíz basado en .env.example (ver sección siguiente) y luego:

npm run dev
Para correr los tests:

npm run test
Variables de entorno
Todas las variables usan el prefijo VITE_ (requerido por Vite para exponerlas al cliente). Se obtienen desde la consola de Firebase del proyecto:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
Verificá que estos nombres coincidan exactamente con tu .env.example — ajustá si usaste otros.

Flujo de envío de emails
Estado: implementación frontend-only (mock), sin envío real.

El botón "Enviar mi resumen" está implementado en Tasks.tsx como demo visual: al hacer clic, cambia el estado local a "Resumen enviado con éxito" durante unos segundos, pero no dispara ningún request ni envía un email real.

La integración con AWS SES vía Vercel Functions (/api) quedó fuera de alcance: la cuenta de AWS presentó problemas que impidieron habilitar SES a tiempo. Esto fue consultado y acordado con el equipo docente, que confirmó que el proyecto puede entregarse así.

Si se retomara, el flujo planeado sería: botón → Vercel Function (/api/send-summary) → arma el resumen de tareas del usuario → invoca AWS SES con credenciales como variables de entorno (nunca expuestas en el frontend) → responde éxito/error a la UI.

Uso de IA en el proceso de desarrollo
Documentación detallada del proceso de trabajo con IA, casos donde fue más efectiva, y buenas prácticas identificadas:

🔗(https://drive.google.com/drive/folders/1kZESx_qCTHDatftRnkMD8G75gbiRU40A)
