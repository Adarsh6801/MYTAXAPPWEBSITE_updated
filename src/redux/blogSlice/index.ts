import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../utils/api";
import { AppThunk } from "../store";
import { IBlog, IBlogState } from "./index.props";
import { AxiosResponse } from "axios";
import { BlogTypeEnum } from "../../constants/blog";

const initialState: IBlogState = {
  loading: false,
  error: undefined,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true;
      state.error = undefined;
    },
    fetchSuccess: state => {
      state.loading = false;
    },
    fetchBlogSuccess: (state, action: PayloadAction<IBlog>) => {
      state.loading = false;
      state.blog = action.payload;
    },
    fetchBlogsSuccess: (state, action: PayloadAction<IBlog[]>) => {
      state.loading = false;
      state.blogs = action.payload;
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
  fetchBlogSuccess,
  fetchBlogsSuccess,
  fetchFailed,
} = blogSlice.actions;

export const fetchBlog =
  (id: number): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data: blog } = await api.get<any, AxiosResponse<IBlog>>(
        "/Blog/Get",
        { params: { id } },
      );

      dispatch(fetchBlogSuccess(blog));
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export const fetchBlogs =
  (typeEnum?: BlogTypeEnum, count: number = 30): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(fetchStarted());

      const { data: blogs } = await api.get<any, AxiosResponse<IBlog[]>>(
        "/Blog/GetAll",
        { params: { count, typeEnum } },
      );

      dispatch(fetchBlogsSuccess(blogs));
    } catch (e: any) {
      dispatch(fetchFailed(e.response));

      throw e.response;
    }
  };

export default blogSlice.reducer;
