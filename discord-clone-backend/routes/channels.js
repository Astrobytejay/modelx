const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');

// @route    GET api/channels
// @desc     Get all channels
// @access   Private
router.get('/', async (req, res) => {
  try {
    const channels = await Channel.find();
    res.json(channels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
