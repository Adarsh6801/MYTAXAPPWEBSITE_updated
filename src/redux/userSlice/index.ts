import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IUserData, IUserState } from "./index.props";

const initialState: IUserState = {
  user: undefined,
  loading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<IUserData>) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchFailed } = userSlice.actions;

export const getUser =
  (): AppThunk<Promise<IUserData | undefined>> => async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<IUserData>("/user/GetUser");

      dispatch(fetchSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default userSlice.reducer;
