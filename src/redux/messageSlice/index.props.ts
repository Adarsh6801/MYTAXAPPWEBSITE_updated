export interface IMessageState {
  data?: IMessage[];
  loading: boolean;
  error?: Error;
}

export interface IMessage {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  lastMessageDate: string;
  messagesCount: number;
  hasUnReadMessage: string;
  connectionName: string;
}
