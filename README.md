# Capua25.github.io — Portfolio Personal de Martín Capuano

## Tecnologías

- **Astro 5** (SSR con adaptador Vercel)
- **TailwindCSS 3** con tema personalizado (verde #a3e635)
- **TypeScript**
- **pnpm** como gestor de paquetes

---

## Estructura de carpetas

```
src/
├── components/        # 11 componentes Astro
├── pages/
│   ├── index.astro    # Ruta /  (inglés)
│   ├── es/index.astro # Ruta /es (español)
│   └── 404.astro
├── layouts/
│   └── Layout.astro   # HTML base, dark mode, fuentes, SEO
├── i18n/
│   ├── ui.ts          # Diccionario EN/ES (~60 claves)
│   └── utils.ts       # useTranslation(lang)
├── fonts/             # 3 fuentes personalizadas
└── img/               # Foto, logos, proyectos
```

---

## Componentes principales

| Componente          | Función                                                  |
| ------------------- | -------------------------------------------------------- |
| `Header.astro`      | Navbar sticky, menú burger, selector idioma              |
| `Landing.astro`     | Hero con CTA y descarga de CV                            |
| `About.astro`       | Bio con highlights en verde                              |
| `Experiencia.astro` | Timeline de experiencia laboral: Eurogen SRL + Freelance |
| `Skills.astro`      | Chips de tecnologías por categoría                       |
| `Proyectos.astro`   | Algunos de mis proyectos con modales                     |
| `Contacto.astro`    | Links de contacto (email, LinkedIn, GitHub)              |
| `Footer.astro`      | Links a redes sociales (LinkedIn, GitHub)                |

---

## Funcionalidades

1. **Multiidioma** — EN/ES automático por ruta (`/` = inglés, `/es` = español)
2. **Dark mode** — Toggle nativo con clases Tailwind `dark:`
3. **Responsive** — Mobile-first, menú burger en pantallas `<lg`
4. **Descarga de CV** — PDFs en ambos idiomas
5. **Modales** — Galería de proyectos con zoom

---

## Configuración de deploy

- **Output**: `server` (SSR habilitado)
- **Adapter**: `@astrojs/vercel`
- **i18n**: `defaultLocale: "en"`, sin prefijo en la ruta por defecto
- **Site**: `https://capuanomartin.dev`

---
