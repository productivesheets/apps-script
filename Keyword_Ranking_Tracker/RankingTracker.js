function DailyRankingTracker () {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Daily");
  const lastRowIndexofKeywordslist = sheet.getRange(sheet.getLastRow(), 2).getRow();
  const Keywordslist = sheet.getRange(6, 2,lastRowIndexofKeywordslist-5,1).getValues();
  const Domain = sheet.getRange(3, 2,).getValue().split(/:\s*/)[1].trim();

  const urls = Keywordslist.flat().map(keyword =>
    `https://api.spaceserp.com/google/search?apiKey=cfd9a088-ca3b-4b18-af5b-f80de591405e&name=APIPS&q=${keyword.trim().replace(/\s+/g, '+')}&domain=google.com&gl=us&hl=en&resultFormat=json&pageSize=100&resultBlocks=organic_results`
  );

  const responses = UrlFetchApp.fetchAll(urls);
   const KeywordsRanking = responses.map((response, index) => {
    //[JSON.parse(response.getContentText()).organic_results.find(result => result.domain === Domain)?.position || ">100"]
    const result = JSON.parse(response.getContentText()).organic_results.find(result => result.domain === Domain);
    console.log(index);
    return [result ? result.position : ">100"];
    
  });
  const KeywordsRankingColor = KeywordsRanking.map(row => 
    row.map(value =>
      value >= 1 && value <= 3 ? "#388e3c" :
      value >= 4 && value <= 10 ? "#66bb6a" :
      value >= 11 && value <= 20 ? "#aeea00" :
      value >= 21 && value <= 50 ? "#ffeb3b" :
      value >= 51 && value <= 99 ? "#fbb077" :
      value === '>100' ? "#f8696b" : "#ffffff"
    )
  );


  var columnPosition = 2; // insert new column after the second column
  sheet.insertColumnAfter(columnPosition);
  var maxRows = sheet.getMaxRows();
  sheet.setColumnWidth(columnPosition + 1, 65);
  sheet.getRange(5, columnPosition + 1).setBackground("#243e63")
  .setValue(new Date().toLocaleDateString('default', { month: 'short', day: 'numeric' }))
  .setFontFamily('Rubik')
  .setFontSize(10)
  .setFontColor('#ffffff');//Date Header
  sheet.getRange(5, columnPosition + 1,maxRows-5,1).setBorder(true, true, true, true, true, true, '#e7e7e7', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);//BorderStyle
  sheet.getRange(5, columnPosition,lastRowIndexofKeywordslist-5,1).setBorder(true, true, true, true, true, true, '#e7e7e7', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);//BorderStyleKeywordslist
  sheet.getRange(6, columnPosition + 1,maxRows-5,1).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
  var banding = sheet.getRange(6, columnPosition + 1,maxRows-5,1).getBandings()[0];
  banding.setHeaderRowColor(null)
  .setFirstRowColor('#ffffff')
  .setSecondRowColor('#f3f3f3')
  .setFooterRowColor(null);//Alternative colors

  sheet.getRange(6,columnPosition + 1,lastRowIndexofKeywordslist-5,1)
  .setValues(KeywordsRanking)
  .setBackgrounds(KeywordsRankingColor);
  
}

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom').addItem('Daily Ranking Tracker', 'DailyRankingTracker').addToUi()
}
