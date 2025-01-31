import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  IAccountantTaxPreparationData,
  ITaxPayerTaxPreparationData,
  ITaxPreparationState,
  IUploadTaxReturnFilePayload,
} from "./index.props";

const initialState: ITaxPreparationState = {
  accountantData: undefined,
  taxpayerData: undefined,
  loading: false,
  error: undefined,
};

export const taxPreparationSlice = createSlice({
  name: "taxPreparation",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchTaxPayerSuccess: (
      state,
      action: PayloadAction<ITaxPayerTaxPreparationData[]>,
    ) => {
      state.loading = false;
      state.taxpayerData = action.payload;
    },
    fetchAccountantSuccess: (
      state,
      action: PayloadAction<IAccountantTaxPreparationData[]>,
    ) => {
      state.loading = false;
      state.accountantData = action.payload;
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
  fetchTaxPayerSuccess,
  fetchAccountantSuccess,
  fetchFailed,
} = taxPreparationSlice.actions;

export const getTaxPayerTaxPreparations = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data } = await api.get<
      any,
      AxiosResponse<ITaxPayerTaxPreparationData[]>
    >("/Taxpayer/GetTaxpayerTaxPreparations");

    dispatch(fetchTaxPayerSuccess(data));

    return data;
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const getAccountantTaxPreparations = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data } = await api.get<
      any,
      AxiosResponse<IAccountantTaxPreparationData[]>
    >("/Accountant/GetAccountantTaxPreparations");

    dispatch(fetchAccountantSuccess(data));

    return data;
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const makeTaxPreparationJobStatusInProcess =
  (payload: { quoteId: number }): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post(
        "/Taxpayer/MakeTaxPreparationJobStatusInProcess",
        {},
        { params: payload },
      );

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const makeTaxPreparationJobStatusInForReview =
  (payload: { quoteId: number }): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post(
        "taxpayer/makeTaxPreparationJobStatusInForReview",
        {},
        { params: payload },
      );

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const uploadTaxReturnFile =
  (payload: IUploadTaxReturnFilePayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const formData = new FormData();
      formData.append("quoteId", payload.quoteId.toString());
      formData.append("taxReturn", payload.taxReturn);

      const { data } = await api.postForm(
        "/Accountant/UploadTaxReturnFile",
        formData,
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default taxPreparationSlice.reducer;
