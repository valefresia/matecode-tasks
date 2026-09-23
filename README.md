# Mi Agenda 📅

Task manager full-stack desarrollado como Proyecto Integrador del Módulo 4 de Henry Bootcamp, bajo la identidad de empresa ficticia **MateCode**.

🔗 **Producción:** [https://matecode-tasks-tau.vercel.app/](https://matecode-tasks-tau.vercel.app/)

---

## 📌 Descripción del proyecto

**Mi Agenda** es una Single Page Application (SPA) orientada a la productividad y gestión organizada de tareas diarias y semanales. Permite planificar actividades mediante un planificador visual de 7 días, clasificar prioridades por color (baja, media, alta), asignar fechas límite y consultar frases motivacionales diarias.

El sistema cuenta con persistencia y sincronización en tiempo real sobre base de datos, protegido por autenticación de usuarios por correo/contraseña y proveedor federado (Google).

### Funcionalidades principales:
- 🔐 **Autenticación completa:** Registro e inicio de sesión con email/contraseña y Google Auth mediante Firebase Authentication.
- ⚡ **CRUD de tareas en tiempo real:** Creación, edición, eliminación y cambio de estado de tareas con actualización instantánea mediante listeners reactivos.
- 📆 **Planificador semanal interactivo:** Distribución visual en 7 columnas (Lunes a Domingo) con navegación entre semanas y sección para tareas sin fecha asignada.
- 🎨 **Priorización visual:** Código de color distintivo por prioridad (baja, media, alta) para rápida identificación.
- ✉️ **Demo de resumen:** Acción en cabecera para solicitar el resumen de tareas pendientes.
- 📱 **Diseño responsivo:** Interfaz adaptada a escritorio y dispositivos móviles con estética temática de papel cuadriculado continuo.

---

## 🛠️ Stack tecnológico

- **Frontend:** React 19 + TypeScript (empaquetado y HMR con Vite)
- **Rutas:** React Router DOM (BrowserRouter + Guards)
- **Backend as a Service (BaaS):** Firebase (Cloud Firestore + Authentication)
- **Estilos:** Vanilla CSS moderno con variables CSS, CSS Grid y Flexbox
- **Testing:** Vitest + React Testing Library + jsdom
- **Despliegue & Hosting:** Vercel

---

## 🏛️ Decisiones arquitectónicas

1. **Firestore + `onSnapshot` (Sincronización en tiempo real):**
   En lugar de recurrir a polling o peticiones HTTP manuales tras cada mutación, se emplearon suscripciones activas (`onSnapshot`) de Firestore. Esto garantiza que cualquier cambio en las tareas del usuario se refleje en la UI de forma instantánea sin recargas de página.

2. **Separación de responsabilidades por capas:**
   - **Capa de Servicios (`src/services/`):** Contiene la lógica pura de integración con Firebase (`authService.ts`, `taskService.ts`). Es agnóstica de la interfaz gráfica y de React.
   - **Capa de Estado y Hooks (`src/hooks/`, `src/features/`):** Encapsula el ciclo de vida, listeners y llamadas asíncronas (`useTasks.ts`, `useAuth.ts`, `AuthContext.tsx`).
   - **Capa de UI (`src/components/`, `src/pages/`):** Componentes funcionales enfocados únicamente en la presentación y captura de eventos.

3. **Autenticación centralizada con Context API:**
   `AuthContext` gestiona el estado global de la sesión (`user`, `loading`, `error`), evitando *prop drilling* y proporcionando métodos desacoplados de login, registro, logout y login con Google.

4. **Protección de rutas a nivel Router (`ProtectedRoute`):**
   El control de acceso se implementa como un guard que envuelve los componentes en `AppRouter.tsx`. Esto asegura consistencia ante cualquier intento de navegación directa a rutas privadas sin sesión activa.

5. **Manejo de rutas SPA en Vercel (`vercel.json`):**
   Al desplegar una SPA con `BrowserRouter`, las recargas de página en rutas internas (ej. `/tasks`) provocan un error 404 en servidores estáticos porque el archivo físico no existe en el servidor. Se configuró `vercel.json` con reglas de *rewrite* hacia `/index.html` para delegar el enrutamiento a React Router en el cliente.

6. **Seguridad en base de datos (Firestore Security Rules):**
   La integridad de los datos se delega a reglas de seguridad en Firestore basadas en propiedad (*ownership*):
   - Lecturas, actualizaciones y bajas validan que `resource.data.userId == request.auth.uid`.
   - Creaciones validan que `request.resource.data.userId == request.auth.uid`.

7. **TypeScript estricto:**
   Modelado estricto de tipos de dominio (`Task`, `NewTask`, `User`) para evitar errores en tiempo de ejecución y asegurar contratos de datos consistentes.

---

## 💻 Instalación y ejecución local

### Prerrequisitos:
- Node.js (versión 18 o superior recomendada)
- npm

### Pasos:

```bash
# 1. Clonar el repositorio
git clone https://github.com/valefresia/matecode-tasks.git

# 2. Ingresar a la carpeta del proyecto
cd matecode-tasks

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno (ver siguiente sección)
cp .env.example .env

# 5. Iniciar servidor de desarrollo
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173/` (o el puerto que asigne Vite).

### Ejecución de tests:

```bash
# Ejecutar suite de pruebas unitarias
npm run test
```

---

## 🔑 Variables de entorno necesarias

La aplicación requiere la configuración de las credenciales de Firebase en un archivo `.env` en la raíz del proyecto. Todas las variables llevan el prefijo `VITE_` para que Vite las exponga de forma segura al cliente:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> **Nota:** Estas claves se obtienen en la consola de Firebase dentro de la configuración del proyecto (Project Settings > General > Your apps > SDK setup and configuration).

---

## 🌐 URL de producción

El despliegue continuo está configurado en Vercel vinculado a la rama principal:

🔗 **[https://matecode-tasks-tau.vercel.app/](https://matecode-tasks-tau.vercel.app/)**

---

## 📧 Flujo de envío de emails

### Estado actual:
**Implementación frontend-only (mock visual).**

El botón **"Enviar mi resumen"** situado en la cabecera de la vista de tareas (`Tasks.tsx`) funciona como una demostración de interacción de usuario: al presionarlo, el botón entra en un estado temporal de confirmación visual (*"Resumen enviado con éxito"*) durante unos segundos, sin realizar peticiones HTTP hacia servicios de mensajería externos.

### Justificación de alcance:
La integración completa con **AWS SES** (Simple Email Service) a través de funciones serverless (ej. Vercel Serverless Functions en `/api`) quedó fuera del alcance de esta entrega debido a limitaciones de activación y sandbox en la cuenta de AWS durante el periodo de desarrollo. Esta situación fue consultada y acordada previamente con el equipo docente, acordando la entrega con el flujo simulado a nivel frontend.

### Flujo planeado para producción (Próximos pasos):
En una fase posterior con proveedor habilitado, el flujo completo operaría de la siguiente manera:

```text
[ Usuario ] ---> Clic en "Enviar mi resumen"
                     │
                     ▼
[ Frontend ] ---> POST /api/send-summary (con token JWT de sesión)
                     │
                     ▼
[ Serverless ] -> Valida identidad con Firebase Admin SDK
Function          Consulta tareas pendientes de la semana en Firestore
                     │
                     ▼
[ AWS SES / ] -> Envía email transaccional con plantilla HTML del resumen
  Resend             │
                     ▼
[ Frontend ] <--- Respuesta 200 OK -> Notificación de éxito en la UI
```

---

## 🤖 Uso de IA en el proceso de desarrollo

La inteligencia artificial se integró como un asistente de desarrollo (*pair programming*) a lo largo de todo el ciclo de vida del proyecto, acelerando la toma de decisiones técnicas y la calidad del código final.

### 1. Integración en el proceso de trabajo
- **Generación de estructura base y boilerplate:** Configuración inicial de tipados TypeScript, servicios desacoplados de Firebase y esquemas de contexto para autenticación.
- **Diagnóstico y depuración de despliegue:** Detección de la causa raíz del error 404 al recargar rutas en Vercel (comportamiento de fallback en SPAs con HTML5 History API) y confección de la regla de *rewrites* en `vercel.json`.
- **Refactorización y diseño responsivo:** Ajuste de reglas de CSS Grid (`repeat(7, minmax(0, 1fr))`) para garantizar la visualización íntegra de los 7 días sin saltos de línea ni scroll horizontal, además de la implementación del patrón de papel cuadriculado continuo en `body`.
- **Cobertura de testing automatizado:** Creación y estructuración de tests con Vitest y Testing Library, incluyendo mocks de módulos externos como Firebase Firestore y helpers de manipulación de fechas.

### 2. Situaciones donde fue más efectiva
- **Resolución de problemas de configuración de build/hosting:** Brindó respuestas inmediatas sobre las diferencias entre el servidor de desarrollo de Vite y el servidor estático de producción en Vercel.
- **Cálculo de layouts responsivos:** Propuso soluciones directas en CSS para evitar que contenedores anidados forzaran desbordamientos horizontales en pantallas medianas y móviles (`min-width: 0`, `word-break: break-word`).
- **Pruebas unitarias de utilidades temporales:** Generó casos borde en `dateHelpers.ts` (cambios de mes, fin de semana, husos horarios).

### 3. Patrones y buenas prácticas identificadas
- **Prompting contextual con código real:** La efectividad de la IA aumentó significativamente al compartir fragmentos de código exactos, mensajes de consola y comportamientos observados vs. esperados, en lugar de descripciones genéricas.
- **Verificación humana rigurosa:** Cada propuesta de código fue sometida a revisión manual, compilación (`npm run build`) y ejecución de pruebas automatizadas (`npm run test`) antes de ser incorporada.
- **Iteración atómica:** Abordar un requerimiento específico a la vez (ej. una feature, un fix de CSS o un test) resultó mucho más confiable que solicitar refactorizaciones completas simultáneas.
- **Seguridad primero:** Asegurar que ninguna sugerencia de la IA proponga exponer credenciales sensibles o saltarse reglas de seguridad en el cliente.