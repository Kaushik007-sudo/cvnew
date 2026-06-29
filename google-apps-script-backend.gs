/**
 * CONTACT FORM BACKEND — Google Apps Script
 * --------------------------------------------------------
 * Use this if rows aren't appearing in your sheet even though
 * the website shows a "Message sent" confirmation.
 *
 * SETUP
 * 1. Open (or create) the Google Sheet you want submissions saved to.
 * 2. In the sheet: Extensions -> Apps Script. Delete any existing code
 *    in Code.gs and paste this in.
 * 3. Replace SHEET_NAME below if your tab isn't called "Sheet1".
 * 4. Click Deploy -> New deployment.
 *      - Select type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions Google asks for.
 * 6. Copy the new Web app URL (it ends in /exec) and paste it into
 *    the `scriptURL` constant in index.html, replacing the old one.
 *
 * IMPORTANT: every time you edit this script afterwards, you must
 * create a NEW deployment version (Deploy -> Manage deployments ->
 * edit (pencil icon) -> New version) or the live /exec URL keeps
 * running the old code.
 */

const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', message: 'Sheet "' + SHEET_NAME + '" not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Add a header row automatically the first time, if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }

    sheet.appendRow([
      new Date(),
      e.parameter.Name || '',
      e.parameter.Email || '',
      e.parameter.Message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: lets you sanity-check the deployment by opening the
 * /exec URL directly in a browser tab — should show {"result":"ready"}
 * rather than a Google login/authorization page.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}
