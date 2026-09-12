import { labels } from "./ui.ts";

const defaultLang = "en";

export function useTranslation(lang: keyof typeof labels) {
    return function translate(key: keyof (typeof labels)[typeof defaultLang]) {
        return labels[lang][key] || labels[defaultLang][key];
    };
}
// export function getLangFromURL(url: URL){
//     const [, lang] = url.pathname.split('/');
//     if (lang in labels){
//         return lang as keyof typeof labels;
//     }
//     return defaultLang;
// }
