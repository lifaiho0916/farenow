import { createSlice } from "@reduxjs/toolkit";

const HeaderDropDownSlice = createSlice({
  name: "header_menu",
  initialState: {
    show: false
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload
    },
  },
});
export default HeaderDropDownSlice.reducer;
export const { setShow } = HeaderDropDownSlice.actions;
