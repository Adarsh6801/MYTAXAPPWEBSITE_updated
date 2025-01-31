export interface IQuestionProperties {
  key: string;
  title: any;
  subClass?: string;
}

export interface IInputsName {
  key: string;
  value: string;
}

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
  subClass?: string;
}
