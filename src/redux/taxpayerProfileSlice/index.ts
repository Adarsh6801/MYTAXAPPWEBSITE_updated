import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { ITaxpayerState, ITaxpayerUpdateProfilePayload } from "./index.props";

const initialState: ITaxpayerState = {
  loading: false,
  error: undefined,
};

export const taxpayerProfileSlice = createSlice({
  name: "taxpayerProfile",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchFailed } =
  taxpayerProfileSlice.actions;

export const updateTaxpayerProfileDetails =
  (payload: ITaxpayerUpdateProfilePayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.postForm("/Taxpayer/UpdateProfileDetails", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default taxpayerProfileSlice.reducer;
