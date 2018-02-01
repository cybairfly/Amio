const cfg = require('./../cfg');
const axios = require('axios');

const logSyntax = () => console.log(`\nPromise:\n`);

const getStatus = (channel) => {
  const config = cfg.getConfig(`channels/${channel}`, 'get');
  return axios(config);
}

const getContacts = (channel) => {
  const config = cfg.getConfig(`channels/${channel}/contacts`, 'get');
  return axios(config);
}

const postMessage = (id, message) => {
  const date = new Date(Date());
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  const time = `Ahoj ${hours}:${minutes}:${seconds}`;

  message.contact.id = `${id}`;
  message.content.payload = time;

  const config = cfg.getConfig(`messages`, 'post');
  config.data = JSON.stringify(message);
  return axios(config);
}

const messageAll = (ids, message) => {
  Promise.all(ids.map(id => postMessage(id, message)))
  .then(messages => messages.map(message => message.data))
  .then(messages => console.log(messages));
}

const notify = (notification) => {
  const config = cfg.getConfig(`notifications`, 'post');
  config.data = JSON.stringify(notification);
  return axios(config);
}

const logStatus = channel => {
  getStatus(channel)
  .then(status => {
    console.log(status.data);
  })
  .catch((e) => console.log(e));
}

const postMessages = (channel, message) => {
  getContacts(channel)
  //.then(contacts => contacts.data.map(contact => contact.id))
  .then(contacts => ['1803539683052785'])
  .then((ids) => messageAll(ids, message))
  .catch((e) => console.log(e));
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
