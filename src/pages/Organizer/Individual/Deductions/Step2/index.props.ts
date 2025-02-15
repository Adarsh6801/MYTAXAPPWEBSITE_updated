export interface IFormItem {
  key: string;
  index: number;
}

export interface IFormInfo {
  homeMortgage: IFormItem;
  youReceiveForm1098: IFormItem;
  uploadData: IFormItem;
  payersName: IFormItem;
  amount: IFormItem;
  secondHome: IFormItem;
  equityLoan: IFormItem;
  checkQualified: IFormItem;
  name: IFormItem;
  ssn: IFormItem;
  address: IFormItem;
  homeLoanBeen: IFormItem;
  refinanceAnyLoansYear: IFormItem;
}

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
  required?: boolean;
}
