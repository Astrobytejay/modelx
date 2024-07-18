const express = require('express');
const connectDB = require('./config/db');
const auth = require('./routes/auth');
const invite = require('./routes/invite');
const register = require('./routes/register');
const channels = require('./routes/channels'); // Import the channels route
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', auth);
app.use('/api/invite', invite);
app.use('/api/register', register);
app.use('/api/channels', channels); // Use the channels route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
