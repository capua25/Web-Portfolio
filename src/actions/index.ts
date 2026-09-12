import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { saveComment } from "../database/addComment";

// TLDs con sobrerrepresentación conocida en spam/phishing (criterio: TLDs de
// spam, no TLDs populares en general). La lista es deliberadamente acotada:
// aceptar "cualquier cosa después de un punto" como dominio genera falsos
// positivos constantes con menciones legítimas a tecnología (Next.js,
// Node.js, un archivo index.ts, etc.).
//
// A propósito NO incluye TLDs de desarrolladores (.io, .dev, .app, .tech):
// la audiencia de este portfolio es mayormente devs, con mucha más
// probabilidad de mencionar un ".io" o ".dev" legítimo que un bot de spam.
// Ahí el filtro perdía más de lo que ganaba.
const LINK_TLD_PATTERN =
    "com|net|org|info|biz|xyz|top|click|online|site|live|club|win|shop|ru|cn";

// Cubre http(s)://, www. y dominios desnudos con un TLD de la lista de arriba.
// El \b final evita que "com" matchee dentro de una palabra más larga (p. ej.
// "abc.commercial"), y el \b inicial evita matchear un TLD pegado a otra
// palabra sin punto real de por medio.
const LINK_REGEX = new RegExp(
    `https?:\\/\\/|www\\.[a-z0-9-]|\\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.(?:${LINK_TLD_PATTERN})\\b`,
    "i",
);

const containsLink = (text: string): boolean => LINK_REGEX.test(text);

export const server = {
    addCommentToDB: defineAction({
        accept: "form",
        input: z.object({
            nombre: z.string().min(3).max(25),
            texto: z
                .string()
                .min(10)
                .max(250)
                .refine((value) => !containsLink(value), {
                    message: "LINKS_NOT_ALLOWED",
                }),
            // Honeypot: input oculto por CSS, invisible para una persona.
            // Opcional porque un navegador viejo o un POST manual sin JS
            // puede no enviarlo, y en ese caso no hay nada raro que detectar.
            website: z.string().optional(),
            // Timestamp (ms) de cuando se renderizó el formulario. Llega
            // como string desde un input hidden; se parsea a mano en el
            // handler porque puede venir ausente, vacío o corrupto.
            ts: z.string().optional(),
        }),
        handler: async (input) => {
            // Respuesta idéntica a un envío real. El cliente (bot o no) no
            // puede distinguirla de un éxito genuino.
            const silentSuccess = {
                success: true,
                message: "Gracias por tu comentario!",
            };

            // Honeypot lleno = bot. Fallamos en silencio: devolvemos éxito en
            // vez de un error para que el bot crea que funcionó y no itere
            // variantes al ver que lo detectamos. No se guarda nada.
            if (input.website && input.website.trim().length > 0) {
                return silentSuccess;
            }

            // Chequeo de tiempo: un humano no lee el formulario, escribe un
            // nombre y 10+ caracteres en menos de 3 segundos.
            // `ts` viene del cliente y es falsificable: esto frena bots
            // ingenuos, no un atacante que lo simule a mano.
            if (input.ts && input.ts.trim() !== "") {
                const renderedAt = Number(input.ts);
                if (!Number.isNaN(renderedAt)) {
                    const elapsedMs = Date.now() - renderedAt;
                    // elapsedMs negativo = ts en el futuro (reloj
                    // desincronizado o manipulado). Ante la duda, dejamos
                    // pasar: es peor rechazar a alguien real que dejar pasar
                    // un spam.
                    if (elapsedMs >= 0 && elapsedMs < 3000) {
                        return silentSuccess;
                    }
                }
                // ts no numérico: no se puede evaluar, se deja pasar.
            }
            // ts ausente o vacío: no se puede evaluar, se deja pasar.

            const { success, error } = await saveComment(
                input.nombre,
                input.texto,
            );
            if (success) {
                return silentSuccess;
            }
            return {
                success,
                message: error,
            };
        },
    }),
};
