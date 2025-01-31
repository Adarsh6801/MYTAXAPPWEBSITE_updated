import { ISentQuoteData } from "../../../../../redux/requestsSlice/index.props";

export interface ITableInfoProps {
  data: ISentQuoteData[];
  className?: string;
  onSendMessage?: (id: number) => void;
  onCalendar?: (id: number) => void;
}
