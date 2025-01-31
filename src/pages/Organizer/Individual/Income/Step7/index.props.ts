export interface uploadProps {
  names: string[];
  label?: string;
  isHave?: boolean;
  haveSoon?: boolean;
}

export interface IQuestionProperties {
  key: string;
  title: any;
  subClass?: string;
}

interface Attach {
  names: string[];
  isHave: boolean;
  haveSoon: boolean;
}

export interface IFormInfo {
  uploadKey: string;
  title: JSX.Element;
  attach?: Attach;
  isRadio: boolean;
}
export interface IQuestionContainer {
  question?: string | JSX.Element;
  key: string;
  children: React.ReactNode;
  subClass?: string;
}
