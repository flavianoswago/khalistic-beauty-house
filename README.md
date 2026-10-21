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