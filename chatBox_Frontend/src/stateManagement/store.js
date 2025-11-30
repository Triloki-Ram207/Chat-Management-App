import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './memberSlice.js';
import { loadState} from '../utils/localStorage.js';
import memberMiddleware from '../middleware/memberMiddleware.js';
import chatBoxReducer from './chatBoxSlice';

const useSession = false; // true = sessionStorage, false = localStorage
const ttl = 86400000;      // 24 hour expiry for localStorage

const persistedState = loadState({ useSession });

export const store = configureStore({
  reducer: {
    member: memberReducer,
    chatBox:chatBoxReducer,
  },
  preloadedState: {
    member: persistedState || undefined,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(memberMiddleware({ useSession, ttl })),
});
