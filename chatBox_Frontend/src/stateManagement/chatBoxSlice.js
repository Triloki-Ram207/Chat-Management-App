// chatBoxSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChatBoxConfig, updateChatBoxConfig } from '../api/chatBox';


// Async thunk to fetch config
export const fetchChatBoxConfig = createAsyncThunk(
  'chatBox/fetchConfig',
  async () => {
    const config = await getChatBoxConfig();
    return config;
  }
);

// Async thunk to update config
export const saveChatBoxConfig = createAsyncThunk(
  'chatBox/saveConfig',
  async (updates) => {
    await updateChatBoxConfig(updates);
    return updates; // return updates so reducer can merge
  }
);

const chatBoxSlice = createSlice({
  name: 'chatBox',
  initialState: {
    inputColor: '#33475B',
    backgroundColor: '#EEEEEE',
    messageOne: 'How can I help you?',
    messageTwo: 'Ask me anything!',
    welcomeMsg: "👋 Want to chat about Hubly?",
    missedChatTimer: 2,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatBoxConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatBoxConfig.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(saveChatBoxConfig.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export default chatBoxSlice.reducer;
