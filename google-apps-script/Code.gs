// LeadbyLead Google Sheets receiver.
// Deploy as a Web app, set WEBHOOK_SECRET in Script Properties, and restrict
// access according to the deployment's operational policy.
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
  const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");

  if (!expectedSecret || payload.webhook_secret !== expectedSecret) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" })).setMimeType(
      ContentService.MimeType.JSON,
    );
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

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

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
