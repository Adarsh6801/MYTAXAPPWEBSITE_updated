export interface IQuestionProperties {
  key: string;
  title: any;
  subClass?: string;
}

export interface ISelectProps {
  label: string;
  value: number;
}

export interface IFormInfo {
  isTaxPayer: boolean;
  dynamicKeys: string[];
  staticKeys: string[];
}

export interface IQuestionContainer {
  question?: string | JSX.Element;
  key: string;
  children: React.ReactNode;
  subClass?: string;
}
