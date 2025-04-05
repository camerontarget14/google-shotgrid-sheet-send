/**
 * Updates formulas in columns E and F based on data in column B
 * Column D contains dropdowns that should be preserved
 */
function updateFormulasBasedOnColumnB() {
  // Check workflow state
  var state = getWorkflowState();
  if (state < 1) {
    SpreadsheetApp.getUi().alert(
      "Please match up your client names to internal first!",
    );
    return;
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // Get all data in the sheet
  var data = sheet.getDataRange().getValues();

  // Skip header row and template row (rows 1 and 2)
  for (var i = 2; i < data.length; i++) {
    var row = i + 1; // Convert to 1-based row index
    var hasDataInColumnB = data[i][1] !== ""; // Column B is index 1

    if (hasDataInColumnB) {
      // Add formulas to this row
      addFormulas(sheet, row);
    } else {
      // Clear values from this row
      clearFormulasAndValues(sheet, row);
    }
  }

  // After successful execution, set workflow state to 2
  setWorkflowState(2);

  // Show confirmation
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Notes prepared successfully.",
    "Success",
    5,
  );
}

/**
 * Adds formulas to a specific row
 */
function addFormulas(sheet, targetRow) {
  // Get the formulas from E2 and F2
  var formulaE2 = sheet.getRange("E2").getFormula();
  var formulaF2 = sheet.getRange("F2").getFormula();

  // Copy formula from E2 to E{targetRow} if there's a formula in E2
  if (formulaE2 !== "") {
    var cellE = sheet.getRange(targetRow, 5); // Column E is index 5
    var adjustedFormulaE = adjustFormula(formulaE2, 2, targetRow);
    cellE.setFormula(adjustedFormulaE);
  }

  // Copy formula from F2 to F{targetRow} if there's a formula in F2
  if (formulaF2 !== "") {
    var cellF = sheet.getRange(targetRow, 6); // Column F is index 6
    var adjustedFormulaF = adjustFormula(formulaF2, 2, targetRow);
    cellF.setFormula(adjustedFormulaF);
  }
}

/**
 * Clears formulas and values from a specific row but keeps dropdowns
 */
function clearFormulasAndValues(sheet, targetRow) {
  // Clear only the value in column D, keep dropdown
  var cellD = sheet.getRange(targetRow, 4); // Column D is index 4
  cellD.clearContent();

  // Clear the formula in column E
  var cellE = sheet.getRange(targetRow, 5); // Column E is index 5
  cellE.clearContent();

  // Clear the formula in column F
  var cellF = sheet.getRange(targetRow, 6); // Column F is index 6
  cellF.clearContent();
}

/**
 * Adjusts formula references from source row to target row
 * This handles both absolute and relative references
 */
function adjustFormula(formula, sourceRow, targetRow) {
  // Regular expression to find cell references
  var regex = /([A-Z]+)(\$?)([0-9]+)/g;

  // Replace row numbers that match the source row
  return formula.replace(regex, function (match, column, absoluteSign, row) {
    // If it's an absolute row reference (with $) or not the source row, keep it unchanged
    if (absoluteSign === "$" || parseInt(row) !== sourceRow) {
      return match;
    }
    // Otherwise, adjust the row number to the target row
    return column + targetRow;
  });
}
