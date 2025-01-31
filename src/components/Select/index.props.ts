import { SelectProps } from "antd";

export interface IDataItem {
  label: string;
  value: number | string;
}

export interface ISelectProps extends SelectProps {
  data: IDataItem[];
  handleChange?: any;
  className?: string;
}
