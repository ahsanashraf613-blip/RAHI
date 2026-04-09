# Maison Noir

A high-end, immersive e-commerce website for a premium clothing brand.
Built with React, Three.js (React Three Fiber), Framer Motion, GSAP, and Tailwind CSS.

## Tech Stack

- **React 18** — UI framework
- **React Three Fiber + Three.js** — 3D fabric mesh in the hero
- **Framer Motion** — page transitions and reveal animations
- **GSAP + ScrollTrigger** — scroll-driven 3D rotation
- **Tailwind CSS** — utility-first styling

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Deploy to GitHub Pages

### Step 1 — Update vite.config.js base

Open `vite.config.js` and set `base` to your repository name:

```js
export default defineConfig({
  plugins: [react()],
  base: '/maison-noir/',   // ← must match your GitHub repo name exactly
})
```

### Step 2 — Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 3 — Add deploy scripts to package.json

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 4 — Push code to GitHub first

```bash
git init
git add .
git commit -m "Initial commit — Maison Noir"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/maison-noir.git
git push -u origin main
```

### Step 5 — Deploy

```bash
npm run deploy
```

This builds the project and pushes the `dist/` folder to the `gh-pages` branch automatically.

### Step 6 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/maison-noir/`

## Project Structure

```
maison-noir/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navigation.jsx
    │   ├── HeroCanvas.jsx
    │   ├── FabricShape.jsx
    │   ├── ProductCard.jsx
    │   ├── CartButton.jsx
    │   └── LoadingScreen.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Shop.jsx
    │   └── Product.jsx
    ├── hooks/
    │   ├── useScrollHide.js
    │   └── useParallax.js
    └── data/
        └── products.js
```
