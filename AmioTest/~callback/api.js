const cfg = require('./cfg');
const request = require('request');

const logSyntax = () => console.log(`\nCallback:\n`);

const getStatus = (channel, callback) => {
  const config = cfg.getConfig(`channels/${channel}`, 'GET');
  request(config, (error, response, body) => callback(body));
}

const getContacts = (channel, callback) => {
  const then = (error, response, body) => {
    if (!error) {
      //const ids = body.map(contact => contact.id);
      const ids = ['1803539683052785'];
      if (callback) {
        callback.arguments.unshift(ids);
        callback.function(...callback.arguments);
      }
    }
    else console.log(error);
  }
  const config = cfg.getConfig(`channels/${channel}/contacts`, 'GET');
  request(config, then);
}

const postMessage = (id, message, callback) => {
  const date = new Date(Date());
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  const time = `Ahoj ${hours}:${minutes}:${seconds}`;

  message.contact.id = `${id}`;
  message.content.payload = time;

  const config = cfg.getConfig(`messages`, 'POST');
  config.body = message;
  request(config, (error, response, body) => callback(body));
}

const messageAll = (ids, message) => {
  ids.map(id => postMessage(id, message, (message) => console.log(message)));
}

const logStatus = (channel) => {
  getStatus(channel, (status) => console.log(status));
}

const postMessages = (channel, message) => {
  getContacts(channel, {
    function: messageAll,
    arguments: [message]
  });
}

module.exports = {
  logSyntax,
  getStatus,
  getContacts,
  postMessage,
  messageAll,
  logStatus,
  postMessages
}
