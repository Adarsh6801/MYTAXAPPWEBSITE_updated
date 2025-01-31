export interface INotificationData {
  id: number;
  isRead: boolean;
  title: string;
  description: string;
  link?: string;
  createdDate: string;
}

export interface INotificationState {
  data?: INotificationData[];
  loading: boolean;
  error?: Error;
}
