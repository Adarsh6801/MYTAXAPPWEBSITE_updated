export interface IItem {
  key: string;
  index: number;
}

export interface IFormInfo {
  healthSavingsAccount: IItem;
  upload1099SA: IItem;
}

export interface IQuestionContainer {
  question?: string | JSX.Element;
  key: string;
  children: React.ReactNode;
  required?: boolean;
}
