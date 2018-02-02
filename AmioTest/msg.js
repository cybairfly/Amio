                                                                      //Factory
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

                                                                        //Class
/*
class Request {
  constructor(channel, contact) {
    this.channel = {
      id: `${channel}`
    };
    this.contact = {
      id: `${contact}`
    };
  }
}

class MessageClass extends Request {
  constructor(channel, contact, type = `text`, payload = null) {
    super(channel, contact);
    this.content = {
      type,
      payload
    }
  }
}

class NotifyClass extends Request {
  constructor(channel, contact, type = `messages_read`) {
    super(channel, contact);
    this.type = type;
  }
}

const Message = (channel, contact) => new MessageClass(channel, contact);
const Notify = (channel, contact) => new NotifyClass(channel, contact);
*/

                                                                  //Constructor
/*
function Request(channel, contact) {
  this.channel = {
    id: `${channel}`
  };
  this.contact = {
    id: `${contact}`
  };
}

function MessageMaker(channel, contact) {
  Request.apply(this, arguments);
  this.content = {
    type: `text`,
    payload: null
  }
}

function NotifyMaker(channel, contact) {
  Request.apply(this, arguments);
  this.type = `messages_read`;
}

const Message = (channel, contact) => {
  return new MessageMaker(channel, contact);
}

const Notify = (channel, contact) => {
  return new NotifyMaker(channel, contact);
}
*/

                                                                //Object.create
//impossible - creates empty objects with prototype from prototype template
//new X() creates a new object with constructor X and prototype X.prototype.
//Object.create(X) creates a new object with prototype X (and therefore constructor X.constructor)

/*
const Request = (channel, contact) => {
  let request = {
    "channel": {
      "id": `${channel}`
    },
    "contact": {
      "id": `${contact}`
    }
  }
  //empty object with prototype:
  return Object.create(request);
}
*/

module.exports = {
  Message,
  Notify
};
