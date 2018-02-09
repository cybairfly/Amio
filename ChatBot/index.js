'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');

const options = {
    key: fs.readFileSync( './ssl/private.key' ),
    cert: fs.readFileSync( './ssl/certificate.crt' ),
    ca: [ fs.readFileSync('./ssl/ca_bundle.crt') ],
    requestCert: false,
    rejectUnauthorized: false
};

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

const _http = http.createServer(app);
const _https = https.createServer(options, app);

const httpPort = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 80;
const httpsPort = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 443;

_http.listen(httpPort, () => console.log(`Listening on: ${_http.address().port}`));
_https.listen(httpsPort, () => console.log(`Listening on: ${_https.address().port}`));

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
  console.log(`post webhook called`);
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

app.get('/', (req, res) => {
      res.status(200).send('meh');
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "EAAGUjD32ZABABANYS4ePNG5ReWkhcSmIZCmUIADSZBsTq54dzr2IuEWDdhssWC5o7ZBnw2IFmMzfjbeXgTDg4e5mjwfiAe3k9tbeN51MhciE2lJsfkHX46MzsvEEu5QrIDLsnkqnSRNpb5sTIXdw0IIiZCDady9JVKQTvxBTqrwZDZD";

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  console.log(mode, token, challenge);

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
