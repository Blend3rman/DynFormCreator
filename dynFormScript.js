function myFunction() {
  
  var form = FormApp.getActiveForm();
  
  //Clear form
  var prevQns = form.getItems();
  
  form.deleteItem(prevQns[0]);
  
  // Form is cleared
  
  var ss = SpreadsheetApp.openById("1JL50HHduQ_VPTazYWR1xwjU2AcfYtZKlG067Chiv0F4");
  var qnSheet = ss.getSheetByName("Questions");
  qnSheet.activate();
  
  var ss1 = SpreadsheetApp.openById("1H_a6VZasGh4lQHS7yzOGrNJlMx10xQV2zTiNnQd9NSk");
  
  Logger.log("Sheet No. %s opened.", qnSheet.getSheetId());

  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss1.getId());
  
  var ui = FormApp.getUi();
  
  var qnArray = [];
  
  var newQn = false;
  
  do{
    var response = ui.prompt("New Question", "Enter a question, or skip to form(Yes to add another, No to stop adding, Cancel to skip)", ui.ButtonSet.YES_NO_CANCEL);
    
    if(response.getSelectedButton() == ui.Button.YES)
    {
      qnArray.push(response.getResponseText());
      newQn = true;
    }
    if(response.getSelectedButton() == ui.Button.NO)
    {
      qnArray.push(response.getResponseText());
      newQn = false;
    }
    if(response.getSelectedButton() == ui.Button.CANCEL)
    { 
      break;
    }
  
  }while(newQn);
  
  Logger.log(qnArray);
  Logger.log(qnArray.length);
  
  for(var j = 0; j< qnArray.length ; j++){
    qnSheet.getRange(ss.getLastRow()+1,1,1,1).setValue(qnArray[j]);
  }
  qnSheet.autoResizeColumn(1);
  
  var savedQnsRange = qnSheet.getDataRange();
  
  Logger.log(savedQnsRange);
  
  var savedQns = savedQnsRange.getValues();
  
  Logger.log(savedQns);
  
  var qnItem = form.addCheckboxItem();
  
  qnItem.setTitle('Select (maximum 20) questions');
  
  qnItem.setChoiceValues(savedQns);
  
  var qnItemValidation = FormApp.createCheckboxValidation()
  .requireSelectAtMost(20)
  .setHelpText("Select at most 20 questions")
  .build();
  
  qnItem.setValidation(qnItemValidation);
  
}
