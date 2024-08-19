var ZEROGPT_API_KEY = 'KEY';
var DETECTION_THRESHOLD = 50;

function processRecentEmails() {
  var aiLabel = getOrCreateLabel('AI');
  var now = new Date();
  var twoMinutesAgo = new Date(now.getTime() - 2 * 60000);
  
  var searchQuery = `is:unread in:inbox after:${secondsSinceEpoch(twoMinutesAgo)} before:${secondsSinceEpoch(now)}`;
  
  Logger.log('Searching for emails with query: ' + searchQuery);
  
  var threads = GmailApp.search(searchQuery);
  Logger.log('Found ' + threads.length + ' threads');
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      Logger.log('Processing message with subject: ' + message.getSubject() + ', received at: ' + message.getDate());
      
      var body = message.getPlainBody();
      if (isAIGenerated(body)) {
        threads[i].addLabel(aiLabel);
        Logger.log('Added AI label to thread with subject "' + threads[i].getFirstMessageSubject() + '"');
        break;  // Label the thread and move to the next one
      }
    }
  }
}

function secondsSinceEpoch(date) {
  return Math.floor(date.getTime() / 1000);
}

function isAIGenerated(text) {
  var url = "https://api.zerogpt.com/api/detect/detectText";
  var payload = JSON.stringify({
    "input_text": text
  });
  var headers = {
    'ApiKey': ZEROGPT_API_KEY,
    'Content-Type': 'application/json'
  };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': headers,
    'payload': payload,
    'muteHttpExceptions': true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    
    Logger.log('ZeroGPT API response: ' + JSON.stringify(responseData));
    
    if (responseData.success && responseData.data.isHuman < DETECTION_THRESHOLD) {
      return true;  // The text is AI-generated
    }
  } catch (error) {
    Logger.log('Error calling ZeroGPT API: ' + error);
  }
  
  return false;  // Default to false if there's an error or the text is human-written
}

function getOrCreateLabel(labelName) {
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
    Logger.log('Created new label: ' + labelName);
  }
  return label;
}

function setupTrigger() {
  // Delete any existing triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Create a new time-based trigger that runs every minute
  ScriptApp.newTrigger('processRecentEmails')
    .timeBased()
    .everyMinutes(1)
    .create();
}