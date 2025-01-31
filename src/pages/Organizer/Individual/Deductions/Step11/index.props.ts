export interface IItem {
  key: string;
  index: number;
}

export interface IFormInfo {
  healthCoverage: IItem;
  uploadConfirmation: IItem;
}

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
}
