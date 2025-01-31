export interface IGroup {
  groupName: string;
  stepTitle: string;
  stepIcon: JSX.Element;
  component: JSX.Element;
}

export interface IOrganizerContainerProps {
  label?: JSX.Element;
  justifyContent?: "left" | "center" | "right";
  groups: IGroup[];
  contentClassName?: string;
  onNextStep?: (step: number) => void;
  onPrevStep?: (step: number) => void;
}
