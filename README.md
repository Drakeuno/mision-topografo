# Misión Topógrafo — Maqueta funcional

**🔗 Demo en vivo: https://drakeuno.github.io/mision-topografo/**

Prototipo web interactivo del software de gamificación del proyecto **PID 2026**
*"Potenciando Aprendizajes Significativos: Gamificación como metodología de aprendizaje en
Topografía"* (UC Temuco · Ing. en Construcción).

Esta maqueta demuestra el **corazón del producto**: la simulación jugable de **Nivelación
Diferencial**, la capa de gamificación (puntos, niveles, insignias) y un **panel docente** con los
indicadores del proyecto. Es una demo de front-end con **datos simulados** (sin backend).

---

## Requisitos

- **Node.js 18+** (probado en Node 24)
- **pnpm** (o npm / yarn)

## Ejecutar en local

```bash
cd maqueta
pnpm install        # instala dependencias
pnpm dev            # servidor de desarrollo → http://localhost:5173
```

> Si usas **npm**: `npm install` y `npm run dev`.

## Build de producción y despliegue

```bash
pnpm build          # genera /dist
pnpm preview        # sirve /dist localmente para revisar
```

Para publicar un **enlace para el cliente** (gratis):

- **Vercel:** `npx vercel` en la carpeta `maqueta/` (framework: Vite).
- **Netlify:** arrastra la carpeta `dist/` a https://app.netlify.com/drop, o conecta el repo
  (build command: `pnpm build`, publish dir: `dist`).

---

## Guion de demostración (5 min)

1. **Login** → elige el perfil **Camila Reyes (Estudiante)**.
2. **Mapa de Misión** → muestra nivel, XP, puntos e insignias. La ruta tiene 3 unidades:
   *Nivelación* (disponible) y *Taquimetría* / *Replanteo* (próximamente).
3. Abre **"Control de Desniveles"** → lee el briefing (objetivos, RA1, rúbrica, terreno) → **Iniciar
   simulación**.
4. **Simulador**: en cada estación, lee la mira en el visor del telescopio (donde el *hilo medio*
   corta la mira) e ingresa el valor en metros. Lecturas verdaderas del circuito:

   | Estación | Vista atrás (BS) | Vista adelante (FS) |
   |---|---|---|
   | E1 (BM-1 → A) | **1,500** | **2,250** |
   | E2 (A → B)    | **0,750** | **2,400** |
   | E3 (B → BM-1) | **3,000** | **0,600** |

   La libreta de campo calcula HI y cotas en vivo. Al terminar verás el **control de cierre**
   (con esas lecturas, cierra en 0 mm → dentro de tolerancia).
5. **Ver resultados** → estrellas, nivel de rúbrica, puntos, XP e **insignias desbloqueadas**
   (🎯 Primera Lectura, 🦅 Ojo de Halcón, ✅ Cierre Perfecto, 📐 Control de Desniveles).
6. Vuelve al mapa: el progreso persiste (recarga la página y sigue ahí — `localStorage`).
7. **Cierra sesión** y entra como **Claudio Gil (Docente)** → **Panel docente**: indicadores del
   PID (línea base → meta), comparación de cohortes 2026/2027, tabla de estudiantes y
   **Exportar CSV**.

> Para reiniciar el progreso de la demo: borra el almacenamiento local del navegador
> (DevTools → Application → Local Storage) o usa una ventana de incógnito.

---

## Estructura

```
src/
  data/         Datos simulados (usuarios, misiones, insignias, rúbricas, circuito, indicadores)
  lib/          Lógica pura: leveling.ts (cálculo de nivelación) · gamification.ts (XP, rúbrica, insignias)
  context/      Estado global: AuthContext (login demo) · GameContext (progreso + localStorage)
  components/
    sim/        TelescopeView, MiraStaff, FieldBook, ClosurePanel  (núcleo de la simulación)
    game/       LevelBar, BadgeGrid, MissionCard
    teacher/    IndicatorCard, CohortChart, StudentTable
    ui/ layout/ Piezas reutilizables y estructura
  pages/        Login, StudentDashboard, MissionBriefing, LevelingSim, MissionResult,
                Profile, ComingSoon, TeacherPanel
```

## Notas de alcance

- **Datos simulados**: usuarios, cohorte e indicadores son ilustrativos, para la presentación.
- **MVP**: solo *Nivelación* es jugable; *Taquimetría* y *Replanteo* son el roadmap del producto.
- **Ruta a producto real**: la arquitectura (contextos + capa de datos) permite sustituir los datos
  simulados por **Supabase** y el login demo por **SSO/LTI de Moodle** sin rehacer la interfaz.
  Ver `../docs/PRD-Mision-Topografo.md` y `../docs/Plan-Implementacion-Maqueta.md`.
