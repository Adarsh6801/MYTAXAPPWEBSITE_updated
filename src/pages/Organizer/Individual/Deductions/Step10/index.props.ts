export interface IItem {
  key: string;
  index?: number;
}

export interface IFormInfo {
  accountPayer: IItem;
  largestBalance: IItem;
}

export interface IQuestionContainer {
  question?: string | JSX.Element;
  key: string;
  children: React.ReactNode;
}
