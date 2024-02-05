import { createSlice } from "@reduxjs/toolkit";

const countryslice = createSlice({
  initialState: {
    selectcountry: "nigeria",
  },
  name: "country",

  reducers: {
    changeCountry: (state, { payload }) => {
      state.selectcountry = payload;
    },
  },
});
export const { changeCountry } = countryslice.actions;
export default countryslice.reducer;
