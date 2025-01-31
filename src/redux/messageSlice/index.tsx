import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../utils/api";

import { AppThunk } from "../store";
import { IMessage, IMessageState } from "./index.props";

const initialState: IMessageState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    getMessagesSuccess: (state, action: PayloadAction<IMessage[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    createChatConnectionSuccess: state => {
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
  getMessagesSuccess,
  createChatConnectionSuccess,
  fetchFailed,
} = messageSlice.actions;

export const getMessages = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data = {} }: any = await api.get("/Chat/GetUserChatConnections");

    dispatch(getMessagesSuccess(data));

    return data;
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const createChatConnection =
  (userId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.post<any, AxiosResponse<IMessage>>(
        "/Chat/CreateChatConnection",
        {},
        { params: { userId } },
      );

      dispatch(createChatConnectionSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default messageSlice.reducer;
