const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User registers from invite link
router.post('/:token', async (req, res) => {
  const { username, password, profilePicture, status } = req.body;
  const { token } = req.params;

  try {
    let user = await User.findOne({ inviteToken: token });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.profilePicture = profilePicture;
    user.status = status;
    user.inviteToken = undefined; // Clear invite token after successful registration

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'your_jwt_secret',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
