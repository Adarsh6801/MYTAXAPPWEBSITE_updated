import { IOrganizerStepProps } from "../../pages/Organizer/Individual/index.props";

export interface IOrganizerQuestionContainer {
  question?: string | JSX.Element;
  data: IOrganizerStepProps | any;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  subClass?: string;
  questionClassName?: string;
  disabled?: boolean;
  onAlert?: () => void;
  onMessage?: (comment: string) => void;
  required?: boolean;
}
