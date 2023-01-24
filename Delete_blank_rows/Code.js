//Code Developed by Manideep Chaudhary from https://productivesheets.com
function removeEmptyRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeRange = sheet.getActiveRange().getValues();
  let rowIndex = sheet.getActiveRange().getRowIndex();
  const colIndex = sheet.getActiveRange().getColumn();
  const numColumns = sheet.getActiveRange().getNumColumns();

  activeRange.forEach((item, index) => {
  if (item.every(element => element.toString().trim().length === 0)) {
    sheet.getRange(index + rowIndex, colIndex, 1, numColumns).deleteCells(SpreadsheetApp.Dimension.ROWS);
    rowIndex--;
  }
  });
}

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Removes')
    .addItem('Remove empty rows', 'removeEmptyRows')
    .addToUi();
  }
}
