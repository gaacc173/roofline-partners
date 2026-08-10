// LeadbyLead Google Sheets receiver.
// Deploy as a Web app and set the deployed URL as GOOGLE_SHEETS_WEBHOOK_URL.
// Column order intentionally excludes all package/pricing fields.
const HEADERS = [
  "received_at",
  "source",
  "name",
  "email",
  "phone",
  "username",
  "company_name",
  "zip_code",
  "requested_contact_at",
  "requested_contact_timezone",
  "notes",
  "consent_timestamp",
];

function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

  const rowId = Utilities.getUuid();
  sheet.appendRow([
    new Date(),
    payload.source || "contact",
    payload.name || "",
    payload.email || "",
    payload.phone || "",
    payload.username || "",
    payload.company_name || "",
    payload.zip_code || "",
    payload.requested_contact_at || "",
    payload.requested_contact_timezone || "",
    payload.notes || "",
    payload.consent_timestamp || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true, id: rowId })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
