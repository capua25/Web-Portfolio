// JSON-LD Person compartido entre el Layout (toda página) y el Article/CreativeWork
// de los casos de estudio, que lo referencia como `author` para apuntar al mismo
// autor sin duplicar los datos. Solo campos verificables en el repo (Footer.astro /
// Contacto.astro para sameAs, i18n/ui.ts para jobTitle, astro.config.mjs para url).
// Nada inventado (sin email, teléfono, dirección, etc.).
export const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Martín Capuano",
    url: "https://capuanomartin.dev",
    jobTitle: "Full-Stack Developer",
    sameAs: [
        "https://www.linkedin.com/in/capuanomartin/",
        "https://github.com/capua25/",
    ],
};
