import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Colección de casos de estudio (case studies). Un mismo `casoSlug` puede
// tener una entrada por idioma (pinar.es.mdx / pinar.en.mdx); las rutas
// filtran por `lang` y mapean el param con `casoSlug`, no con el nombre de
// archivo.
const casos = defineCollection({
    loader: glob({ base: "./src/content/casos", pattern: "**/*.mdx" }),
    schema: ({ image }) =>
        z.object({
            // OJO: este campo NO puede llamarse `slug`. El glob loader de
            // Astro trata `data.slug` del frontmatter crudo (antes de
            // validar con zod) como override del id de la entrada; con dos
            // idiomas del mismo caso, ambos generarían el mismo id y el
            // segundo pisaría al primero en silencio (build en verde, una
            // página menos).
            casoSlug: z.string(),
            lang: z.enum(["es", "en"]),
            titulo: z.string(),
            resumen: z.string(),
            periodo: z.string(),
            rol: z.string(),
            stack: z.array(z.string()),
            metricas: z.array(
                z.object({
                    valor: z.string(),
                    label: z.string(),
                }),
            ),
            heroImage: image(),
            // Fecha de publicación explícita del caso. Es la fuente del
            // `datePublished` del JSON-LD: metadata publicada no puede
            // depender del historial de git (un rebase, un clone sin
            // historia o mover el archivo la cambiarían o la borrarían).
            fechaPublicacion: z.coerce.date(),
            sitioUrl: z.string().url().optional(),
            publicado: z.boolean().default(false),
        }),
});

export const collections = { casos };
