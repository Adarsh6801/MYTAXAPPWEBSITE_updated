import { ButtonProps } from "antd";

export interface ICircularDirectionProps {
  diameter?: number;
  spaceSize?: number;
  hasLeft?: boolean;
  hasRight?: boolean;
  disabled?: boolean;
  rightButton?: ButtonProps;
  leftButton?: ButtonProps;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  className?: string;
}
