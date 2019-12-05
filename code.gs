function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function delete_One(one) {
  var url = "https://docs.google.com/spreadsheets/d/1qO4qmB16ZEJnUWilwUo9MDdW_zDzI1DtHc7qUIGBbUQ/edit#gid=0";
  var spread_sheet = SpreadsheetApp.openByUrl(url);
  var ws = spread_sheet.getSheetByName("trails");
  ws.deleteRow(one);
  return;
}

function add_One(t_name, sum, dif, star, loca, dis, ele, sea) {
  var url = "https://docs.google.com/spreadsheets/d/1qO4qmB16ZEJnUWilwUo9MDdW_zDzI1DtHc7qUIGBbUQ/edit#gid=0";
  var spread_sheet = SpreadsheetApp.openByUrl(url);
  var ws = spread_sheet.getSheetByName("trails");
  ws.appendRow([t_name, sum, dif, star, loca, dis, ele, sea]);
  return;
}

function listAllScripts() {
  var url = "https://docs.google.com/spreadsheets/d/1qO4qmB16ZEJnUWilwUo9MDdW_zDzI1DtHc7qUIGBbUQ/edit#gid=0";
  var spread_sheet = SpreadsheetApp.openByUrl(url);
  var ws = spread_sheet.getSheetByName("trails");
  var i = 0;
  var range = ws.getRange(1, 1);
  var lastRow = ws.getLastRow();
  var lastColumn = ws.getLastColumn();
  var value = range.getValue();
  var value_desciption = range.getValue();
  var scriptList = [];
  for (i=2; i<lastRow+1; i++){
    range = ws.getRange(i, 1);
    value = range.getValue();
    range = ws.getRange(i, 2);
    value_description = range.getValue();
    scriptList.push([i, value, value_description]);
  }
  /*
  range = ws.getRange(1, lastColumn);
  value = range.getValue();
  scriptList.push([0, value, "Null"]);
  */
  return scriptList;
}

function display_detail(name) {
  var url = "https://docs.google.com/spreadsheets/d/1qO4qmB16ZEJnUWilwUo9MDdW_zDzI1DtHc7qUIGBbUQ/edit#gid=0";
  var spread_sheet = SpreadsheetApp.openByUrl(url);
  var ws = spread_sheet.getSheetByName("trails");
  var lastColumn = ws.getLastColumn();
  var lastRow = ws.getLastRow();
  var range = ws.getRange(1, 1);
  var value = range.getValue();
  var i = 0;
  var j = 0;
  var response = [];
  var header = "";
  for (i=2; i<lastRow+1; i++) {
    if (i==name) {
      for (j=1; j<lastColumn+1; j++) {
        range = ws.getRange(1, j);
        header = range.getValue();
        range = ws.getRange(i, j);
        value = range.getValue();
        response.push(header + " : " + value);
      }
      /*
      range = ws.getRange(1, lastColumn);
      value = range.getValue();
      response.push([0, value, "Null"]);
      */
      return response;
    }
  }
  return response;
}

function search_by_name(name) {
  var url = "https://docs.google.com/spreadsheets/d/1qO4qmB16ZEJnUWilwUo9MDdW_zDzI1DtHc7qUIGBbUQ/edit#gid=0";
  var spread_sheet = SpreadsheetApp.openByUrl(url);
  var ws = spread_sheet.getSheetByName("trails");
  var i = 0;
  var range = ws.getRange(1, 1);
  var lastRow = ws.getLastRow();
  var lastColumn = ws.getLastColumn();
  var value = range.getValue();
  var value_desciption = range.getValue();
  var scriptList = [];
  for (i=2; i<lastRow+1; i++){
    range = ws.getRange(i, 1);
    value = range.getValue();
    range = ws.getRange(i, 2);
    value_description = range.getValue();
    if (value.toString().toLowerCase().indexOf(name.toString().toLowerCase()) > -1){
        scriptList.push([i, value, value_description]);
    }
  }
  
  if (scriptList.length < 1){
    return ["No script found"];
  }
  /*
  range = ws.getRange(1, lastColumn);
  value = range.getValue();
  scriptList.push([0, value, "Null"]);
  */
  return scriptList;
}

function search_by_season(name) {
  var dic = {
    "Jan" : 1,
    "Feb" : 2,
    "Mar" : 3,
    "Apr" : 4,
    "May" : 5,
    "Jun" : 6,
    "Jul" : 7,
    "Aug" : 8,
    "Sep" : 9,
    "Oct" : 10,
    "Nov" : 11,
    "Dec" : 12,
  }
  var d_name = dic[name];
  var url = "https://docs.google.com/spreadsheets/d/1qO4qmB16ZEJnUWilwUo9MDdW_zDzI1DtHc7qUIGBbUQ/edit#gid=0";
  var spread_sheet = SpreadsheetApp.openByUrl(url);
  var ws = spread_sheet.getSheetByName("trails");
  var i = 0;
  var range = ws.getRange(1, 1);
  var lastRow = ws.getLastRow();
  var lastColumn = ws.getLastColumn();
  var value = range.getValue();
  var value_desciption = range.getValue();
  var scriptList = [];
  for (i=2; i<lastRow+1; i++){
    range = ws.getRange(i, 8);
    value = range.getValue();
    var start = 0;
    var end = 0;
    if (value != "Year round"){
      start = dic[value.split('-')[0]];
      end = dic[value.split('-')[1]];
      Logger.log(start);
      Logger.log(end);
    }
    if (start == 0){
      range = ws.getRange(i, 1);
      value = range.getValue();
      range = ws.getRange(i, 2);
      value_description = range.getValue();
      scriptList.push([i, value, value_description]);
    }
    else if (start <= d_name && d_name <= end) {
      range = ws.getRange(i, 1);
      value = range.getValue();
      range = ws.getRange(i, 2);
      value_description = range.getValue();
      scriptList.push([i, value, value_description]);
    }
  }
  
  if (scriptList.length < 1){
    return ["No script found"];
  }
  /*
  range = ws.getRange(1, lastColumn);
  value = range.getValue();
  scriptList.push([0, value, "Null"]);
  */
  return scriptList;
}