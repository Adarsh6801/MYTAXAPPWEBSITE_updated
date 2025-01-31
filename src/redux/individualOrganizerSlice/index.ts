import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import api from "../../utils/api";
import { AppThunk } from "../store";
import {
  IIndividualOrganizerPayload,
  IIndividualOrganizerState,
} from "./index.props";

const initialState: IIndividualOrganizerState = {
  data: undefined,
  documents: undefined,
  loading: false,
  error: undefined,
};

export const individualOrganizerSlice = createSlice({
  name: "individualOrganizer",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchApprovedDocumentRequestSuccess: (state, action) => {
      state.documents = action.payload;
    },
    fetchGetSuccess: (state, action: any) => {
      state.loading = false;
      state.data = action.payload;
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
  fetchGetSuccess,
  fetchApprovedDocumentRequestSuccess,
} = individualOrganizerSlice.actions;

export const setIndividualOrganizer =
  (payload: any[]): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const formData = new FormData();

      payload.forEach((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          if (item.isFile) {
            if (key === "files" && item.files) {
              item.answer.fileList?.forEach((file: any) => {
                formData.append(
                  `questionList[${index}].files`,
                  file.originFileObj,
                );
              });
            }
            formData.append(`questionList[${index}].${key}`, value as any);
          } else {
            formData.append(`questionList[${index}].${key}`, value as any);
          }
        }
      });

      await api.postForm("taxpayer/AddAnswerToOrganizerQuestions", formData);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getIndividualOrganizer =
  (payload: any): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data }: any = await api.get(
        "/Accountant/GetOrganizerQuestionAnswers",
        {
          params: payload,
        },
      );

      const documentsData = data.filter(
        (item: any) => item.isFile && item.files.length > 0,
      );

      dispatch(fetchGetSuccess(data));
      dispatch(fetchApprovedDocumentRequestSuccess(documentsData));
      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const getTaxpayerIndividualOrganizer =
  (payload: any): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data }: any = await api.get(
        "/taxPayer/GetOrganizerQuestionAnswers",
        {
          params: payload,
        },
      );

      dispatch(fetchGetSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default individualOrganizerSlice.reducer;
