import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICommonState } from "./index.props";

const initialState: ICommonState = {
  loading: false,
  error: undefined,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchFulfilled: state => {
      state.loading = false;
    },
    fetchFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStarted, fetchFulfilled, fetchFailed } =
  commonSlice.actions;

export default commonSlice.reducer;
