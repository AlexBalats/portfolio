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
  - Your name has a double underline (blue + yellow).
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

Hero underline
- Underline is thicker and longer (approx 6px height, ~65% name width).
- Hover: underline extends and slightly overshoots, then settles.
- Optional: name lifts up ~2px on hover with underline animation.

Hero intro animation (identity reveal)
- On first load: show initials "JB." then reveal full name "Jeremy Balat" using a masked wipe (Option B: clip-path / overflow mask), left-to-right, total hero sequence ~900ms.
- Sequence order: name reveal first  then Ukrainian double underline draws  then tagline fades in  then buttons fade in.
- Ukrainian accent should remain subtle: underline is blue (#0057B7) above yellow (#FFD700), and during the name reveal the mask may use a VERY faint blueyellow gradient glow (opacity <= 0.08) behind the text, only while animating.
- No looping. No typewriter effect. Keep it polished and minimal.
- Must respect prefers-reduced-motion: if user prefers reduced motion, render final state immediately (full name, underline, tagline, buttons) without animation.

Hero intro sequencing
- During the hero intro animation, hide the rest of the page (Projects/Experience/Contact and side nav).
- After the hero animation completes, fade in the rest of the page (opacity 0  1, y: 8px  0).
- Respect prefers-reduced-motion (skip delays and show final state immediately).

Ukrainian visual polish
- Add a very faint blueyellow radial gradient behind the hero during the intro only.
- Gradient opacity  0.08, heavily blurred, subtle and professional.
- Fade the gradient out once the hero intro finishes.
- Add subtle Ukrainian accent dots to section headers:
  - Projects  blue dot
  - Experience  yellow dot
  - Contact  split blue/yellow dot

Background + texture
- Use a warm off-white page background (slight beige tint, not pure white).
- Add a subtle grain/noise overlay across the page (opacity ~0.04, pointer-events none).
- Grain should be barely visible; do not reduce readability.

Hero  About  Projects flow
- Remove the hard divider line between the hero and the Projects section.
- Add an "About" micro-section directly below the hero CTA buttons to make the whitespace intentional.
- About layout: small uppercase kicker "ABOUT", 23 sentence paragraph, then 3 focus chips.

Scroll cue
- Add a small "Scroll" cue at the bottom of the hero (label + thin line).
- Subtle motion only; hide/fade it once the user scrolls down.
- Respect prefers-reduced-motion (no animation; cue may be hidden or static).

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
