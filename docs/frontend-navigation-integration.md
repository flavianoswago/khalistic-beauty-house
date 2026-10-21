# Frontend milestone 12: Navigation and cross-page integration

- [x] Connect all public pages through navigation, wordmark and footer actions.
- [x] Mobile navigation opens/closes by toggle, link selection, route change and Escape.
- [x] Homepage and service-menu cards pass the selected service to booking.
- [x] Team profile actions pass the selected professional to booking.
- [x] Booking selections persist across its client-side steps and edits.
- [x] Booking confirmation reads the correct session-scoped simulated booking.
- [x] Add breadcrumbs to services, story, team, gallery, contact, booking and confirmation routes.
- [x] Add a branded not-found page with useful navigation links.
- [x] Keep navigation links compatible with browser back/forward history.
- [x] Remove or replace generic, broken and misleading page actions.
- [x] Use semantic links/buttons, current-page state, expanded state, focus styles and skip links for keyboard use.

Service selection is carried in the `service` URL parameter; staff selection uses `staff`. Completed mock confirmation data is kept in the current tab session and is never sent to a backend.
