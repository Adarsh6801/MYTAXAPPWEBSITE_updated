import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  IAppointmentApproved,
  IAppointmentRequest,
  IAppointmentState,
  IAvailableHours,
  ICreateAppointmentPayload,
} from "./index.props";

const initialState: IAppointmentState = {
  requestedAppointments: undefined,
  approvedAppointments: undefined,
  hours: undefined,
  loading: false,
  error: undefined,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchAppointmentRequestsSuccess: (
      state,
      action: PayloadAction<IAppointmentRequest[]>,
    ) => {
      state.loading = false;
      state.requestedAppointments = action.payload;
    },
    fetchApprovedAppointmentSuccess: (
      state,
      action: PayloadAction<IAppointmentApproved[]>,
    ) => {
      state.loading = false;
      state.approvedAppointments = action.payload;
    },
    fetchAvailableHoursSuccess: (state, action) => {
      state.loading = false;
      state.hours = action.payload;
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
  fetchAppointmentRequestsSuccess,
  fetchApprovedAppointmentSuccess,
  fetchAvailableHoursSuccess,
} = appointmentSlice.actions;

export const createAppointment =
  (payload: ICreateAppointmentPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data }: any = await api.post(
        "/taxpayer/makeAppointment",
        payload,
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getAccountantAppointmentRequests =
  (): AppThunk => async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<any, AxiosResponse<IAppointmentRequest[]>>(
        "/accountant/GetAccountantAppointmentRequests",
      );

      dispatch(fetchAppointmentRequestsSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getAccountantApprovedAppointments =
  (): AppThunk => async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<
        any,
        AxiosResponse<IAppointmentApproved[]>
      >("/accountant/GetAccountantApprovedAppointments");

      dispatch(fetchApprovedAppointmentSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const rejectAppointment =
  (appointmentId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post(
        "/accountant/RejectAppointment",
        {},
        { params: { appointmentId } },
      );
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const approveAppointment =
  (appointmentId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post(
        "/accountant/ApproveAppointment",
        {},
        { params: { appointmentId } },
      );
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const genericLink = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchStarted());

    const { data }: any = await api.get(
      "/accountant/GenerateLinkForNewTaxPreparation",
    );

    dispatch(fetchApprovedAppointmentSuccess(data));

    return data;
  } catch (e: any) {
    dispatch(fetchFailed(e.response));

    throw e.response;
  }
};

export const getAvailableHours =
  (payload: IAvailableHours): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data }: any = await api.get(
        "/taxpayer/GetAccountantAvailableHours",
        { params: payload },
      );

      dispatch(fetchAvailableHoursSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default appointmentSlice.reducer;
