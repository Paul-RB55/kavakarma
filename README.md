# Kava Karma mini-site

This is the production-ready source project for the Kava Karma landing page. It is configured as a static React/Vite site for GitHub and Cloudflare Pages.

## What is already configured

- Responsive desktop and mobile layouts
- Mobile sticky shop button
- All shop buttons point to the official Kava Karma Shopify product page
- Incoming campaign parameters are forwarded to Shopify
- Product and FAQ structured data
- Cloudflare Pages redirects and security headers
- Node version pinned in `.node-version`
- Production build tested successfully

## Project files

| File or folder | Purpose |
| --- | --- |
| `src/App.tsx` | Page content, links, navigation, FAQs, and interactions |
| `src/App.css` | Complete desktop and mobile design |
| `src/main.tsx` | Starts the React site |
| `public/_redirects` | Prevents route-refresh 404 errors on Cloudflare Pages |
| `public/_headers` | Adds basic production security headers |
| `public/favicon.svg` | Browser-tab icon |
| `index.html` | Page title, description, social preview, and app mount |
| `package.json` | Build commands and exact project dependencies |
| `package-lock.json` | Reproducible dependency versions |
| `.node-version` | Node.js version used by Cloudflare |
| `vite.config.ts` | Produces the final site in `dist` |

## Step 1 — Create the GitHub repository

Recommended repository name:

`kava-karma-mini-site`

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
git remote add origin https://github.com/YOUR-OWNER/kava-karma-mini-site.git
git push -u origin main
```

## Step 2 — Connect the repository to Cloudflare Pages

1. Open **Cloudflare Dashboard → Workers & Pages**.
2. Choose **Create application → Pages → Import an existing Git repository**.
3. Connect GitHub if prompted.
4. Select `kava-karma-mini-site`.
5. Use the following settings:

| Cloudflare setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` or leave blank |
| Environment variables | None required |

The included `.node-version` pins Node.js `22.20.0`, so no separate `NODE_VERSION` variable should be necessary.

6. Select **Save and Deploy**.
7. Cloudflare will create a temporary `*.pages.dev` address.
8. Every future push to `main` will automatically rebuild the live site.

## Step 3 — Add the final domain or subdomain

After the first deployment succeeds:

1. Open the Pages project in Cloudflare.
2. Choose **Custom domains → Set up a domain**.
3. Enter the final domain or subdomain.
4. Follow Cloudflare's activation prompt.

If the domain already uses Cloudflare DNS, Cloudflare normally creates the needed record automatically. If DNS is hosted elsewhere, add the CNAME Cloudflare provides only after first associating the custom domain inside the Pages project.

## Updating the site later

Edit:

- `src/App.tsx` for copy, links, sections, and FAQs.
- `src/App.css` for colors, sizing, layout, and mobile styling.

Then push the update to `main`. Cloudflare Pages will rebuild automatically.

## Local testing

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Official setup references

- Cloudflare Pages Vite deployment: https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- GitHub existing-project instructions: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
