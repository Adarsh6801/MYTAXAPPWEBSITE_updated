export interface IStep {
  type?: "gift" | "step";
  component: JSX.Element;
}

export interface IQuestionsContainerProps {
  ref?: React.Ref<any>;
  justifyContent?: "left" | "center" | "right";
  steps: IStep[];
  contentClassName?: string;
  onNextStep?: (step: number) => void;
  onPrevStep?: (step: number) => void;
}
