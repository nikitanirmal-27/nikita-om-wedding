# Nikita & Om Wedding Invitation | V1.0

Deployment-ready, mobile-first digital wedding invitation for Nikita Nirmal and Om Hunari.

## Included

- Animated curtain opening and Ganpati welcome
- Nikita & Om hero artwork and live wedding countdown
- Four celebration cards in the final order: Sakharpuda, Sangeet, Haldi, Wedding
- Google Maps directions, venue QR codes, and downloadable calendar events
- Three-chapter romantic love story with mobile-optimized images
- Family section with English and Marathi names
- Personalized guest links using `?guest=Name&gid=G001`
- RSVP form with a Vercel serverless endpoint for Google Sheets
- Mobile-first styling, reduced-motion support, lazy-loaded secondary images, and security headers
- WhatsApp/Open Graph preview metadata

## RSVP environment variables

Set these in Vercel Project Settings → Environment Variables. Never place private service-account credentials in browser JavaScript.

- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

The service account must have edit access to the Google Sheet and the sheet must contain a tab named `RSVP Responses` with columns A:G matching the endpoint output.

## Deploy

Import this folder into Vercel or deploy it from a Git repository. Vercel serves the static invitation and automatically deploys `api/rsvp.js` as a serverless function. No build command is required.

After the first deployment, test the live WhatsApp preview. The Open Graph image uses a root-relative URL so it resolves against the deployed host. If a specific social crawler requires an absolute image URL, replace `/assets/ganpati.webp` in `index.html` with the final production-domain URL.

## Editing

Wedding text, dates, event data, story copy, family names, and image paths are centralized in `wedding-data.js`.

Music is intentionally disabled until a track is selected. Add the audio file under `assets/` and set `music.src` in `wedding-data.js` to enable the music button.
