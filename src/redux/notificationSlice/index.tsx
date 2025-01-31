import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { AppThunk } from "../store";
import { INotificationData, INotificationState } from "./index.props";

const initialState: INotificationState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<INotificationData[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchNotificationReadSuccess: state => {
      state.loading = false;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const {
  fetchStarted,
  fetchSuccess,
  fetchNotificationReadSuccess,
  fetchFailed,
} = notificationsSlice.actions;

export const getNotifications = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data } = await api.get<any, AxiosResponse<INotificationData[]>>(
      "/User/GetUserNotifications",
    );

    dispatch(fetchSuccess(data));

    return data;
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const makeNotificationsRead = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    await api.post("/User/MakeNotifictionsRead");

    dispatch(fetchNotificationReadSuccess());
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export default notificationsSlice.reducer;
