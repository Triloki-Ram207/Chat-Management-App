// src/utils/storage.js

const STORAGE_KEY = 'memberState';

// Save state
export const saveState = (state, { useSession = false, ttl = null } = {}) => {
  try {
    const expiry = ttl ? Date.now() + ttl : null;
    const serializedState = JSON.stringify({ ...state, expiry });

    if (useSession) {
      sessionStorage.setItem(STORAGE_KEY, serializedState);
    } else {
      localStorage.setItem(STORAGE_KEY, serializedState);
    }
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// Load state
export const loadState = ({ useSession = false } = {}) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    const serializedState = storage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;

    const parsed = JSON.parse(serializedState);

    // Check expiry only for localStorage
    if (parsed.expiry && Date.now() > parsed.expiry) {
      storage.removeItem(STORAGE_KEY);
      return undefined;
    }

    return parsed;
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

// Clear state
export const clearState = ({ useSession = false } = {}) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Could not clear state', err);
  }
};
