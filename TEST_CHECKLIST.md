# Final Deployment Checklist

## Before deployment

- [ ] Confirm the four events and their date/time/venue details.
- [ ] Confirm the love story text and all three story images.
- [ ] Confirm all family names in English and Marathi.
- [ ] Set `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` in Vercel.
- [ ] Share the Google Sheet with the service-account email as an editor.

## After deployment

- [ ] Open the invitation on a current iPhone and Android phone.
- [ ] Test the curtain → Ganpati → names → invitation flow.
- [ ] Confirm there is no horizontal scrolling and all chapter headings remain centered.
- [ ] Confirm all four event images, map links, QR codes, and calendar downloads work.
- [ ] Submit one real RSVP and verify a new row appears in `RSVP Responses`.
- [ ] Test a personalized link such as `?guest=GuestName&gid=G001`.
- [ ] Send the live link to WhatsApp and confirm the title, description, and preview image appear correctly.
- [ ] Test once with Reduce Motion enabled.

## Notes

The site intentionally includes `noindex` metadata so a private wedding link is less likely to appear in search-engine results. Secondary images are lazy-loaded for mobile performance.
