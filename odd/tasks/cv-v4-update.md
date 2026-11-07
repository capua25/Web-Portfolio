# cv-v4-update

Objective: align the portfolio with CV v4, translate the PinAr case study, add a Gestión Municipal case study, fix typos, remove public comments, rework skills.
Branch: `feat/cv-v4-update` · Delivery: ask-on-risk · Test runner: none (no unit tests in repo); checks = `pnpm verify` (astro check + eslint + build).

## Specs

- S1 — CV PDFs: "CV_Martin_Capuano_EN.pdf y CV_Martin_Capuano.pdf son los actuales en el escritorio." Replace `public/CV-MartinCapuano-En.pdf` and `public/CV-MartinCapuano-Es.pdf` with them.
- S2 — "No vamos a poner una seccion de educacion." No education section is added.
- S3 — "Arregla el caso de estudio de PinAr": the case study only exists in Spanish (`pinar.es.mdx`); add the English version `pinar.en.mdx` (same `casoSlug: "pinar"`, `lang: "en"`).
- S4 — "vamos a hacer uno de Gestion Municipal": new case study `gestion-municipal` in ES and EN, sourced from the real repo `~/workspace/stockapp`, plus a project card on the home page linking to it.
- S5 — "Arregla los typos." (e.g. "multi-sucursal", "bussiness", "analisys", "enterpreneurs", "ocurred", "Gracias por tu comentario!", "Sobre mi").
- S6 — "Bueno sacamos los comentarios si." Remove the public comments feature (form, list, action, Supabase data layer, related i18n keys/deps).
- S7 — "Arregla eso de las skills tambien": skills as plain chips without external links (MDN/Wikipedia), aligned with the CV v4 skill list, including a Testing category.
- S8 — Initial request: "vamos a actualizar el portfolio web" with CV v4: landing, about, SEO jobTitle, experience bullets and project texts follow CV v4 (Full-Stack Developer · TypeScript (Next.js, NestJS) · C# / .NET · Linux; open to remote US/LATAM).

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 | S1 | inline (parent) | done | f7757f8 |
| T2 | S5, S6, S7, S8 | delegated writer A (parallel; owns ui.ts) | done | 89bb25c |
| T3 | S3 | delegated writer B (parallel; disjoint: pinar.en.mdx) | done | d74f15c |
| T4 | S4 (case content + images) | delegated writer C (parallel; disjoint: new files) | done | 2234884 |
| T5 | S4 (home card) | inline (parent, after T2+T4) | done | 2234884 |

Route evidence: three independent units with disjoint edit surfaces, each several files / 100+ lines, launched together (Writer trigger a).

## Log

- L1 (2026-11-07) user: "en el desktop hay un archivo CV_Martin_Capuano_EN_v4.docx, es mi cv actual, vamos a actualizar el portfolio web. Analiza que otra cosa podemos mejorar en el portfolio"
- L2 (2026-11-07) user: "CV_Martin_Capuano_EN.pdf y CV_Martin_Capuano.pdf son los actuales en el escritorio. No vamos a poner una seccion de educacion. Arregla el caso de estudio de PinAr y vamos a hacer uno de Gestion Municipal. Arregla los typos. Bueno sacamos los comentarios si. Arregla eso de las skills tambien"
- L3: pinar.es.mdx has `publicado: false`; the EN version keeps the same flag. Publishing is left to the user.
- L4 (2026-11-07) verification: `pnpm verify` green (astro check, eslint, build). Dev smoke test: `/`, `/es/`, `/case-studies/pinar`, `/es/casos/pinar`, `/case-studies/gestion-municipal`, `/es/casos/gestion-municipal` all 200. en/es i18n keys at parity (61/61 before p7). No independent verifier ran.
- L5: open points for the user: publish flags (both cases `publicado: false`); GM case states tests are run by hand (no CI in stockapp) — inferred, to confirm; `output: "server"` no longer needed by any feature; projects grid now has 7 cards (last row not closed at xl).
- L6 (2026-11-07) user, separate request (redesign mockups, not in this feature): "A la opción artística rediseñala para que sea más estilo de dibujo. A la opción tecnológica cambiale los colores, está muy chillón"
