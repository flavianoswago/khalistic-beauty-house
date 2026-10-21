# Frontend milestone 10: Booking confirmation page

- [x] Create the booking confirmation page.
- [x] Display the sample booking reference.
- [x] Display customer name and selected service.
- [x] Display appointment date and time.
- [x] Display the selected professional when applicable.
- [x] Display the estimated price and booking status.
- [x] Show clear instructions for contacting the salon about changes.
- [x] Add a Return to Homepage action.
- [x] Add an expandable View Booking Details action backed by browser-session data.
- [x] Handle missing, malformed and mismatched references gracefully.
- [x] State clearly that no real appointment was stored and no notification was sent.

A completed demo summary is stored only in `sessionStorage` for the current browser tab so the confirmation route can render its details. No server endpoint receives it; the browser clears it when the tab session ends. The phone and email shown are user-provided details; the business location and opening hours remain fictional sample information.
