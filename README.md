# The Khalistic Beauty House (frontend)

Frontend-only Next.js concept for The Khalistic Beauty House. Where Beauty Feels Like Home. The public pages use centralized mock data. Booking and contact submissions are simulations; no data is delivered to a backend.

## Requirements

- Node.js compatible with Next.js 16 (Node.js 20.9 or later)
- npm

## Install and run

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. To validate changes, run:

```powershell
npm run typecheck
npm run lint
npm run build
npm run start
```

`NEXT_PUBLIC_SITE_URL` in `.env.local` controls the origin used by social metadata. It defaults to the local origin in `.env.example`; set it to the real public origin when deploying. It is public configuration, not a secret.

## Project handover

See [docs/frontend-handover.md](docs/frontend-handover.md) for the route inventory, mock behavior, verified QA results, known limitations, and proposed future NestJS API integration points. Backend integration has not started and requires approval.

Existing feature notes and image credits are in `docs/`.

## Deploy to Vercel

This is a standalone Next.js app in the `frontend` directory. When importing this repository into Vercel, use the repository root (`.`) as the Project Root Directory if the imported Git repository is this `frontend` folder. If you import a parent repository containing multiple projects, set the Root Directory to `frontend`.

Vercel detects Next.js and uses the `build` script from `package.json`; the existing `npm run build` script runs `next build --webpack`. Leave the framework's output directory at its default. No custom Vercel adapter or `vercel.json` is required.

Set `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings → Environment Variables to the production site's full origin (for example, `https://your-domain.example`) when using a custom domain. This value is public and is used for canonical/social metadata. If omitted, metadata uses Vercel's production project domain, then its deployment URL, and finally `http://localhost:3000` for local development. Apply changes by creating a new deployment.

After connecting the Git repository, deploy a branch for a preview, then deploy the production branch. See [Vercel's Next.js guide](https://vercel.com/docs/frameworks/full-stack/nextjs) and [build settings](https://vercel.com/docs/builds/configure-a-build) for current project setup options.
