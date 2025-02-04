export interface Item {
  key: number;
  name: string;
  dataKey: string;
  you: string;
  spouse: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "name" | "datePaid" | "state";
  record: Item;
  index: number;
  children: React.ReactNode;
}

export interface IInputsName {
  key: string;
  value: string;
  pattern?:{
    value: RegExp;
    message: string;
  }
  required?: boolean;
  placeholder?: string;
}

export interface IQuestionProperties {
  key: string;
  title: any;
  subClass?: string;
}

export interface IQuestionContainer {
  question?: string | JSX.Element;
  key: string;
  children: React.ReactNode;
  subClass?: string;
}
