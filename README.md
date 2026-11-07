# Capua25.github.io — Portfolio Personal de Martín Capuano

## Tecnologías

- **Astro 5** (SSR con adaptador Vercel; casos de estudio prerenderizados)
- **MDX** con content collections para los casos de estudio
- **TailwindCSS 3** con tokens propios `ops-*` (diseño "panel de operaciones", solo oscuro)
- **TypeScript**
- **pnpm** como gestor de paquetes

---

## Estructura de carpetas

```
src/
├── components/            # Secciones del home, Header, Footer
│   └── caso/              # Componentes de los casos de estudio (hero, métricas, decisiones, prosa)
├── content/casos/         # Casos de estudio en MDX, uno por idioma (<slug>.es.mdx / <slug>.en.mdx)
├── pages/
│   ├── index.astro        # Ruta /  (inglés)
│   ├── es/index.astro     # Ruta /es (español)
│   ├── case-studies/      # /case-studies/<slug> (inglés)
│   ├── es/casos/          # /es/casos/<slug> (español)
│   └── 404.astro
├── layouts/
│   └── Layout.astro       # HTML base, fuentes (Google Fonts), SEO, hreflang, JSON-LD
├── lib/                   # seo.ts, i18n-routes.ts (mapeo de rutas entre idiomas)
├── i18n/
│   ├── ui.ts              # Diccionario EN/ES (claves en paridad)
│   └── utils.ts           # useTranslation(lang)
└── img/                   # Capturas de proyectos y casos de estudio
```

---

## Componentes principales

| Componente          | Función                                                            |
| ------------------- | ------------------------------------------------------------------ |
| `Header.astro`      | Barra superior, navegación por anclas, menú móvil, selector idioma |
| `Resumen.astro`     | Estado general, título, presentación y ficha (ubicación, idiomas)  |
| `Indicadores.astro` | Indicadores principales                                            |
| `Sistemas.astro`    | Paneles de sistemas en producción con capturas, métricas y stack   |
| `Experiencia.astro` | Experiencia laboral                                                |
| `Skills.astro`      | Stack agrupado por área                                            |
| `Contacto.astro`    | Email, LinkedIn, GitHub y descarga de CV                           |
| `Footer.astro`      | Copyright y links de contacto                                      |

---

## Funcionalidades

1. **Multiidioma** — EN/ES por ruta (`/` = inglés, `/es` = español), incluidos los casos de estudio
2. **Casos de estudio** — MDX por idioma; solo se generan en producción si tienen `publicado: true`
3. **Responsive** — Mobile-first, menú móvil en pantallas `<lg`
4. **Descarga de CV** — PDFs en ambos idiomas (`public/`)

---

## Configuración de deploy

- **Output**: `server` (SSR habilitado)
- **Adapter**: `@astrojs/vercel`
- **i18n**: `defaultLocale: "en"`, sin prefijo en la ruta por defecto
- **Site**: `https://capuanomartin.dev`

---
