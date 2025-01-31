import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { IFeedbackState, ISendAccountantFeedbackPayload } from "./index.props";
import { AppThunk } from "../store";
import api from "../../utils/api";

const initialState: IFeedbackState = {
  loading: false,
  error: undefined,
};

export const feedbackSlice = createSlice({
  name: "feedback",
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

const { fetchStarted, fetchSuccess, fetchFailed } = feedbackSlice.actions;

export const sendAccountantFeedback =
  (payload: ISendAccountantFeedbackPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Taxpayer/SendAccountantFeedback", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const hasFeedback =
  (accountantId: number): AppThunk<Promise<boolean>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<any, AxiosResponse<boolean>>(
        "/Taxpayer/HasTheAccountantFeedback",
        { params: { accountantId } },
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default feedbackSlice.reducer;
