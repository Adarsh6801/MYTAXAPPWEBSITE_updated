import { SpaceSize } from "antd/lib/space";

export interface IRadioGroupItem {
  label: string;
  value: any;
  hasDate?: boolean;
}

export interface IRadioGroupProps {
  value?: any;
  data?: IRadioGroupItem[];
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: "vertical" | "horizontal";
  className?: string;
  contentClassName?: string;
  disabledDate?: (value: any) => any;
  onChange?: (value: any) => void;
  onChangeDate?: (date: any, dateString: string) => void;
}
