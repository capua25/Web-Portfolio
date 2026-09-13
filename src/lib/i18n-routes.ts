import { getCollection } from "astro:content";

// Mapeo es<->en de rutas para los casos de estudio. Existe porque
// `astro:i18n` (getRelativeLocaleUrl, etc.) solo sabe traducir el prefijo de
// locale, asumiendo que el resto del path es idéntico entre idiomas. Acá no
// es así: el segmento de sección también está traducido (`casos` en español,
// `case-studies` en inglés), así que ese mapeo es conocimiento de dominio
// que tiene que vivir en el código del proyecto. Antes estaba duplicado,
// idéntico, en `src/pages/es/casos/[slug].astro` y
// `src/pages/case-studies/[slug].astro`; ahora ambas páginas importan esta
// única fuente de verdad.
export function getCasoAlternates(slug: string): { en: string; es: string } {
    return {
        en: `/case-studies/${slug}`,
        es: `/es/casos/${slug}`,
    };
}

// Existe una entrada de la colección `casos` para este slug + idioma, con el
// mismo criterio de `publicado` que usan `getStaticPaths()` en
// `src/pages/{es/casos,case-studies}/[slug].astro` (y que ya usaba
// `src/components/Proyectos.astro` para su propia guarda del botón al caso
// de PinAr). Debe ser EXACTAMENTE ese criterio: si diverge, un link puede
// terminar apuntando a una página que en producción `getStaticPaths()` no
// genera, es decir, un 404 (o, al revés, un link que funciona en dev y no
// en producción).
export async function existeCasoEnIdioma(
    slug: string,
    lang: "es" | "en",
): Promise<boolean> {
    const entries = await getCollection("casos", (entry) => {
        if (entry.data.casoSlug !== slug) return false;
        if (entry.data.lang !== lang) return false;
        if (import.meta.env.PROD && !entry.data.publicado) return false;
        return true;
    });
    return entries.length > 0;
}
