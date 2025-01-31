import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IPaymentState } from "./index.props";

const initialState: IPaymentState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchFailed } = paymentSlice.actions;

export const generateLinkForNewTaxPreparation =
  (): AppThunk => async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<any, AxiosResponse<string>>(
        "/Accountant/GenerateLinkForNewTaxPreparation",
      );

      dispatch(fetchSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default paymentSlice.reducer;
