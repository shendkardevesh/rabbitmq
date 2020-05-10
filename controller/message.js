const MessageModel = require('../model/message');

const save = async (msg) => {
  try {
    const body = {
      name: msg.name,
      message: msg.message
    };
    const bodyObj = new MessageModel(body);
    const response = await bodyObj.save();
    return response;
  } catch(err) {
    throw(err);
  }
};

module.exports = {
  save
};
