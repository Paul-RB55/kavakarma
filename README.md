# Kava Karma mini-site

Cloudflare Workers-ready React/Vite build.

## Cloudflare settings

- Production branch: `main`
- Root directory: `/` or blank
- Build command: `npm run build`
- Deploy command: `rm -f dist/_redirects && npx wrangler deploy`

The site uses Cloudflare Workers Static Assets with SPA fallback configured in `wrangler.jsonc`. Do not add a `_redirects` file.

## Local development

```bash
npm install
npm run dev
```

## Production test

```bash
npm run build
```

The completed build must contain both a JavaScript asset and a CSS asset inside `dist/assets/`.
