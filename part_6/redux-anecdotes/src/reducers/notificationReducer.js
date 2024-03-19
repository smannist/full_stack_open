import { createSlice } from "@reduxjs/toolkit";

let notificationIsPresent = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    }
  },
});

export const setNotification = (message, timeout) => {
  return async (dispatch) => {

    if (notificationIsPresent) {
      clearTimeout(notificationIsPresent);
    }

    dispatch(showNotification(message));

    notificationIsPresent = setTimeout(() => {
      dispatch(clearNotification());
      notificationIsPresent = null;
    }, 1000 * timeout);
  }
}

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
