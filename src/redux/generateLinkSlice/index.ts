import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IGenerateLinkState } from "./index.props";

const initialState: IGenerateLinkState = {
  link: undefined,
  loading: false,
  error: undefined,
};

export const generateLinkSlice = createSlice({
  name: "generateLink",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
      state.loading = false;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchFailed } = generateLinkSlice.actions;

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

export default generateLinkSlice.reducer;
