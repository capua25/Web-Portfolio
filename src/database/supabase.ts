import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.SUPABASE_URL;
const supabaseKEY = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(supabaseURL, supabaseKEY);

// Fila de la tabla `comments`. Deducida de los campos que realmente se leen
// (Comentarios.astro) y se escriben (addComment.ts): `created_at` puede venir
// en null si la columna no tiene valor en la fila.
export interface CommentRow {
    name: string;
    text: string;
    created_at: string | null;
}
