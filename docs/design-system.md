# The Khalistic Beauty House design system

A warm, polished system for a welcoming, multi-service salon. Use these rules on every frontend route so service discovery, booking, and contact feel like one experience.

## Brand and colour

| Role | Token | Value | Use |
|---|---|---:|---|
| Primary brand | `--brand-rose` | `#C86B85` | Brand marks, small highlights, decorative accents |
| Primary action | `--action-rose` | `#963F5B` | Main buttons, important links, selected controls |
| Action hover | `--action-rose-hover` | `#81344D` | Hover and pressed action states |
| Supporting blush | `--soft-blush` | `#F7E7EC` | Soft section backgrounds and selected surfaces |
| Champagne accent | `--champagne-gold` | `#C6A15B` | Small decorative details only; never small text |
| Main text | `--deep-charcoal` | `#30252A` | Headings and body copy |
| Muted text | `--muted-mauve` | `#806D75` | Secondary copy on light surfaces |
| Page surface | `--warm-ivory` | `#FFFCFA` | Main page background |
| Quiet surface | `--surface-light-gray` | `#F2F0F1` | Alternating sections, inputs and soft cards |
| Border | `--pale-rose-border` | `#EAD8DF` | Card edges, dividers and form outlines |
| Inverse text | `--on-dark-text` | `#FFFFFF` | Text on dark charcoal/rose backgrounds |

Use charcoal for long text and the darker action rose for interactive elements. Rose and blush distinguish the brand; gray and ivory balance brightness. Gold is an accent, not an information colour. Keep white for small elements placed on dark backgrounds.

## Typography

- **Headings:** Cormorant Garamond, with Iowan Old Style, Palatino Linotype and Georgia fallbacks. Use sentence case and moderate weight for an editorial, composed voice.
- **Body and controls:** DM Sans, with Avenir Next, Avenir and Segoe UI fallbacks. Use for paragraphs, labels, navigation, prices, and button text.
- Keep body text at 16px or larger where possible, line-height around 1.6. Use muted text sparingly and keep it readable.
- Use one H1 per page, then a logical H2/H3 structure. Section headings may include a short uppercase eyebrow with extra tracking.
- Fluid heading sizes are defined by `--text-h1` through `--text-h6`; avoid one-off sizes unless a component needs a deliberate display treatment.

## Layout and spacing

- Use the shared `Container` component: reading width 44rem, content width 72rem, wide width 80rem.
- Spacing follows a 4px base scale (`--space-1` through `--space-24`). Prefer these tokens for component gaps and padding.
- Use `--space-section: clamp(4rem, 8vw, 7rem)` for major desktop sections, reducing to 3.5–4rem on compact screens.
- Build grids mobile-first. Collapse multi-column grids before cards or form fields become cramped. Avoid horizontal overflow.

## Surfaces, borders, and shadows

- Cards use a light gray or white surface, 1px pale rose border, and `--radius-card` (0.85rem). Keep elevation subtle with `--shadow-card`; reserve `--shadow-raised` for the hero image or an overlay that needs separation.
- Use `--radius-sm` (0.45rem) for controls and `--radius-pill` only for compact chips or deliberately pill-shaped filters.
- Dividers use the pale rose border. Avoid heavy outlines and stacked shadows.

## Image treatment

- Use consistent crops per context: wide editorial hero imagery, 4:3 service imagery, and uniform aspect ratios within galleries.
- Use `object-fit: cover` and choose `object-position` per image so important details remain visible. Do not apply strong color filters that distort skin or service results.
- Keep a soft, natural color balance; use `--image-surface` behind loading or placeholder artwork. Use `--image-overlay` only when text must sit over a photo.
- Add descriptive alt text for informative images; use empty alt text for decorative imagery. Label concept art, sample work, and fictional content clearly.

## Buttons and links

- **Primary:** solid action rose with white text, for booking and the strongest next step.
- **Secondary:** blush or gray fill with charcoal text, for a peer action.
- **Outline:** transparent or white fill, rose border and dark rose text, for supporting actions.
- Controls use a minimum 44px target, medium weight body font, 0.5rem corner radius, and a clear focus ring. Reserve pill shapes for filter chips.
- Keep button labels action-led and specific: “Choose this service”, “View the menu”, or “Plan your visit”. Use text links for low-priority navigation.
- Do not use gold as button text or as the only status indicator.

## Icon style

- Use **Lucide** outline icons only. Keep icons simple and familiar; no emoji or mixed filled/outline icon sets.
- Use 16px for compact metadata, 18px for inline actions, 20px for navigation controls, and 24px for empty/error/success states.
- Use a 1.75px stroke, consistent sizing, and `aria-hidden="true"` for decorative icons. An icon that conveys unique meaning must have an accessible text label.
- Use `SiteIcon` from `src/components/ui/icon.tsx` when adding icons. Keep icons aligned with text and do not use them as decoration in every heading.

## Frontend conventions

- Keep design values in `src/app/globals.css` custom properties and consume them in components.
- Reuse `Button`, `ButtonLink`, `Container`, `SectionHeading`, `Badge`, `Divider`, and shared cards instead of creating visually different duplicates.
- Keep sample prices, staff, availability, business details, and reviews clearly labelled as illustrative.
- Respect visible keyboard focus and reduced-motion settings. Avoid interactions that rely on color alone.
