import { BlogTypeEnum } from "../../constants/blog";

export interface IBlogState {
  blog?: IBlog;
  blogs?: IBlog[];
  loading: boolean;
  error?: any;
}

export interface IBlog {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  tip: string;
  tags: string[];
  image: string;
  createdDate: string;
  typeEnum: BlogTypeEnum;
}
