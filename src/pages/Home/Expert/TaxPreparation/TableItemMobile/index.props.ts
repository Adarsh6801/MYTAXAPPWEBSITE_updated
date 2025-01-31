import { IAccountantTaxPreparationData } from "../../../../../redux/taxPreparationSlice/index.props";

export interface ITableItemMobileProps {
  data: IAccountantTaxPreparationData;
  uploadFile: (e: any, quoteId: number) => void;
  className?: string;
}
