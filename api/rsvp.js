const { google } = require("googleapis");

const cleanText = (value, maxLength) => String(value ?? "")
  .replace(/[\u0000-\u001F\u007F]/g, " ")
  .trim()
  .slice(0, maxLength);

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const contentType = String(req.headers["content-type"] || "");
  if (!contentType.includes("application/json")) {
    return res.status(415).json({ error: "Please submit the RSVP form from the invitation." });
  }

  const body = req.body || {};
  if (body.website) return res.status(200).json({ ok: true }); // honeypot

  const guestName = cleanText(body.guestName, 80);
  const guestId = cleanText(body.guestId, 40);
  const attending = cleanText(body.attending, 8);
  const guestCount = Number.parseInt(body.guestCount, 10);
  const phone = cleanText(body.phone, 30);
  const message = cleanText(body.message, 300);

  if (!guestName || !["Yes", "No"].includes(attending)) {
    return res.status(400).json({ error: "Please complete the required RSVP fields." });
  }
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 6) {
    return res.status(400).json({ error: "Please choose a valid number of guests." });
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return res.status(503).json({ error: "RSVP storage is not configured yet." });
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'RSVP Responses'!A:G",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          new Date().toISOString(),
          guestId,
          guestName,
          attending,
          guestCount,
          phone,
          message
        ]]
      }
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("RSVP append failed", error);
    return res.status(500).json({ error: "We couldn't save your RSVP just now. Please try again." });
  }
};
