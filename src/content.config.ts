import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Colección de casos de estudio (case studies). Un mismo `slug` puede tener
// una entrada por idioma (pinar.es.mdx / pinar.en.mdx); las rutas filtran
// por `lang` y mapean el param con `slug`, no con el nombre de archivo.
const casos = defineCollection({
    loader: glob({ base: "./src/content/casos", pattern: "**/*.mdx" }),
    schema: ({ image }) =>
        z.object({
            slug: z.string(),
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
            sitioUrl: z.string().url().optional(),
            publicado: z.boolean().default(false),
        }),
});

export const collections = { casos };
