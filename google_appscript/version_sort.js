/**
 * Matches client version data (columns B-C) to internal version codes (column A)
 * Keeps column A fixed and only moves data in columns B-C
 * Includes row 2 in the sorting process
 * Only modifies columns A-C, leaving D onwards untouched
 */
function matchClientToInternal() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // Get data only from columns A-C
  var dataRange = sheet.getRange(1, 1, sheet.getLastRow(), 3); // Columns A-C only
  var values = dataRange.getValues();

  // Extract header row only
  var headerRow = values[0];

  // Get all data rows including row 2
  var dataRows = values.slice(1);

  // Extract shot base name from version string
  // (e.g., "HAL_122_1020_COMP_v016" -> "HAL_122_1020")
  function extractShotBase(versionString) {
    // Skip if empty
    if (!versionString) return "";

    // Try to find pattern like "HAL_123_1234" (project_seq_shot)
    var parts = versionString.split("_");

    // Need at least 3 parts for a valid shot name (project_seq_shot)
    if (parts.length < 3) return versionString;

    // Return the base shot name (first three parts)
    return parts[0] + "_" + parts[1] + "_" + parts[2];
  }

  // Create a dictionary of client versions by shot name
  var clientVersionsByShot = {};

  // First pass: index all client versions (column B) by their shot base
  for (var i = 0; i < dataRows.length; i++) {
    var row = dataRows[i];
    var clientVersion = row[1]; // Column B

    if (clientVersion) {
      var shotBase = extractShotBase(clientVersion);

      if (!clientVersionsByShot[shotBase]) {
        clientVersionsByShot[shotBase] = [];
      }

      clientVersionsByShot[shotBase].push({
        index: i,
        clientVersion: clientVersion,
        notes: row[2], // Column C (notes)
      });
    }
  }

  // Create new result matrix with fixed column A and updated B-C
  var resultRows = [];

  // Iterate through all data rows (including row 2) to keep column A fixed
  for (var i = 0; i < dataRows.length; i++) {
    var row = dataRows[i];
    var internalVersion = row[0]; // Column A

    // Create a new row starting with the original column A value
    var newRow = [internalVersion];

    // If there's an internal version, try to find a matching client version
    if (internalVersion) {
      var shotBase = extractShotBase(internalVersion);
      var matchFound = false;

      // If we have client versions for this shot
      if (
        clientVersionsByShot[shotBase] &&
        clientVersionsByShot[shotBase].length > 0
      ) {
        // Take the first available client version match
        var clientMatch = clientVersionsByShot[shotBase].shift();

        // Add the client version data (B-C)
        newRow.push(clientMatch.clientVersion); // B
        newRow.push(clientMatch.notes); // C

        matchFound = true;
      }

      // If no match found, add empty cells for columns B-C
      if (!matchFound) {
        newRow.push("", ""); // Empty B-C
      }
    }
    // If no internal version, just add empty cells for columns B-C
    else {
      newRow.push("", ""); // Empty B-C
    }

    resultRows.push(newRow);
  }

  // Prepare the final data with only the header row
  var finalData = [headerRow].concat(resultRows);

  // Write the data back to the sheet, BUT ONLY for columns A-C
  dataRange.setValues(finalData);

  // After successful execution, set workflow state to 1
  setWorkflowState(1);

  // Show confirmation
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Client names matched to internal versions successfully.",
    "Success",
    5,
  );
}
