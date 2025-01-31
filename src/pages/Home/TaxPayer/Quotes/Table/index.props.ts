import { ITaxPayerQuoteData } from "../../../../../redux/quotesSlice/index.props";

export interface ITableInfoProps {
  data: ITaxPayerQuoteData[];
  className?: string;
  onSendMessage?: (id: number) => void;
  onCalendar?: (
    accountantId: number,
    quoteId: number,
    date: string | Date,
  ) => void;
}
