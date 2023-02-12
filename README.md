## Getting Started

Run the development server:

```bash
npm run dev
```

# Setup

```bash
# nextjs setup
npx create-next-app@latest crossidio --typescript --eslint
npm install
# Tailwind support: https://tailwindcss.com/docs/guides/nextjs
npm install -D tailwindcss postcss autoprefixer
# manually: modify tailwind.config.js's content & globals.css
npx tailwindcss init -p
git add .
git commit -m 'feat: tailwind support'
# libs
npm install clsx
```
