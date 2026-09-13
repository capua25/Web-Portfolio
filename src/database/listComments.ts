import { getSupabase, type CommentRow } from "./supabase";

export const listComments = async () => {
    try {
        const supabase = getSupabase();

        // Sin credenciales configuradas no hay cliente: se devuelve la
        // lista vacía para que el island renderice su estado sin
        // comentarios, en vez de romper el SSR de la página.
        if (!supabase) {
            return {
                success: true,
                error: "",
                data: [],
            };
        }

        const { data, error } = await supabase
            .from("comments")
            .select(`created_at,name,text`)
            .overrideTypes<CommentRow[], { merge: false }>();

        if (error) {
            return {
                success: false,
                error: "Ha ocurrido un error",
                data: null,
            };
        }

        return {
            success: true,
            error: "",
            data: data,
        };
    } catch {
        // Cubre fallos que Supabase no devuelve como `error` (ej: URL/credenciales
        // inválidas que rompen el fetch interno). La sección de comentarios debe
        // degradar sin tirar abajo el SSR de toda la página.
        return {
            success: false,
            error: "Ha ocurrido un error",
            data: null,
        };
    }
};
