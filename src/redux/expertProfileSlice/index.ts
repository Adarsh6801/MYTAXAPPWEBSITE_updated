import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  IExpertProfileState,
  IExpertProfileUpdate,
  IExpertProfileDetails,
} from "./index.props";

const initialState: IExpertProfileState = {
  expertProfile: undefined,
  loading: false,
  error: undefined,
};

export const expertProfileSlice = createSlice({
  name: "expertProfile",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchExpertProfileSuccess: (
      state,
      action: PayloadAction<IExpertProfileDetails>,
    ) => {
      state.loading = false;
      state.expertProfile = action.payload;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchFailed, fetchExpertProfileSuccess } =
  expertProfileSlice.actions;

export const getExpertProfileInfo =
  (): AppThunk<Promise<IExpertProfileDetails | undefined>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<IExpertProfileDetails>(
        "/Accountant/GetAccountantProfileDetails",
      );
      dispatch(fetchExpertProfileSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const updateExpertProfileDetails =
  (payload: IExpertProfileUpdate): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const formData = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        if (value) {
          if (_.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      }

      await api.postForm(
        "/Accountant/UpdateAccountantProfileDetails",
        formData,
      );

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default expertProfileSlice.reducer;
