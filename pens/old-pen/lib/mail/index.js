const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const GoogleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const PATH =
  process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const TOKEN_DIR = `${PATH}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}gmail-nodejs-quickstart.json`;
const content = require('./client_secret');

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ', TOKEN_PATH);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err)
        return console.log('Error while trying to retrieve access token', err);

      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail('v1');
  gmail.users.labels.list({ auth, userId: 'me' }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ', err);
      return;
    }
    const labels = response.labels;

    if (labels.length === 0) {
      console.log('No labels found.');
    } else {
      console.log('Labels:');
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        console.log('-', label.id, label.name);
      }
    }
  });
}

function getLabel(auth) {
  const gmail = google.gmail('v1');
  gmail.users.labels.get(
    { auth, userId: 'me', id: 'Label_21' },
    (err, response) => {
      if (err) return console.log('The API returned an error: ', err);
      console.log('response', response);
    }
  );
}

function getMessage(auth, id = '155172eb90974fa0') {
  const gmail = google.gmail('v1');
  gmail.users.messages.get(
    {
      auth,
      id,
      userId: 'me',
      format: 'metadata',
    },
    (err, response) => {
      if (err) return console.log('The API returned an error: ', err);
      console.log(
        'From:',
        response.payload.headers.filter(o => o.name === 'From')[0].value
      );
    }
  );
}

function getMessages(auth) {
  const gmail = google.gmail('v1');
  gmail.users.messages.list(
    { auth, userId: 'me', labelIds: 'Label_21' },
    (err, response) => {
      if (err) return console.log('The API returned an error: ', err);
      // console.log('response', response);

      response.messages.forEach(m => {
        setTimeout(() => {
          getMessage(auth, m.id);
        }, 500);
      });
    }
  );
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

// Authorize a client with the loaded credentials, then call the
// Gmail API.
authorize(content, getMessages);
