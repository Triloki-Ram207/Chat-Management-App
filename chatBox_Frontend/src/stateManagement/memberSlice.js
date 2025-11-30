import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  member: null,
  token: null,
  edit: false,
  memberToBeEdited: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.member = action.payload.member;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.member = null;
      state.token = null;
      state.edit = false;
      state.memberToBeEdited = null;
      state.member_admin_msg = [];
    },
    updateMemberStorage: (state, action) => {
      state.member = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    setMemberToBeEdited(state, action) {
      state.memberToBeEdited = action.payload;
    },
    clearEdit(state) {
      state.edit = false;
      state.memberToBeEdited = null;
    },
  },
});

export const {
  setAuth,
  clearAuth,
  updateMemberStorage,
  setEdit,
  setMemberToBeEdited,
  clearEdit,
} = memberSlice.actions;

export default memberSlice.reducer;
