const mongoose = require('mongoose');

const expense = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['housing','transportation','food','debt-payments']
  },
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expense: [expense],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
