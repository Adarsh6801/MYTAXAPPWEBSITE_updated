import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  IAuthState,
  IChangePasswordPayload,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignInResponse,
  ISignInWithValidationCodePayload,
  ISignInWithValidationCodeResponse,
  ISignUpBusinessPayload,
  ISignUpExpertPayload,
  ISignUpIndividualPayload,
  ISignUpPayload,
} from "./index.props";
import { USER_TOKEN } from "../../constants/storage";
import { getUserToken, removeUserToken } from "../../helpers/storage";

const userToken = getUserToken();

if (!!userToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
}

const initialState: IAuthState = {
  twoFactorAuthIsActive: false,
  token: !!userToken ? userToken : undefined,
  loading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
      state.error = undefined;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    signInFulfilled: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, signInFulfilled, fetchFailed } =
  authSlice.actions;

export const signIn =
  (payload: ISignInPayload): AppThunk<Promise<ISignInResponse | undefined>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.post<ISignInResponse>(
        "/identity/signIn",
        payload,
      );

      if (!data.twoFactorAuthIsActive && data.token) {
        dispatch(signInFulfilled(data.token));

        localStorage.setItem(USER_TOKEN, data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      } else {
        dispatch(fetchSuccess());
      }

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const signInWithValidationCode =
  (
    payload: ISignInWithValidationCodePayload,
  ): AppThunk<Promise<string | undefined>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const {
        data: { token },
      } = await api.post<ISignInWithValidationCodeResponse>(
        "/identity/signInWithValidationCode",
        payload,
      );

      dispatch(signInFulfilled(token));

      localStorage.setItem(USER_TOKEN, token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return token;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const signUpTaxPayer =
  (payload: ISignUpPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/Taxpayer/RegisterTaxpayer", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const addIndividualTaxpayerInitialQuestions =
  (payload: ISignUpIndividualPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.post(
        "/taxpayer/AddIndividualTaxpayerInitialQuestions",
        payload,
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const addBusinessTaxpayerInitialQuestions =
  (payload: ISignUpBusinessPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.post(
        "/taxpayer/AddBusinessTaxpayerInitialQuestions",
        payload,
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const signUpExpert =
  (payload: ISignUpExpertPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());
      payload.initialQuestions.workingTypeIds = JSON.stringify(
        payload.initialQuestions.workingTypeIds,
      ) as any;

      await api.postForm(
        "/accountant/registerAccountant",
        formSerializer(payload),
      );

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const sendEmailVerificationCode =
  (email: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.post(
        "/identity/sendEmailValidationCode",
        {},
        { params: { email } },
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      // console.log("eeeeeeeeee" , e)
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const logout =
  (url?: string): AppThunk =>
  async dispatch => {
    try {
      removeUserToken();
      delete api.defaults.headers.common["Authorization"];

      if (url) {
        window.location.href = url;
      }
    } catch (e: any) {
      dispatch(fetchFailed(e.response));
    }
  };

export const forgotPassword =
  (payload: IForgotPasswordPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.post(
        "/Identity/ForgotPassword",
        payload,
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const resetPassword =
  (payload: IResetPasswordPayload): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.post(
        "/Identity/ResetPassword",
        payload,
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const changePassword =
  (payload: IChangePasswordPayload): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      await api.post("/User/ChangePassword", payload);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default authSlice.reducer;
