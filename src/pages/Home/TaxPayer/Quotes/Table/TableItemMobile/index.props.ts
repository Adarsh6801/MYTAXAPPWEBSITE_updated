import { ITaxPayerQuoteData } from "../../../../../../redux/quotesSlice/index.props";

export interface ITableItemMobileProps {
  data: ITaxPayerQuoteData;
  className?: string;
  status: {
    color: string;
    text: string;
  };
  onSendMessage?: (userId: number) => void;
  onCalendar?: (
    accountantId: number,
    quoteId: number,
    date: string | Date,
  ) => void;
  onChooseAccountant?: (id: number) => void;
}
