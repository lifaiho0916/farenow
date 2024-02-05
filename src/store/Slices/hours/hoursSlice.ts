import { createSlice } from "@reduxjs/toolkit";

const hoursSlice = createSlice({
  name: "hours",
  initialState: {
    hour: 0,
  },
  reducers: {
    setHour: (state, action) => {
      return {
        ...state,
        hour: action.payload,
      };
    },
  },
});
export const { setHour } = hoursSlice.actions;
export default hoursSlice.reducer;

