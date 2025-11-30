import ChatBox from '../models/settingsSchema.js';

export const updateChatBoxConfig = async (req, res) => {
  try {
    const updates = req.body;

    // Simple hex validator
    const isValidHex = (val) => /^#([0-9A-Fa-f]{6})$/.test(val);

    // Normalize: only keep valid hex codes, otherwise ignore
    if (updates.inputColor && !isValidHex(updates.inputColor)) {
      console.warn('Invalid inputColor skipped:', updates.inputColor);
      delete updates.inputColor;
    }
    if (updates.backgroundColor && !isValidHex(updates.backgroundColor)) {
      console.warn('Invalid backgroundColor skipped:', updates.backgroundColor);
      delete updates.backgroundColor;
    }

    // Ensure config exists (singleton)
    let config = await ChatBox.findOne();
    if (!config) {
      config = await ChatBox.create({
        inputColor: '#33475B',
        backgroundColor: '#EEEEEE',
        messageOne: 'How can I help you?',
        messageTwo: 'Ask me anything!',
        welcomeMsg: `👋 Want to chat about Hubly? I'm an chatbot here to help you find your way`,
        missedChatTimer: 2,
      });
    }

    // Update only the provided (and validated) fields
    const updatedConfig = await ChatBox.findOneAndUpdate(
      { _id: config._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedConfig);
  } catch (error) {
    console.error('Error updating ChatBox config:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const getChatBoxConfig = async (req, res) => {
   try {
    console.log('Fetching ChatBox config...');
    const config = await ChatBox.findOne(); 
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};