// src/middleware/memberMiddleware.js
import { setAuth, clearAuth, updateMemberStorage } from '../stateManagement/memberSlice.js';
import { saveState, clearState } from '../utils/localStorage.js';

const memberMiddleware =
  ({ useSession = false, ttl = 3600000 } = {}) =>
  (store) =>
  (next) =>
  (action) => {
    const result = next(action);

    // Persist state when auth is set or member is updated
    if (setAuth.match(action) || updateMemberStorage.match(action)) {
      const state = store.getState().member;
      saveState(state, { useSession, ttl });
    }

    // Clear persisted state on logout
    if (clearAuth.match(action)) {
      clearState({ useSession });
    }

    return result;
  };

export default memberMiddleware;
