import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IEmailSubscriptionState } from "./index.props";

const initialState: IEmailSubscriptionState = {
  loading: false,
  error: undefined,
};

export const emailSubscriptionSlice = createSlice({
  name: "emailSubscription",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
      state.error = undefined;
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
  emailSubscriptionSlice.actions;

export const createEmailSubscription =
  (email: string): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/EmailSubscription/Create", null, { params: { email } });

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const deleteEmailSubscription =
  (email: string): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/EmailSubscription/Delete", null, { params: { email } });

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default emailSubscriptionSlice.reducer;
