export interface IItem {
  key: string;
  index: number;
}

export interface IFormInfo {
  filedEntityTaxReturn: IItem;
  haveDigitalCopyInPdfFormat: IItem;
  previousTaxDocumnt: IItem;
}

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
}
