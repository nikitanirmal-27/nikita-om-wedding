# V1.0.3 — Festive first-page refinement

- Cleaned up the left side of the first scrolling page so it feels less messy and more polished.
- Added a richer festive hero background with warm celebratory detailing.
- Turned the left text area into a cleaner decorative panel for better desktop balance.
- Improved large-screen spacing while keeping mobile layouts comfortable on Android and iOS.

# V1.0.2 — Hero polish and festive first page

- Restored the Ganpati opening image presentation and constrained its size for a cleaner reveal.
- Removed the "Our story, illustrated with love." label from the first scrolling page.
- Made the first scrolling page feel more festive with subtle decorative accents.
- Improved desktop layout so the opening section uses wide screens more gracefully.
- Refined mobile sizing for Android and iOS style viewports with cleaner spacing and less scroll.

# V1.0.1 — Compact first page

- Reduced the first-page hero image display size so the opening screen feels cleaner and requires less scrolling.
- Added viewport-aware height limits for the hero image on desktop and mobile.
- Tightened the first-page spacing to keep the opening experience more elegant and compact.

# V1.0.0 | Deployment-ready cleanup

- Corrected the celebrations subtitle from three to four events.
- Removed stale Worli-section markup/CSS and the unused wedding reference asset.
- Removed the Open Graph domain placeholder and completed social preview metadata.
- Added favicon/preloads, image dimensions, lazy decoding, mobile form autocomplete, and accessibility refinements.
- Added a fallback when IntersectionObserver is unavailable.
- Improved RSVP timeout/error handling and removed the inaccurate “saved locally” message.
- Hardened the RSVP API with content-type checks, strict guest-count validation, no-store responses, and RAW Google Sheets writes to avoid formula interpretation.
- Added Vercel security headers and safer cache behavior for assets.
- Added `.gitignore`, `.env.example`, updated deployment documentation, and bumped the project to V1.0.0.

# V0.7.8 — Mobile view polish

- Added extra mobile-specific spacing, typography, and layout refinements so the invitation looks cleaner on phones.
- Improved mobile presentation for the intro, hero, countdown, event cards, story section, RSVP, family, and closing sections.
- Kept story headings centered and preserved the taller story-image treatment.
- No content or functionality was changed.

# V0.7.7 — Story section visual refinement

- Increased the story image height so the photos feel longer and better balanced with the paragraph content.
- Centered the story paragraph headings/chapter titles for a cleaner and more romantic presentation.
- Preserved the love story text, event details, images, RSVP, maps, QR codes, and guest personalization.

# v0.7.6 - Romantic Love Story

- Replaced the previous Our Story copy with the finalized romantic three-chapter love story.
- Added the new chapter titles: When Her Chaos Found His Calm, When Fate Brought Them Back Together, and Two Best Friends, A Thousand Adventures & One Forever.
- Updated the story section heading to Our Love Story.

# V0.7.5 — Worli personality section removed

- Removed the entire “Rooted in Worli” / “Our city. Our coast. Our celebration.” section, including the decorative boat-wave line and descriptive paragraph.
- No event details, images, RSVP, maps, QR codes, calendar buttons, countdown, or personalized-link logic were changed.

# V0.7.4 — Wedding image updated

- Replaced the Wedding section artwork with the selected Marathi wedding portrait.
- Optimized the wedding image to WebP for faster mobile loading.
- Preserved all wedding details, RSVP, maps, QR, calendar, countdown, and event order.

# V0.7.3 — Sakharpuda artwork updated

- Replaced the Sakharpuda/Engagement section artwork with the selected close-up ring illustration.
- Kept Sakharpuda date, time, venue, map, QR code and calendar functionality unchanged.
- Preserved event order: Sakharpuda → Sangeet → Haldi → Wedding.

# V0.7.2 — Celebration sequence reordered

- Rearranged the "The Celebrations Begin" event sequence to:
  1. Sakharpuda
  2. Sangeet
  3. Haldi
  4. Wedding
- No event details or functionality were changed.

# V0.7.1 — Haldi details filled

- Added final Haldi details.
- Date: 25 November 2026
- Day: Wednesday
- Time: 7:00 PM
- Venue/address/maps/QR reused from the engagement venue (B.P.T. Colony, Worli Gaon, Worli, Mumbai – 400030).

# V0.7 — Haldi section added

- Added a new Haldi event section with the selected festive yellow-lehenga image.
- Inserted Haldi into the events flow between Sakharpuda and Sangeet.
- Made event cards support optional / coming-soon details, so Haldi can be shown now even before final date, time, venue and links are confirmed.
- Existing RSVP, maps, QR, calendar, countdown and personalized guest logic remain intact.

# V0.6.2 — Sakharpuda image framing fix

- Reframed the Sakharpuda image so the couple is larger and better centered, similar to the Sangeet section.
- Reduced excess empty space at the top of the Sakharpuda artwork.
- No event details or functionality were changed.

# V0.6.1 — Critical startup fix

- Fixed a JavaScript crash caused by the removed `heroFullNames` HTML element.
- The hero now safely supports the simplified `Nikita & Om` layout.
- Sakharpuda and Sangeet images remain integrated.
- No wedding details, RSVP, map, QR, calendar, or personalized-link logic was changed.

# V0.6 — Event Artwork Integration

- Added the selected red-lehenga couple illustration to the Sakharpuda section.
- Added the selected blue-lehenga Nikita illustration to the Sangeet section.
- Optimized both event images to WebP for faster mobile loading.
- Kept event artwork correctly cropped without distortion.
- Preserved prior requested text refinements:
  - Hero: `Nikita & Om` on one line only.
  - Removed the extra Marathi × Kokani hero label and repeated hero names.
  - Countdown: `Counting down to our forever ❤️`.
  - `SAKHARPUDA` and `Sangeet` kept on one line.
- RSVP, maps, QR codes, calendar, personalized guest URL logic and wedding details remain unchanged.

# Changelog — V0.3 (Animation + Front-End Polish pass)

Scope of this pass: animation and front-end polish only. No wedding details,
names, dates, venues, Marathi text, RSVP logic, countdown target, or map/
calendar functionality were changed. All edits are in `styles.css` (plus one
line of context added as a code comment); `wedding-data.js`, `script.js`
logic, `api/rsvp.js`, and all assets are untouched.

## 🔴 Critical fix (found during mobile QA, fixed before anything else)

- **Opening curtains were untappable on real phones.** `.intro-stage` (which
  holds "Tap to begin," the Ganpati reveal, and "Open Our Invitation") had a
  lower `z-index` than the curtain panels. The curtains visually sat on top
  of the interactive layer, so a guest opening the link from WhatsApp would
  see a plain maroon screen with nothing to tap and no way into the site.
  Fixed by raising `.intro-stage` above `.curtain` in the stacking order.
  Verified the full tap → Ganpati → names → "Open Our Invitation" → hero
  flow now works at 390×844 and 375×667.

## 🟠 Layout fix

- **"SAKHARPUDĀ" event title nearly touched the card edges.** The title's
  responsive font-size (`12vw`) was too aggressive for that specific
  10-character word, leaving almost no margin inside the card. Tightened the
  clamp so long titles keep comfortable breathing room on small screens;
  "SANGEET" and "शुभ विवाह" still look correct at the new size.

## 🎬 Animation & polish additions (all CSS-only, no new JS, no new libraries)

1. **Opening curtain** — added a gold valance trim across the top of each
   panel and a very brief settle-in on first paint, for a more theatrical,
   less "CSS demo" feel.
2. **Ganpati welcome / petals** — petal fall now sways gently side-to-side
   instead of dropping in a straight line (still the same lightweight
   6-span, transform-only animation — no extra DOM, no performance cost).
3. **Open Our Invitation** — the intro content now lifts slightly and fades
   as it hands off to the main site, instead of a hard cut.
4. **Hero couple section** — the couple artwork now has a very slow, subtle
   float (±8px, 7s loop). Two faint low-opacity flourish glyphs drift in the
   background. The couple photo itself is untouched — no distortion, no
   "wobble."
5. **Countdown** — the four digit tiles (Days/Hours/Minutes/Seconds) now
   reveal with a short stagger instead of popping in all at once. Countdown
   logic and target time are unchanged.
6. **Sakharpuda** — the ring icon has a subtle twinkle (opacity/scale pulse,
   no glitter overload).
7. **Sangeet** — added a row of tiny twinkling "fairy lights" across the
   scene art and a gentle bounce on the music notes.
8. **Wedding (featured card)** — the diya flame has a soft flicker, the card
   has a slow breathing gold glow, and two small petals drift down inside
   the card only (clipped to the card, so they never spill onto the page).
9. **All buttons** — added tap feedback (`scale(.96)` on `:active`) across
   "Get Directions," "Add to Calendar," "Open in Maps," and the primary
   buttons, per the venue/map section's polish request.
10. **Our Story** — each chapter now reveals in sequence — photo first,
    then heading, then body copy — instead of the whole card fading in as
    one flat block.
11. **RSVP** — form fields settle in with a short stagger as the card scrolls
    into view, and inputs lift very slightly on focus. Form fields,
    validation, and the POST to `/api/rsvp` are unchanged.
12. **Family** — the two family cards reveal with a slight stagger. All
    names and Marathi text are byte-for-byte unchanged from the source
    brief.
13. **Closing** — the monogram now has a slow breathing gold glow, and two
    small petals drift inside the card (clipped, contained).

## ✅ Explicitly preserved / not touched

- All wedding details, dates, times, venues, family names, and Marathi text
- Countdown target (`2026-11-26T12:16:00+05:30`)
- RSVP form fields, validation, and `/api/rsvp` POST structure
- Google Maps links, QR codes, "Add to Calendar" (.ics) logic
- Personalized guest URL handling (`?guest=Name&gid=G001`)
- Music button (still prepared, still hidden with no `music.src` set)
- All images/assets (no couple images replaced or modified)

## Performance notes

- No new JavaScript, no animation libraries, no new network requests.
- Every new animation uses only `transform`, `opacity`, `filter`, or
  `box-shadow` — all GPU-friendly, none trigger layout reflow.
- Every decorative animation is wrapped in
  `@media (prefers-reduced-motion: no-preference)` **and** the existing
  blanket `prefers-reduced-motion: reduce` override still neutralizes
  everything for guests with that OS setting — verified both ways.
- Petal effects inside cards (wedding card, closing card) are clipped with
  `overflow: hidden` on their container so they can never spill outside the
  card or affect page scroll height.
