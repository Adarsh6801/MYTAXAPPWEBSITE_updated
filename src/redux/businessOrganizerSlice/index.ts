import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IBusinessOrganizerState } from "./index.props";

const initialState: IBusinessOrganizerState = {
  data: undefined,
  documents: undefined,
  loading: false,
  error: undefined,
};

export const businessOrganizerSlice = createSlice({
  name: "businessOrganizer",
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
  fetchGetSuccess,
  fetchApprovedDocumentRequestSuccess,
  fetchFailed,
} = businessOrganizerSlice.actions;

export const getBusinessOrganizer =
  (payload: any): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data }: any = await api.get(
        "/Accountant/GetAllBusinessRequests",
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

export const setBusinessOrganizer =
  (payload: any[]): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const formData = new FormData();

      payload.forEach((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          if (item.isFile) {
            if (key === "file" && item.file) {
              item.answer.fileList?.forEach((file: any) => {
                formData.append(
                  `questionList[${index}].file`,
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

      await api.postForm(
        "/taxpayer/​AddBusinessTaxpayerInitialQuestions",
        formData,
      );

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default businessOrganizerSlice.reducer;
