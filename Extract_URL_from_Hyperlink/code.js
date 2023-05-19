/**
 * Code Developed by Manideep Chaudhary from https://productivesheets.com
 * @productivesheets
 */
function GETLINKmenu() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeRange = sheet.getActiveRange();
  const startRow = activeRange.getRowIndex();
  const column = activeRange.getColumn();
  const numRows = activeRange.getNumRows();

  // Extract the link URLs from the active range's rich text values
  const linkUrls = activeRange.getRichTextValues().map(row => {
    return row.map(cell => cell.getLinkUrl());
  });

  sheet.getRange(startRow,column+1,numRows,1).setValues(linkUrls);
}

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom')
    .addItem('Extract the URL from a Hyperlink', 'GETLINKmenu')
    .addToUi();
}
