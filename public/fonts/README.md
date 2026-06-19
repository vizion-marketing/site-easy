# Polices self-hostées

## Cooper Black (highlights de titres)

Cooper Black est une police **commerciale** (URW / Monotype / Adobe). Elle n'est
livrée avec aucun package npm du projet — il faut déposer ici un fichier **licencié**.

Fichiers en place (référencés par le `@font-face` dans `src/styles/global.css`) :

- `public/fonts/CooperFiveOpti-Black.woff2`  ← format principal (OPTI Cooper Five Black)
- `public/fonts/CooperFiveOpti-Black.otf`    ← fallback

La police s'affiche via la classe utilitaire `font-cooper` (token `--font-cooper`).
Si tu remplaces les fichiers, garde ces noms ou mets à jour les `url(...)` du `@font-face`.

> Astuce : si tu n'as qu'un `.ttf`/`.otf`, convertis-le en `.woff2`
> (ex. https://www.fontsquirrel.com/tools/webfont-generator ou `woff2_compress`)
> pour un poids de fichier bien moindre.
