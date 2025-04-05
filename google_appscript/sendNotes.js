function triggerSendToFlow() {
  // Check workflow state
  var state = getWorkflowState();
  if (state < 1) {
    SpreadsheetApp.getUi().alert(
      "Please match up your client names to internal first!",
    );
    return;
  }
  if (state < 2) {
    SpreadsheetApp.getUi().alert(
      "Please check that your notes are prepped! (body, links and all that)",
    );
    return;
  }

  // Check notes sent state
  var notesSentState = getNotesSentState();
  if (notesSentState === 1) {
    SpreadsheetApp.getUi().alert(
      "Notes have already been sent to Flow PTR. To send again, please reset workflow state first.",
    );
    return;
  }

  // Get active spreadsheet ID and active user
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const userEmail = Session.getActiveUser().getEmail();

  // Call the Firebase function with necessary context
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "sync_notes",
      spreadsheetId: spreadsheetId,
      userEmail: userEmail,
      sheetName: "Notes Back", // Specify the sheet to process
      timestamp: new Date().toISOString(),
    }),
  };

  // Replace with your actual function URL
  const url =
    "YOUR FUNCTION URL WHEREVER YOUR HOSTING";

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());

    // Show success message to user
    if (result.status === "success") {
      // Set notes sent state to 1 to indicate notes have been sent
      setNotesSentState(1);

      SpreadsheetApp.getActiveSpreadsheet().toast(
        "Notes sent to Flow PTR.",
        "Success",
        5,
      );
    } else {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        "Error: " + (result.message || "Unknown error"),
        "Error",
        5,
      );
    }
  } catch (error) {
    Logger.log("Error: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Failed to sync notes. See logs for details.",
      "Error",
      5,
    );
  }
}
