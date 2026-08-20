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

## Product page and launch settings

The product page lives at `/product`. Every shop CTA on the landing page points there and defaults to the 20-count option.

Product IDs, prices, labels, and image paths are centralized in `src/App.tsx` under `PRODUCT_VARIANTS`. Update that one array if Shopify variant details change at launch. The checkout domain is set in `SHOPIFY_STORE_URL`, and checkout buttons use Shopify cart permalinks so the selected count and quantity pass directly into checkout.
