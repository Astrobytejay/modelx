const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './discord-clone-backend/.env' });

const uri = process.env.MONGO_URI;

const addChannels = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('MongoDB Connected...');

    const db = client.db('discord_clone');
    const channelsCollection = db.collection('channels');

    const channels = [
      { name: 'General', isPrivate: false },
      { name: 'Development', isPrivate: false },
      { name: 'Design', isPrivate: false },
      { name: 'Admin', isPrivate: true },
    ];

    for (const channel of channels) {
      console.log(`Adding channel: ${channel.name}`);
      await channelsCollection.insertOne(channel);
      console.log(`Channel added: ${channel.name}`);
    }

    console.log('Channels added...');
  } catch (err) {
    console.error('Error adding channels:', err.message);
  } finally {
    await client.close();
    process.exit();
  }
};

addChannels();
