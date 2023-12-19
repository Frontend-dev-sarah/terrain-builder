# Terrain Builder

The project uses React + TypeScript + Vite, to setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## About the project task

1. Placer une maison coûte 10 / Supprimer une maison te rapporte 5
2. Placer / Supprimer un rocher coûte 3
3. Placer un bloc eau coûte 3 / On ne peut pas supprimer un bloc eau
4. Si on supprime un bloc maison ou rocher, cela devient un bloc “herbe” par défaut

5. On ne peut que placer un bloc rocher / eau / maison sur un bloc herbe - Enfin, en bonus, il serait intéressant de pouvoir gérer un historique de tes actions :

6. On peut faire un “Précédent / Suivant” pour annuler / refaire les actions faites (actions de placement / suppression de blocs)
7. On peut voir un log / liste des actions faites
8. Au clic sur une des actions de ce log, cela replace la grille / le budget dans l’état où ils étaient après cette action Pour te faire une idée du résultat attendu :

9. Si je clique sur une des cases, je vois des infos la concernant (type, position X;Y sur la grille) s’afficher dans un encart d’info. Dans cet encart, je vois aussi un bouton d’action : “Supprimer le bloc” (avec le crédit que cela vous coûtera / remboursera)
10. Je ne peux pas placer de bloc si je n’ai pas le budget nécessaire
11. Historique des actions : j’ai une section dans laquelle je vois l’historique de mes actions, et la possibilité de cliquer sur celles-ci pour y revenir, ainsi que 2 boutons Suivant / Précédent
12. Tous les petits “plus” visuels sont les bienvenus : toaster d’erreur si tu n’as pas le budget pour placer / supprimer tel bloc ; animation sur l’update du budget ; scroll sur les actions de l’historique ; etc. Laisse libre cours à ton imagination

## The realisation of the tasks

- Packages:
  @reduxjs/toolkit, tailwindcss
- Separation of logic and presentation, the logic consits of two slices: filedSlice controls all the parts of select, place and remove cell, historySlice controls all the parts of the previous, next and specific action/history of the filed actions

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
