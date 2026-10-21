# Frontend handover

## Scope and status

This is a frontend-only concept site for The Khalistic Beauty House. Public content and appointment interactions use local mock data. No backend, database, authentication, live availability, booking persistence, or message delivery has been implemented. Backend integration is intentionally waiting for explicit approval.

## Folder structure

```text
src/
  app/                 App Router layouts and pages
    (public)/          Home, services, story, team, gallery, booking, contact
    (admin)/           Non-indexed placeholder; no admin system
  components/          Layout, navigation, booking, contact, gallery, team, UI
  data/                Centralized mock business, services, staff, reviews, gallery, availability
  types/               Shared TypeScript domain types
  app/globals.css      Design tokens and global styles
public/images/         Stock photography and concept SVG illustrations
 docs/                 Feature notes, accessibility notes, image credits, handover
```

There are currently no test files in the `tests/unit`, `tests/integration`, or `tests/e2e` folders. Empty future-work folders under `src/lib`, `src/hooks`, and `src/styles` contain no runtime code and are not imported. Shared service and staff cards consume typed records from `src/data`; no standalone duplicated price or staff dataset was found in UI components.

## Public pages

| URL | Purpose |
| --- | --- |
| `/` | Studio introduction, featured services, work, team, sample reviews, contact details |
| `/services` | Categorized illustrative service menu and prices in KES |
| `/story` | Fictional brand story and values |
| `/team` | Fictional professionals and booking preselection |
| `/gallery` | Concept illustrations with category filter and accessible viewer |
| `/booking` | Multi-step sample appointment flow; accepts `service` and `staff` query parameters |
| `/booking/confirmation` | Displays tab-session sample details for a valid reference |
| `/contact` | Supplied phone/email details, sample location and hours, and simulated inquiry form |

The shared navigation and footer links are defined in `src/components/navigation/navigation-links.ts`.

## Simulated behavior

- Services, staff, reviews, business information, gallery entries, availability dates, and times are illustrative data under `src/data/`.
- Service and staff links preselect recognized IDs in the booking URL. Unknown IDs are ignored.
- The booking flow checks required values and Kenyan phone/email formats, previews dates/times, and supports simulated submission loading/errors.
- A completed sample booking is stored only in `sessionStorage` for the current tab. Confirmation references do not represent real reservations.
- The inquiry form validates fields and previews loading, error, and success states. It never sends or stores a message.
- The gallery viewer is local UI only. Images are concept illustrations and representative stock imagery, not verified salon work or staff.

## Setup and environment

Install with `npm ci`, then copy `.env.example` to `.env.local` and run `npm run dev`. The only configured variable is `NEXT_PUBLIC_SITE_URL`, used for absolute social metadata URLs. The checked-in example uses `http://localhost:3000`; deployment must set the actual public origin. No credentials or secrets belong in this public variable.

Available checks:

```powershell
npm run typecheck
npm run lint
npm run build
npm run start
```

## QA summary

Most recent frontend QA run:

- `npm run typecheck`: passed.
- `npm run lint`: passed with the ESLint 9 flat config.
- `npm run build`: passed and prerendered the public pages.
- Production HTTP smoke check: home, services, story, team, gallery, contact, booking with service/staff query strings, confirmation with missing/invalid reference, icon, and an optimized JPEG all returned HTTP 200.
- Local image path scan: all literal `/images/...` references resolved.
- Backend/auth dependency scan: no backend, database, or authentication integration found.

The build environment reports that the Windows native SWC module is invalid and uses the WASM fallback. This did not prevent the production build from succeeding.

No browser was attached during QA. Actual multi-step clicks, validation feedback, keyboard/screen-reader behavior, viewport layout, browser console, and Lighthouse have not been manually exercised. HTTP responses do not verify those client interactions. No unit or browser test suite is currently configured.

## Known limits before launch

- The studio, service menu, prices, opening hours, staff, reviews, location, and availability are fictional sample content.
- Booking interactions are not connected to a real booking store. The phone/email fields use user-provided contact details; the inquiry form still does not deliver messages.
- Gallery SVGs are placeholders; stock-photo attribution and replacement approvals are described in `docs/story-team-image-credits.md`.
- `NEXT_PUBLIC_SITE_URL` must be set to the deployed public origin before release.
- Browser-based responsive/accessibility/performance verification remains outstanding.
- Admin is only a non-indexed placeholder and has no access control or functionality.

## Proposed NestJS integration seams (not implemented)

Keep the UI components and replace the mock data/service calls behind typed client functions. Suggested initial API contract for review:

| Frontend seam | Proposed NestJS operation |
| --- | --- |
| `src/data/services.ts`, `staff.ts` | `GET /api/services`, `GET /api/staff` |
| `src/data/mock-bookings.ts` and availability selectors in `src/components/booking/booking-journey.tsx` | `GET /api/availability?serviceId=�&staffId=�&date=�` |
| `submitBooking` in `booking-journey.tsx` | `POST /api/bookings`; server validates availability and returns a persisted reference |
| Confirmation view | `GET /api/bookings/:reference` (or return a safe confirmation payload from create) |
| `submitInquiry` in `src/components/contact/inquiry-form.tsx` | `POST /api/inquiries` |
| `business.ts`, `reviews.ts`, `gallery.ts` | Keep static initially or later add reviewed public read endpoints if content needs CMS management |

The contracts in `src/types/` are frontend display types, not a validated API schema. Before implementation, agree on request/response DTOs, validation rules, time zone and availability ownership, error codes, privacy/retention behavior, and authentication requirements. Do not treat session storage, frontend validation, or sample references as authoritative. No API client, server URL, NestJS service, database, or auth code has been added in this handover.

**Approval gate:** stop here for backend work. Begin NestJS integration only after explicit approval of the API contract and scope.