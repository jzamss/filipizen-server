const path = require("path");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly', 
    'https://www.googleapis.com/auth/calendar.events'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.resolve("calendar",'token.json');
const CREDENTIALS_PATH = path.resolve("calendar",'credentials.json');
let CREDENTIALS;

const loadCredentials = () => {
  const content = fs.readFileSync(CREDENTIALS_PATH);
  CREDENTIALS = JSON.parse(content);
}

let appServer;

const init = (app) => {
  appServer = app;
  loadCredentials();
}

const insertEvent = (event) => {
  const insert = (auth, newEvent) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: newEvent,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
      } else {
        console.log(`Event ${event.data.htmlLink} successfully posted`);
      }
  })};
  authorize(event, insert);
}

const authorize = (event, callback) => {
  const {client_secret, client_id, redirect_uris} = CREDENTIALS.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, event);
  });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
      });
      callback(oAuth2Client);
    });
  });
}


module.exports = {
  init,
  insertEvent
}