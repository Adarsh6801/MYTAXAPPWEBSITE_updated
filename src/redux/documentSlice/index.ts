import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IDocumentState } from "./index.props";

const initialState: IDocumentState = {
  loading: false,
  error: undefined,
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchFailed } = documentSlice.actions;

export const downloadAllAttachedDocuments =
  (quoteId: number): AppThunk<Promise<Blob | undefined>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data } = await api.get<Blob>("/Accountant/DownloadFilesInZip", {
        params: {
          quoteId,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Documents.zip"); // or any other extension
      document.body.appendChild(link);
      link.click();

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const deleteUploadFile =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data }: any = await api.post(
        "/taxpayer/DeleteFileFromOrganizerQuestion",
        {
          fileId: id,
        },
      );

      dispatch(fetchSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default documentSlice.reducer;
