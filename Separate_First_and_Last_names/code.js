// Code Developed by Manideep Chaudhary from https://productivesheets.com

function splitNames() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const names = sheet.getActiveRange().getValues();
  const rowindex = sheet.getActiveRange().getRowIndex();
  const colindex = sheet.getActiveRange().getColumn();

  const splitFullName = (fullName) => (arr => [arr.shift(), arr.pop()])(fullName.trim().split(' '));

  const output = typeof names === 'string' ? [splitFullName(names)] : names.map(([fullName]) => splitFullName(fullName));
 
  sheet.getRange(rowindex,colindex+1,names.length,2).setValues(output);
}


function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom').addItem('Separate First and Last names', 'splitNames').addToUi()
}
