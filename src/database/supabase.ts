import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente lazy: instanciarlo en el top-level del módulo hacía que, sin
// credenciales configuradas, `createClient` tirara una excepción al
// importar este archivo. Como `addComment.ts` (importado por el archivo de
// Astro Actions) lo importa, y Astro carga ese archivo antes de resolver
// cualquier ruta, esa excepción tumbaba el sitio ENTERO con un 500 en vez
// de degradar solo la feature de comentarios. Ahora la lectura de env y la
// creación del cliente se difieren hasta el primer uso real, y si faltan
// las credenciales se devuelve `null` en lugar de lanzar.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
    const supabaseURL = import.meta.env.SUPABASE_URL;
    const supabaseKEY = import.meta.env.SUPABASE_KEY;

    if (!supabaseURL || !supabaseKEY) return null;

    client ??= createClient(supabaseURL, supabaseKEY);
    return client;
}

// Fila de la tabla `comments`. Deducida de los campos que realmente se leen
// (Comentarios.astro) y se escriben (addComment.ts): `created_at` puede venir
// en null si la columna no tiene valor en la fila.
export interface CommentRow {
    name: string;
    text: string;
    created_at: string | null;
}
