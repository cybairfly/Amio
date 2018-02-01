// const api = require('./~callback/api');
// const api = require('./~promise/api');
const api = require('./api');
const msg = require('./msg');

const channel = 151679056510772;
const contact = 1803539683052785;

const message = msg.Message(channel, contact);
const notification = msg.Notify(channel, contact);

api.logSyntax();
api.logStatus(channel);
api.postMessages(channel, message);

                                                                  //Multisender
/*
let counter = 0;

function tick() {
  if (counter < 10) {
    api.postMessage(contact, message)
    .then(data => {
        console.log(counter);
        console.log(data.data);
        setTimeout(tick, 1000);
        counter++;
    })
    .catch((e) => console.log(e));
  }
}

tick();
*/
