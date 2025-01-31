import { SpaceSize } from "antd/lib/space";

export interface IRadioGroupProps {
  value?: any;
  data?: any[];
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: "vertical" | "horizontal";
  className?: string;
  contentClassName?: string;
  onChange?: (value: any) => void;
}
