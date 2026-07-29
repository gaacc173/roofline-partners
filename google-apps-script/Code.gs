/**
 * Google Apps Script Web App that receives lead POSTs from the site's
 * submit-lead server action and appends a row to the bound Google Sheet.
 *
 * SETUP
 * 1. Create (or open) a Google Sheet for leads. Add a header row:
 *    timestamp | status | source | name | email | phone | username |
 *    preferred_contact_method | company_name | service_area |
 *    selected_package | best_contact_time | notes | consent_timestamp
 * 2. In the sheet, go to Extensions -> Apps Script.
 * 3. Delete any starter code and paste this file's contents in.
 * 4. Click Deploy -> New deployment -> select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone with the link
 * 5. Copy the Web App URL and set it as GOOGLE_SHEETS_WEBHOOK_URL in
 *    .env.local (and in your Vercel project's environment variables).
 * 6. Re-deploy (Deploy -> Manage deployments -> Edit -> New version)
 *    any time you change this file — the URL stays the same.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const rowId = Utilities.getUuid();
    sheet.appendRow([
      new Date().toISOString(),
      safeCell(data.status || "new"),
      safeCell(data.source || ""),
      safeCell(data.name || ""),
      safeCell(data.email || ""),
      safeCell(data.phone || ""),
      safeCell(data.username || ""),
      safeCell(data.preferred_contact_method || ""),
      safeCell(data.company_name || ""),
      safeCell(data.service_area || ""),
      safeCell(data.selected_package || ""),
      safeCell(data.best_contact_time || ""),
      safeCell(data.notes || ""),
      safeCell(data.consent_timestamp || ""),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, id: rowId })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Prevent user-controlled values from being interpreted as spreadsheet formulas.
 * Google Sheets removes the leading apostrophe when displaying the cell value.
 */
function safeCell(value) {
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
