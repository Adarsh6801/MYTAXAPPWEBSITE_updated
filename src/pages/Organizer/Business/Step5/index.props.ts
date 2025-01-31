export interface Item {
  key: number;
  name: string;
  dataKey: string;
  value: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: any;
  record: Item;
  index: number;
  children: React.ReactNode;
}

export interface IInputsName {
  key: string;
  value: string;
}

export interface IQuestionProperties {
  key: string;
  title: any;
  subClass?: string;
}

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
}
