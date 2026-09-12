// Config de ESLint en formato "flat config" (obligatorio desde ESLint 9+).
// Ver: https://github.com/ota-meshi/eslint-plugin-astro/blob/main/docs/user-guide.md
//      https://typescript-eslint.io/getting-started
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // Reemplaza al viejo .eslintignore: un config con solo "ignores" es global.
  {
    ignores: ["dist/**", ".vercel/**", ".astro/**", "node_modules/**"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // Reglas de accesibilidad (contraste, foco, roles ARIA, etc.) sobre los
  // templates .astro. Requiere eslint-plugin-jsx-a11y instalado.
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],

  {
    // "no-useless-assignment" analiza solo el bloque de script del
    // frontmatter: no ve que la variable después se usa en el template
    // (una porción que el linter parsea aparte). Resultado: falso positivo
    // en cualquier .astro que asigne una variable en un if/else y la use
    // recién en el markup (patrón normal de Astro, ver Landing.astro y
    // LenguajeSelect.astro).
    files: ["**/*.astro"],
    rules: {
      "no-useless-assignment": "off",
    },
  },

  {
    // env.d.ts es el archivo que Astro genera/espera con referencias
    // triple-slash a sus tipos ambientales (astro/client y .astro/types.d.ts).
    // No son módulos: no se pueden reemplazar por `import` sin romper el
    // mecanismo de tipado global de Astro. Es el contenido estándar que
    // scaffoldea `astro sync`, no un archivo nuestro para "corregir".
    files: ["**/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
