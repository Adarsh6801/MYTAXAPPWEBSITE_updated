export interface IQuestionContainer {
  question: string | JSX.Element;
  key: string;
  style?: boolean;
  children: React.ReactNode;
}
