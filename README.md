# Kava Karma mini-site

This is the production-ready source project for the Kava Karma landing page. It is configured as a static React/Vite site deployed with Cloudflare Workers Static Assets.

## What is already configured

- Responsive desktop and mobile layouts
- Mobile sticky shop button
- All shop buttons point to the official Kava Karma Shopify product page
- Incoming campaign parameters are forwarded to Shopify
- Product and FAQ structured data
- Cloudflare Worker SPA routing and security headers
- Wrangler pinned for repeatable deployments
- Node version pinned in `.node-version`
- Production build tested successfully

## Project files

| File or folder | Purpose |
| --- | --- |
| `src/App.tsx` | Page content, links, navigation, FAQs, and interactions |
| `src/App.css` | Complete desktop and mobile design |
| `src/main.tsx` | Starts the React site |
| `public/_headers` | Adds basic production security headers |
| `public/favicon.svg` | Browser-tab icon |
| `index.html` | Page title, description, social preview, and app mount |
| `package.json` | Build commands and exact project dependencies |
| `package-lock.json` | Reproducible dependency versions |
| `.node-version` | Node.js version used by Cloudflare |
| `vite.config.ts` | Produces the final site in `dist` |
| `wrangler.jsonc` | Configures the Cloudflare Worker and SPA fallback |

## Step 1 — Create the GitHub repository

Repository name: `kavakarma`

### Easiest method: GitHub Desktop

1. Unzip this project.
2. Open GitHub Desktop.
3. Choose **File → Add Local Repository** and select this project folder.
4. If GitHub Desktop says the folder is not a repository, choose **Create a Repository**.
5. Use `main` as the production branch.
6. Click **Publish repository**.
7. Choose the correct Real Botanicals owner or organization.
8. Keep the repository private unless you intentionally want the source public.

### Command-line method

Create a new empty repository on GitHub. Do not initialize it with another README, license, or `.gitignore`. Then run:

```bash
git init
git add .
git commit -m "Launch Kava Karma mini-site"
git branch -M main
git remote add origin https://github.com/YOUR-OWNER/kavakarma.git
git push -u origin main
```

## Step 2 — Connect the repository to Cloudflare Workers

1. Open **Cloudflare Dashboard → Workers & Pages**.
2. Choose **Create application → Workers → Import a repository**.
3. Connect GitHub if prompted.
4. Select `kavakarma`.
5. Use the following settings:

| Cloudflare setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` or leave blank |
| Environment variables | None required |

The included `.node-version` pins Node.js `22.20.0`, so no separate `NODE_VERSION` variable should be necessary.

6. Select **Save and Deploy**.
7. Cloudflare will create a temporary `*.workers.dev` address.
8. Every future push to `main` will automatically rebuild the live site.

## Step 3 — Add the final domain or subdomain

After the first deployment succeeds:

1. Open the Worker in Cloudflare.
2. Choose **Settings → Domains & Routes → Add → Custom Domain**.
3. Enter the final domain or subdomain.
4. Follow Cloudflare's activation prompt.

If the domain already uses Cloudflare DNS, Cloudflare normally creates the needed DNS record automatically.

## Updating the site later

Edit:

- `src/App.tsx` for copy, links, sections, and FAQs.
- `src/App.css` for colors, sizing, layout, and mobile styling.

Then push the update to `main`. Cloudflare Workers Builds will rebuild automatically.

## Local testing

```bash
npm install
npm run dev
```

Production check and local Worker preview:

```bash
npm run build
npm run preview
```

## Official setup references

- Cloudflare Workers static assets: https://developers.cloudflare.com/workers/static-assets/
- Single-page application routing: https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/
- Cloudflare Worker custom domains: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- GitHub existing-project instructions: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
