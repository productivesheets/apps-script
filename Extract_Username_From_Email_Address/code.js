//Code Developed by Manideep Chaudhary from https://productivesheets.com
function emailsfirstLastNames() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeRange = sheet.getActiveRange().getValues();
  const Row = sheet.getActiveRange().getRowIndex();
  const Col = sheet.getActiveRange().getColumn();

  const result = activeRange.map(email => {
    const [firstname, lastname = "Last name not Exists"] = email[0].split("@")[0].split(".");
    return [firstname, lastname];
  });

  sheet.insertColumnsAfter(Col, 2)
  sheet.getRange(Row,Col+1,sheet.getMaxRows(),2).clearFormat();
  sheet.getRange(Row,Col+1,activeRange.length,2).setValues(result);
}

function emails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeRange = sheet.getActiveRange().getValues();
  const Row = sheet.getActiveRange().getRowIndex();
  const Col = sheet.getActiveRange().getColumn();

  const result =  activeRange.map(function(converttosub){
      return converttosub.map((first) => { 
        updatedata = first.indexOf('@') !== -1 ? first.split('@')[0] : ""
        return updatedata;
      });
  })
  
  sheet.insertColumnAfter(Col)
  sheet.getRange(Row,Col+1,sheet.getMaxRows(),2).clearFormat();
  sheet.getRange(Row,Col+1,activeRange.length,1).setValues(result);
}



function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom')
    .addItem('Extract Full names from emails address', 'emails')
    .addItem('Extract First and Last name from emails address', 'emailsfirstLastNames')
    .addToUi();
}
