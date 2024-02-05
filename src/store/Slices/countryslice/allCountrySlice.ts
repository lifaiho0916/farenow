import { createSlice } from "@reduxjs/toolkit";

const allCountrySlice = createSlice({
  initialState: {
    countries: [],
  },
  name: "countries",

  reducers: {
    setAllCountry: (state, { payload }) => {
      state.countries = payload;
    },
  },
});
export const { setAllCountry } = allCountrySlice.actions;
export default allCountrySlice.reducer;

