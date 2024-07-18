// controllers/adminController.js
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Channel = require('../models/Channel');

exports.inviteUser = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Send invitation email logic
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createChannel = async (req, res) => {
  const { name, isPrivate } = req.body;
  try {
    let channel = new Channel({ name, isPrivate });
    await channel.save();
    res.json(channel);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
