export interface IRequestModalFormData {
  price: string;
  attachStandardPricingList: boolean;
  priceListAttachment: any;
}

export interface IRequestModalProps {
  title: string;
  data: IRequestModalData[];
  hasActions?: boolean;
  description?: string;
  onSendMessage?: () => void;
  onSendQuote?: (props: IRequestModalFormData) => void;
  onCancel?: () => void;
  className?: string;
  isModalVisible: boolean;
  customActions?: JSX.Element;
}

export interface IRequestModalData {
  icon: JSX.Element;
  text: string;
}
