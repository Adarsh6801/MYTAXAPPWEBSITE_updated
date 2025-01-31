import { ITaxPayerTaxPreparationData } from "../../../../../redux/taxPreparationSlice/index.props";

export interface ITableItemMobileProps {
  data: ITaxPayerTaxPreparationData;
  goOrganizer?: (data: ITaxPayerTaxPreparationData) => void;
  className?: string;
}
