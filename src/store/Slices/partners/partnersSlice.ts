import { createSlice } from "@reduxjs/toolkit";

const partnersSlice = createSlice({
  initialState: {
    partners: {},
  },
  name: "partners",

  reducers: {
    setPartners: (state, { payload }) => {
      state.partners = payload;
    },
  },
});
export const { setPartners } = partnersSlice.actions;
export default partnersSlice.reducer;

