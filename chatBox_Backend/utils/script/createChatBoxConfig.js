// utils/script/createChatBoxConfig.js
import connectDB from '../../config/connectDB.js';
import ChatBox from '../../models/settingsSchema.js';

async function createConfig() {
  await connectDB(); // reuse same connection logic

  const existing = await ChatBox.findOne();
  if (existing) {
    console.log('Config already exists:', existing._id);
  } else {
    const config = await ChatBox.create({}); // uses defaults
    console.log('Created new config:', config._id);
  }

  process.exit(); // close script cleanly
}

createConfig();
