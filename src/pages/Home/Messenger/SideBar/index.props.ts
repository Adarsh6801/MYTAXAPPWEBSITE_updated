export interface IMessengerSideBarProps {
  onMessageItemClick: (id: number, connectionName: string) => void;
  current: string | number;
  showMessages: boolean;
}

export interface IMessengerFormData {
  message: string;
}
