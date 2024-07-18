const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Admin sends invite
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const token = crypto.randomBytes(20).toString('hex');
    const inviteUrl = `http://localhost:3000/register/${token}`;

    const mailOptions = {
      to: email,
      from: 'your-email@gmail.com',
      subject: 'Invite to Join',
      text: `You are invited to join our platform. Please click on the following link to complete your registration: ${inviteUrl}`,
    };

    await transporter.sendMail(mailOptions);

    const user = new User({ email, inviteToken: token, status: 'pending' });
    await user.save();

    res.status(200).send('Invite sent');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
