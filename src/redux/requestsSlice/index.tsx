import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  IBusinessRequestData,
  IIndividualRequestData,
  IRequestState,
  ISendQuotePayload,
  ISentQuoteData,
} from "./index.props";

const initialState: IRequestState = {
  individual: undefined,
  business: undefined,
  sentQuotes: undefined,
  loading: false,
  error: undefined,
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    individualFetchSuccess: (
      state,
      action: PayloadAction<IIndividualRequestData[] | undefined>,
    ) => {
      state.loading = false;
      state.individual = action.payload;
    },
    businessFetchSuccess: (
      state,
      action: PayloadAction<IBusinessRequestData[] | undefined>,
    ) => {
      state.loading = false;
      state.business = action.payload;
    },
    sentQuotesFetchSuccess: (
      state,
      action: PayloadAction<ISentQuoteData[] | undefined>,
    ) => {
      state.loading = false;
      state.sentQuotes = action.payload;
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
  businessFetchSuccess,
  individualFetchSuccess,
  sentQuotesFetchSuccess,
  fetchFailed,
} = requestsSlice.actions;

export const getAllBusinessRequests =
  (
    from: number,
    to: number,
  ): AppThunk<Promise<IBusinessRequestData[] | undefined>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<
        any,
        AxiosResponse<IBusinessRequestData[]>
      >("/Accountant/GetAllBusinessRequests", { params: { from, to } });

      dispatch(businessFetchSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getAllIndividualRequests =
  (
    from: number,
    to: number,
  ): AppThunk<Promise<IIndividualRequestData[] | undefined>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<
        any,
        AxiosResponse<IIndividualRequestData[]>
      >("/Accountant/GetAllIndividualRequests", { params: { from, to } });

      dispatch(individualFetchSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const sendQuote =
  (payload: ISendQuotePayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const formData = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        formData.append(key, value);
      }

      await api.postForm("/Accountant/SendQuote", formData);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const confirmQuote =
  (quoteId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Accountant/ConfirmQuote", {}, { params: { quoteId } });

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const declineQuote =
  (quoteId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Accountant/DeclineQuote", {}, { params: { quoteId } });

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getAccountantSentQuotes = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data } = await api.get<any, AxiosResponse<ISentQuoteData[]>>(
      "/Accountant/GetAccountantSentQuotes",
    );
    dispatch(sentQuotesFetchSuccess(data));
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export default requestsSlice.reducer;
