import { ReactNode } from "react";

export interface IDeclineProps {
  title: string;
  description?: string;
  infoNote?: boolean;
  children?: ReactNode;
  icon?: any;
  onClick?: () => void;
}
