# Portfolio Spec (One-page, light-first)

Goal
- Ship a slick, minimal, one-page portfolio deployable on Vercel via GitHub.
- Content must come ONLY from `content/profile.json`. Do not invent content.

Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (subtle animations only)

Pages / Sections (single page with anchors)
- Home (#home)
- Projects (#projects)
- Experience (#experience)
- Contact (#contact)

Design language
- Light-first: off-white background, near-black text, generous whitespace.
- Editorial feel: large headings, thin dividers, soft muted secondary text.
- Ukrainian accents are subtle and limited:
  - Your name has a double underline (blue + yellow), 2px each.
  - Active section indicator may use a very faint blue→yellow blob gradient behind the section title.
  - Active nav dot uses accent colors.
- No loud blocks of saturated blue/yellow. Accents only.

Typography
- Font: Inter (default Next/font)
- Headings: very large, tight tracking, bold.
- Body: medium size, relaxed line height.

Layout
- Max width container (e.g., 960–1100px) with responsive padding.
- Sections separated by large vertical spacing and/or thin divider line.

Navigation
Desktop:
- Right-side floating vertical nav list: Home / Projects / Experience / Contact
- Shows active section (scrollspy) and smooth scroll on click.
Mobile:
- Top-right hamburger opens full-screen overlay menu with same items.
- Close button in overlay.

Interactions (subtle only)
- Name underline animates on hover (extends).
- Section headings fade/slide in slightly on scroll.
- Projects list rows have hover states (slight lift/underline).
- Projects expand inline (accordion) with smooth open/close.
- Smooth scroll to anchors.

Projects section
- Vertical list rows, each shows:
  - Title
  - One-line description
  - Tags (pills)
  - Expand affordance (chevron/plus)
- On expand: 2–5 bullets + links (GitHub/demo/writeup) if present.

Experience section
- Vertical timeline: left border line + entries.
- Each entry: role/org, dates, bullets, optional tags.

Contact section
- Big "Contact." heading and small subtitle.
- Primary contact line: email with arrow.
- Secondary rows: location + availability.
- Social links: GitHub, LinkedIn (and others if present).

Content rules
- All displayed content must be derived from `content/profile.json`.
- If a field is missing, hide that UI element gracefully (do not render placeholders).
