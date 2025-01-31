import { RcFile } from "antd/lib/upload";

export interface IConversationState {
  data?: IConversation[];
  loading: boolean;
  error?: Error;
}

export interface IConversation {
  id: number;
  avatar: string;
  message: string;
  createdDate: string;
  createdBy: number;
  userChatConnectionId: number;
  files: any;
}

export interface ISendMessage {
  connectionId: number;
  message?: string;
  files?: File[] | RcFile[];
}
