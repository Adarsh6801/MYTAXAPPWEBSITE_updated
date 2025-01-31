import { CheckboxProps } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export interface ICheckboxProps extends CheckboxProps {
  text: string;
  hasDate?: boolean;
  className?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
}
