import { getSupabase } from "./supabase";

export const saveComment = async (name: string, text: string) => {
    const supabase = getSupabase();

    // Sin credenciales configuradas no hay cliente: se informa el mismo
    // error genérico que ya se usa para un fallo de Supabase, para que la
    // action lo propague al formulario sin distinguir la causa.
    if (!supabase) {
        return {
            success: false,
            error: "Ha ocurrido un error",
        };
    }

    const { error } = await supabase.from("comments").insert({ name, text });

    if (error) {
        return {
            success: false,
            error: "Ha ocurrido un error",
        };
    }

    return {
        success: true,
        error: "",
    };
};
