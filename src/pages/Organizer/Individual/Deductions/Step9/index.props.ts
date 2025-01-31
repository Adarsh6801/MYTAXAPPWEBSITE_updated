export interface IItem {
  key: string;
  index: number;
}

export interface IFormInfo {
  healthSavingsAccount: IItem;
  upload1098E: IItem;
  educationExpenses: IItem;
  upload1098T: IItem;
}

export interface IQuestionContainer {
  question?: string | JSX.Element;
  key: string;
  children: React.ReactNode;
}
