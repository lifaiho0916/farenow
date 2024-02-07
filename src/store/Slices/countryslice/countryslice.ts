import { createSlice } from "@reduxjs/toolkit";

const countryslice = createSlice({
  initialState: {
    currentCountry: "",
    countryId: null,
    zipCode: "",
    placeId: "",
  },
  name: "country",

  reducers: {
    changeCountry: (state, { payload }) => {
      state.currentCountry = payload;
    },
    changeCountryId: (state, { payload }) => {
      state.countryId = payload;
    },
    changeZipCode: (state, { payload }) => {
      state.zipCode = payload;
    },
    changePlaceId: (state, { payload }) => {
      state.placeId = payload;
    },
  },
});
export const { changeCountry, changeCountryId, changeZipCode, changePlaceId } =
  countryslice.actions;
export default countryslice.reducer;
