import { createSlice } from "@reduxjs/toolkit";

export const { reducer, actions } = createSlice({
  name: "Login user Details",
  initialState: {},
  reducers: {
    userdata: (state, action) => {
      console.log(state, action);
    },
  },
});

export const { userdata } = actions;
export default reducer;
