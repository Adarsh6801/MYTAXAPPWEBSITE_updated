import { ISentQuoteData } from "../../../../../../redux/requestsSlice/index.props";

interface IStatus {
  color: string;
  text: string;
}

export interface ITableItemMobileProps {
  data: ISentQuoteData;
  className?: string;
  actionStatus: IStatus;
  onSendMessage?: (userId: number) => void;
  onCalendar?: (id: number) => void;
  onDecline?: (quoteId: number) => void;
  onConfirm?: (quoteId: number) => void;
}
