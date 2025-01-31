export interface IItem {
  key: string;
  index: number;
}

export interface IFormInfo {
  ownHome: IItem;
}

export interface IQuestionContainer {
  question: string;
  key: string;
  children: React.ReactNode;
}
