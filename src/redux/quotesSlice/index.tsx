import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IDeleteQuoteRequest } from "../../pages/Home/TaxPayer/Quotes/Requests/index.props";
import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  ITaxPayerQuoteState,
  ITaxPayerQuoteData,
  ITaxPayerIndividualQuoteRequest,
  ITaxPayerBusinessQuoteRequest,
} from "./index.props";

const initialState: ITaxPayerQuoteState = {
  data: undefined,
  businessQuoteRequests: undefined,
  individualQuoteRequests: undefined,
  loading: false,
  error: undefined,
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<ITaxPayerQuoteData[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchIndividualQuoteRequestSuccess: (
      state,
      action: PayloadAction<ITaxPayerIndividualQuoteRequest[]>,
    ) => {
      state.loading = false;
      state.individualQuoteRequests = action.payload;
    },
    fetchBusinessQuoteRequestSuccess: (
      state,
      action: PayloadAction<ITaxPayerBusinessQuoteRequest[]>,
    ) => {
      state.loading = false;
      state.businessQuoteRequests = action.payload;
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
  fetchFailed,
  fetchIndividualQuoteRequestSuccess,
  fetchBusinessQuoteRequestSuccess,
} = quotesSlice.actions;

export const getQuotes = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data } = await api.get<any, AxiosResponse<ITaxPayerQuoteData[]>>(
      "/Taxpayer/GetAllQuotes",
    );

    dispatch(fetchSuccess(data));

    return data;
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const chooseAccountant =
  (quoteId: number): AppThunk =>
  async dispatch => {
    try {
      await api.post("/Taxpayer/ChooseAccountant", {}, { params: { quoteId } });
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getQuoteRequests = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data: individualQuoteRequests } = await api.get<
      any,
      AxiosResponse<ITaxPayerIndividualQuoteRequest[]>
    >("/Taxpayer/GetNotProcessedIndividualRequests");
    const { data: businessQuoteRequests } = await api.get<
      any,
      AxiosResponse<ITaxPayerBusinessQuoteRequest[]>
    >("/Taxpayer/GetNotProcessedBusinessRequests");

    dispatch(fetchIndividualQuoteRequestSuccess(individualQuoteRequests));
    dispatch(fetchBusinessQuoteRequestSuccess(businessQuoteRequests));

    return { businessQuoteRequests, individualQuoteRequests };
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const deleteQuoteRequest =
  (payload: IDeleteQuoteRequest): AppThunk =>
  async dispatch => {
    try {
      await api.post("/Taxpayer/DeleteRequest", {}, { params: payload });
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default quotesSlice.reducer;
