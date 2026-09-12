import { supabase } from "./supabase";

export const saveComment = async (name: string, text: string) => {
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
