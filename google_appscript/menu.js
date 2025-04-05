/**
 * Creates a custom menu when the spreadsheet opens
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Baked Tools")
    .addItem("Match Client Names to Internal", "matchClientToInternal")
    .addItem("Prepare Notes", "updateFormulasBasedOnColumnB")
    .addItem("Send Notes to Flow PTR", "triggerSendToFlow")
    .addSeparator()
    .addItem("Reset Workflow", "resetWorkflowState")
    .addToUi();
}
