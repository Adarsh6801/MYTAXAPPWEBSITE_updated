export interface IQuestionContainer {
  question?: string | JSX.Element;
  onAlert?: () => void;
  onMessage?: () => void;
  data?: any;
  key: string;
  children: React.ReactNode;
}
