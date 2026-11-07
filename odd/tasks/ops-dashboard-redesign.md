# ops-dashboard-redesign

Objective: implement the approved "operations dashboard" visual redesign across the portfolio (home + shared shell + case study pages), dark only.
Branch: `feat/ops-dashboard-redesign` (from `feat/cv-v4-update`) · Delivery: ask-on-risk · Test runner: none; checks = `pnpm verify` + dev smoke test + Playwright screenshots vs mockup.

Reference mockup (approved): `/tmp/claude-1000/-home-capua25-workspace-Web-Portfolio/17e4cd8e-90d8-4e4c-ac4d-9718d10a7b73/scratchpad/mockup-approved.html` (also https://claude.ai/artifact/DMsfZXoywyoyMKYpWtGyiS). It is a Design-canvas `.dc.html`: read the markup inside `<x-dc>`; `{{accent}}` = `#8EA4FF`.

## Specs

- S1 — "ahora implementá este diseño en el portfolio": the home page (EN `/` and ES `/es/`) matches the mockup's structure, order, copy and visual system: top bar (monogram, name, role, nav, language), summary (status pill, H1, intro, facts list), 4 KPI tiles, Systems (2 large panels with real screenshots for PinAr and Gestión Municipal, 2 small panels CabaGestion and Eurogen and B&V ERPs), Experience + Stack panels, contact block, footer.
- S2 — Theme: user chose "Solo oscuro": dark only, remove the light/dark toggle and its script/localStorage logic.
- S3 — Content decisions already made by the user (must hold): Caja Neta removed ("si sacalo"); Gestión Municipal presented as an ERP with "~10" staff in the pilot; Eurogen is "a multi-branch home goods retailer", B&V an import company ("solo una es una empresa importadora, el otro es un comercio minorista de electrodomesticos y artículos en general"); no timeline ("Saca la linea temporal"); no education section.
- S4 — All visible strings live in `src/i18n/ui.ts` in EN and ES (keys at parity); ES copy is a faithful translation in the site's existing voseo tone.
- S5 — Case study pages (`/case-studies/*`, `/es/casos/*`) and 404 adopt the same visual system (palette, fonts, header/footer) so the site is consistent; their content is unchanged.
- S6 — Quality floor: responsive to 360 px with no horizontal scroll, visible keyboard focus, text contrast ≥ 4.5:1, real `<a>`/`<button>`, images via `astro:assets`, SEO/JSON-LD/hreflang behavior unchanged.

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 | S2, S5 (shell), S6 | delegated writer (first; others depend on tokens) | done | 63e11bf |
| T2 | S1, S3, S4, S6 | delegated writer (parallel with T3; owns ui.ts) | done | see log L5 |
| T3 | S5, S6 | delegated writer (parallel with T2; disjoint: caso components + case pages + 404) | done | 62ab644 |
| T4 | all | parent: seam check (`pnpm verify`, dev smoke, screenshots) | done | — |

Route evidence: user rule "SIEMPRE ejecutar planes con subagentes"; T2/T3 are independent units with disjoint edit surfaces (Writer trigger a). T1 first because T2/T3 consume its tokens.

## Log

- L1 (2026-11-07) user: "ahora implementá este diseño en el portfolio"
- L2 (2026-11-07) user answer on theme: "Solo oscuro (Recommended)"
- L3 prior decisions (same session): "si sacalo" (Caja Neta); "el sistema de gestion municipal es practicamente un ERP, lo que suma unos 10 usuarios aprox."; Eurogen = retail (eurogen.com.uy), B&V = importer; "Saca la linea temporal".
- L4 (2026-11-07) T4 verification: `pnpm verify` green (0 errors). Dev smoke: `/`, `/es/`, `/case-studies/pinar`, `/es/casos/gestion-municipal` 200, `/nope` 404. Playwright screenshots at 1440 and 375: home matches mockup; scrollWidth == viewport on all pages (no horizontal scroll); all 6 case-study images load (lazy). canonical/hreflang/JSON-LD present. Gotcha: first dev run served stale Tailwind config; fixed by clearing node_modules/.vite and `astro dev --force`.
- L5: home commit is the one after 62ab644 on this branch ("feat(home): rediseño como panel de operaciones"). Pending for user: README still mentions `fonts/`; case hero uses `pinarsports.webp`, which shows [SEED] data and the Next.js dev "1 issue" badge; both cases still `publicado: false`.
