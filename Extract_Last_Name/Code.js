/**
 * Code Developed by Manideep Chaudhary from https://productivesheets.com
 * @productivesheets
 */

function Lastpop() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeRange = sheet.getActiveRange().getValues();
  const Row = sheet.getActiveRange().getRowIndex();
  const Col = sheet.getActiveRange().getColumn();
  const Colnum = Col + activeRange[0].length;
  const Rowlength = activeRange.length;
  const name = Array.isArray(activeRange) ? activeRange.map(function(converttosub){
    return converttosub.map((first) => first.split(' ').filter(emptyspace => /\S/.test(emptyspace)).pop());
    }) : activeRange.split(' ').filter(emptyspace => /\S/.test(emptyspace)).pop();
  const SendFirst = sheet.getRange(Row,Colnum,Rowlength,1).setValues(name);
}


function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom').addItem('Extract Last Name', 'Lastpop').addToUi()
}
