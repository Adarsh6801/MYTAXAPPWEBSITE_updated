import { SpaceSize } from "antd/lib/space";

export interface IRadioGroupItem {
  label: string;
  value: any;
}

export interface IRadioGroupProps {
  value?: any;
  defaultValue?: any;
  data?: IRadioGroupItem[];
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: "vertical" | "horizontal";
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}
