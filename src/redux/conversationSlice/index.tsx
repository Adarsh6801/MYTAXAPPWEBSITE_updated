import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { AppThunk } from "../store";
import { IConversation, IConversationState, ISendMessage } from "./index.props";

const initialState: IConversationState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSendMessageSuccess: state => {
      state.loading = false;
    },
    fetchConversationSuccess: (
      state,
      action: PayloadAction<IConversation[] | undefined>,
    ) => {
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
  fetchConversationSuccess,
  fetchSendMessageSuccess,
  fetchFailed,
} = conversationSlice.actions;

export const getConversation =
  (messageId: number, from: number, to: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.get("/Chat/GetChatMessages", {
        params: {
          connectionId: messageId,
          from,
          to,
        },
      });

      dispatch(fetchConversationSuccess(data));

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const sendMessage =
  (payload: ISendMessage): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const formData = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        if (key === "files") {
          payload.files?.forEach(file => {
            formData.append("files", file);
          });
        } else {
          formData.append(key, value);
        }
      }

      await api.postForm("/Chat/SendMessage", formData);

      dispatch(fetchSendMessageSuccess());
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const downloadFile =
  (fileId: number, fileName: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.get("/Chat/DownloadFile", {
        params: { id: fileId },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();

      dispatch(fetchSendMessageSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const openFile =
  (fileId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data = {} }: any = await api.get("/Chat/DownloadFile", {
        params: { id: fileId },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([data], { type: "image/png" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank"); //or any other extension
      document.body.appendChild(link);
      link.click();

      dispatch(fetchSendMessageSuccess());

      return data;
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default conversationSlice.reducer;
