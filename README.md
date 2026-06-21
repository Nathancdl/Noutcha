# Noutcha Tchatat — CV interactif

CV one-page interactif, thème « inspecteur / DevTools ». Stack : **React + Vite**.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

## Build de production

```bash
npm run build      # génère /dist
npm run preview    # prévisualise le build
```

## Déployer sur GitHub + Vercel

1. Créer un repo GitHub et pousser le projet :

```bash
git init
git add .
git commit -m "CV interactif Noutcha"
git branch -M main
git remote add origin https://github.com/<ton-user>/noutcha-cv.git
git push -u origin main
```

2. Sur [vercel.com](https://vercel.com) → **Add New → Project** → importer le repo.
   Vercel détecte Vite automatiquement :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

3. **Deploy**. C'est en ligne.

## Modifier le contenu

Tout est dans `src/App.jsx` (données `SKILLS` / `PROJECTS` en haut du fichier).
La photo : `src/photo.jpg`. Les couleurs : variables CSS en haut de `src/styles.css`.
