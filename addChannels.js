const mongoose = require('mongoose');
const Channel = require('./discord-clone-backend/models/Channel');
require('dotenv').config({ path: './discord-clone-backend/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const addChannels = async () => {
  await connectDB();

  const channels = [
    { name: 'General', isPrivate: false },
    { name: 'Development', isPrivate: false },
    { name: 'Design', isPrivate: false },
    { name: 'Admin', isPrivate: true },
  ];

  try {
    for (const channel of channels) {
      console.log(`Adding channel: ${channel.name}`);
      const newChannel = new Channel(channel);
      await newChannel.save();
      console.log(`Channel added: ${channel.name}`);
    }
    console.log('Channels added...');
    process.exit();
  } catch (err) {
    console.error('Error adding channels:', err.message);
    process.exit(1);
  }
};

addChannels();
