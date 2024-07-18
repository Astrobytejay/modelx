const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dns = require('dns');
require('dotenv').config();

const User = require('./discord-clone-backend/models/User');

// Custom DNS resolver
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const addAdminUser = async () => {
  const email = 'info@astrobytemarketing.com';
  const password = 'Flordia2803';

  try {
    await connectDB();

    let user = await User.findOne({ email });

    if (user) {
      console.log('User already exists');
      process.exit();
    }

    user = new User({
      username: 'admin',
      email,
      password,
      profilePicture: '',
      status: 'available',
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log('New admin user added');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

addAdminUser();
