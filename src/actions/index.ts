import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { saveComment } from "../database/addComment";

export const server = {
    addCommentToDB: defineAction({
        accept: "form",
        input: z.object({
            nombre: z.string().min(3).max(25),
            texto: z.string().min(10).max(250),
        }),
        handler: async (input) => {
            const { success, error } = await saveComment(
                input.nombre,
                input.texto,
            );
            if (success) {
                return {
                    success,
                    message: "Gracias por tu comentario!",
                };
            }
            return {
                success,
                message: error,
            };
        },
    }),
};
