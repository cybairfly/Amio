const Request = (channel, contact) => ({
    channel: {
      id: `${channel}`
    },
    contact: {
      id: `${contact}`
    }
});

const Message = (channel, contact) => {
  const request = Request(channel, contact);
  request.content = {
    type: `text`,
    payload: null
  };
  return request;
};

const Notify = (channel, contact) => {
  const request = Request(channel, contact);
  request.type = 'messages_read';
  return request;
};

module.exports = {
  Message,
  Notify
};

/*
const contact = {
  channel: channel,
  contact: contact
};
*/

                                                                      //Factory
/*
const Request = (contact) => ({
  channel: {
    id: `${contact.channel}`
  },
  contact: {
    id: `${contact.contact}`
  }
});

let message = Request(contact);
message.content = {
    type: `text`
};

let notification = Request(contact);
notification.type = "messages_read";
*/

                                                                        //Class
/*
class Request {
  constructor(channel = channel, contact = contact) {
    this.channel = {
      id: `${channel}`
    };
    this.contact = {
      id: `${contact}`
    };
  }
}

let message = new Request();
message.content = {
    "type": `text`,
    "payload": `message`
};

let notification = new Request();
notification.type = "messages_read";
*/

                                                                  //Constructor
/*
function Request(channel = channel, contact = contact) {
  this.channel = {
    id: `${channel}`
  };
  this.contact = {
    id: `${contact}`
  };
}

let message = new Request();
message.content = {
    "type": `text`,
    "payload": `message`
};

let notification = new Request();
notification.type = "messages_read";
*/

                                                                //Object.create
/*
let request = {
  "channel": {
    "id": `${channel}`
  },
  "contact": {
    "id": `${contact}`
  }
}

let message = Object.create(request);
message.content = {
    "type": `text`,
    "payload": `message`
};

let notification = Object.create(request);
notification.type = "messages_read";
*/
