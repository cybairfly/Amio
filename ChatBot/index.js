'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');

//const port = process.env.PORT || 443;
const options = {
    key: fs.readFileSync( './key.key' ),
    cert: fs.readFileSync( '/var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt' ),
    requestCert: false,
    rejectUnauthorized: false
};
console.log(options.key);
console.log(options.cert);
// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

//const _http = http.createServer(app);
const _https = https.createServer(options, app);

//_http.listen(80, () => console.log(`Listening on: ${_http.address().port}`));
_https.listen(8080, () => console.log(`Listening on: ${_https.address().port}`));

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

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

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "Cryptolaemusmontrouzieri"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

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
