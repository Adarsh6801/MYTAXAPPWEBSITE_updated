import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  ICalendarSyncState,
  IGoogleSyncPayload,
  IMicrosoftSyncPayload,
} from "./index.props";

const initialState: ICalendarSyncState = {
  link: undefined,
  loading: false,
  error: undefined,
};

export const calendarSyncSlice = createSlice({
  name: "calendarSync",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchLinkSuccess: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
      state.loading = false;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchLinkSuccess, fetchFailed } =
  calendarSyncSlice.actions;

export const getGoogleAuthUrl =
  (): AppThunk<Promise<string | undefined>> => async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<any, AxiosResponse<string>>(
        "/Accountant/GetGoogleAuthUrl",
      );

      dispatch(fetchLinkSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getMicrosoftAuthUrl =
  (): AppThunk<Promise<string | undefined>> => async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<any, AxiosResponse<string>>(
        "/Accountant/MicrosoftAuthUrl",
      );

      dispatch(fetchLinkSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const sendGoogleSyncedData =
  (payload: IGoogleSyncPayload): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Accountant/GoogleAuthCallBack", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const sendMicrosoftSyncedData =
  (payload: IMicrosoftSyncPayload): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Accountant/MicrosoftAuthUrlCallBack", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const cancelCalendarSync =
  (): AppThunk<Promise<void>> => async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Accountant/CancelCalendarSync");

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default calendarSyncSlice.reducer;
