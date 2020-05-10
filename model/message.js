const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  message: {
    type: String,
    default: '',
    trim: true
  },
  name: {
    type: String,
    default: '',
    trim: true  
  }
});

module.exports = mongoose.model('messages', messageSchema);
