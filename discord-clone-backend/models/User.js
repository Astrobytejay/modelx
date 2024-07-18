const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'do not disturb', 'other'],
  },
  inviteToken: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
