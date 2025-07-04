# Konsultech - Simulador de Presupuestos para Proyectos TI

## ¿Qué es?
Konsultech es una plataforma especializada en la simulación y gestión de presupuestos para proyectos de tecnología. Permite a empresas y consultoras crear presupuestos detallados, comparar tecnologías y generar propuestas profesionales para sus clientes.

## Características principales
- ✅ Simulador interactivo de presupuestos
- ✅ Catálogo de tecnologías y costos reales
- ✅ Comparación de escenarios (AWS vs Azure, React vs Angular, etc.)
- ✅ Gestión de equipos y recursos
- ✅ Reportes exportables en PDF/Excel
- ✅ Recomendaciones inteligentes
- ✅ Justificaciones automáticas para clientes

## Tecnologías utilizadas
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Prisma + MongoDB
- Chart.js para gráficos
- jsPDF para exportación

## Instalación y uso
1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Configura las variables de entorno en `.env`
4. Ejecuta: `npm run dev`

## Estructura del proyecto
- `/simulador` - Simulador principal de presupuestos
- `/proyectos` - Gestión de proyectos guardados
- `/tecnologias` - Administración del catálogo de tecnologías
- `/reportes` - Visualización y exportación de reportes

## Valor para el negocio
- Acelera el proceso de cotización en un 80%
- Reduce errores de estimación
- Mejora la transparencia con clientes
- Facilita la toma de decisiones técnicas
- Aumenta la profesionalidad de las propuestas

---

© 2025 Konsultech. Plataforma desarrollada como proyecto académico del curso "Costos y Presupuestos".

## Instalación y configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Alighanx/Konsultech.git
cd konsultech
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env` y personaliza la variable `DATABASE_URL` con tu cadena de conexión de MongoDB Atlas:

```env
DATABASE_URL="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
```

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 6. Despliegue en Vercel

- Sube tu código a GitHub.
- Conecta el repositorio a Vercel.
- Configura la variable de entorno `DATABASE_URL` en Vercel.

---

## Colaboradores

Agrega a tus colaboradores en GitHub para que puedan contribuir al proyecto.

---

## Colaboración usando Git y GitHub desde VS Code

1. **Sincroniza tu repositorio antes de trabajar:**
   - Haz clic en el ícono de fuente de control (ramita) en la barra lateral izquierda.
   - Haz clic en "Sincronizar cambios" para tener la última versión de `main`.

2. **Crea una nueva rama para tu funcionalidad:**
   - Haz clic en el nombre de la rama (abajo a la izquierda, suele decir `main`).
   - Selecciona "Crear nueva rama..." y ponle un nombre (ejemplo: `feature/login-ui`).

3. **Haz tus cambios y commitea:**
   - Haz cambios en los archivos.
   - Escribe un mensaje de commit y haz clic en el check para confirmar.

4. **Publica tu rama en GitHub:**
   - Haz clic en "Publicar rama" cuando VS Code lo sugiera.

5. **Crea un Pull Request (PR):**
   - Haz clic en "Crear Pull Request" desde VS Code o GitHub.
   - El otro colaborador revisa y aprueba el PR.

6. **Ambos deben aprobar el PR antes de fusionar a `main`.**
   - Solo después de la aprobación, fusiona el PR.

7. **Repite el proceso para cada nueva funcionalidad o corrección.**

> Así ambos pueden trabajar en paralelo, revisar el trabajo del otro y mantener el proyecto ordenado y seguro.

---

## Notas

- No subas el archivo `.env` a GitHub.
- Usa ramas para nuevas funcionalidades y haz pull requests para revisión.
