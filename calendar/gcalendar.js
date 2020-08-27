const path = require("path");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// const calendarRoutes = require("");

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

// const registerRoutes = () => {
//   appServer.use("/calandar", calendarRoutes);
//   console.log("calendar routes regisered")
// };

const init = (app) => {
  appServer = app;
  loadCredentials();
  // registerRoutes();
}

const eventTemplate = {
  summary: 'OBO Inspection 2',
  location: 'Talisay City',
  description: 'Residential House',
  start: {
    dateTime: '2020-08-28T09:00:00-07:00',
    timeZone: 'Asia/Manila',
  },
  end: {
    dateTime: '2020-08-28T12:00:00-07:00',
    timeZone: 'Asia/Manila',
  },
  recurrence: [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  attendees: [
    {email: 'jzamss@gmail.com'},
  ],
  reminders: {
    useDefault: false,
    overrides: [
      {method: 'email', minutes: 24 * 60},
      {method: 'popup', minutes: 10},
    ],
  },
};


const scheduleEvent = async (info = {}) => {
  const event = {...eventTemplate, ...info}
  return await authorize((auth) => postEvent(auth, event));
}

const postEvent = (auth, newEvent) => {
  const calendar = google.calendar({version: 'v3', auth});
  return new Promise((resolve, reject) => {
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: newEvent,
    }, function(err, event) {
      if (err) {
        reject('There was an error contacting the Calendar service: ' + err);
        // console.log('There was an error contacting the Calendar service: ' + err);
        // return;
      } else {
        console.log(`Event ${event.data.htmlLink} successfully posted`);
        resolve(event.data.htmlLink);
      }
    });
  })
}

const authorize = (callback) => {
  const {client_secret, client_id, redirect_uris} = CREDENTIALS.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // check stored a token
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client)
        .then(data => resolve(data))
        .catch(err => reject(err))
    });
  })
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
  scheduleEvent
}