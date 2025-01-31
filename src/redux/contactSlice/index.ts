import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IContactPayload, IContactState } from "./index.props";

const initialState: IContactState = {
  loading: false,
  error: undefined,
};

export const contactSlice = createSlice({
  name: "contact",
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

const { fetchStarted, fetchSuccess, fetchFailed } = contactSlice.actions;

export const sendContactUsMessage =
  (payload: IContactPayload): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Public/SendContactUsMessage", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default contactSlice.reducer;
