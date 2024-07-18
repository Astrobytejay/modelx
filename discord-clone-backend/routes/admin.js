// routes/admin.js
const express = require('express');
const router = express.Router();
const { inviteUser, createChannel } = require('../controllers/adminController');
const auth = require('../config/authMiddleware');

router.post('/invite', auth, inviteUser);
router.post('/channel', auth, createChannel);

module.exports = router;
