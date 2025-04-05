/**
 * Utility functions to manage workflow state
 */
function getWorkflowState() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var state = scriptProperties.getProperty("workflow_state");
  return state ? parseInt(state) : 0;
}

function setWorkflowState(state) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("workflow_state", state);
}

/**
 * Functions to manage notes sent state
 */
function getNotesSentState() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var state = scriptProperties.getProperty("notes_sent_state");
  return state ? parseInt(state) : 0;
}

function setNotesSentState(state) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("notes_sent_state", state);
}

/**
 * Resets all workflow states and clears color formatting
 */
function resetWorkflowState() {
  // Reset the workflow states
  setWorkflowState(0);
  setNotesSentState(0);

  // Get active spreadsheet and the Notes Back sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Notes Back");

  if (sheet) {
    // Get the data range to find the last row with data
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();

    // Skip the header row, process all rows with data
    for (var i = 1; i < values.length; i++) {
      var row = values[i];

      // Check if any of columns D, E, F have data
      if (row[3] || row[4] || row[5]) {
        // D=3, E=4, F=5 (0-indexed)
        // Clear background color for this row's cells in columns D, E, F
        sheet.getRange(i + 1, 4, 1, 3).setBackground(null); // Start at row i+1, column 4 (D), span 3 columns
      }
    }
  }

  // Show confirmation message
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Workflow state has been reset.",
    "Workflow Reset",
    5,
  );
}
