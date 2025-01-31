export interface Item {
  key: string;
  dataKey: string;
  paidTo: string;
  address: string;
  phoneNumber: string;
  providerEmployerID: string;
  child1: string;
  child2: string;
  child3: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "name" | "datePaid" | "state";
  record: Item;
  index: number;
  originData: Item[];
  children: React.ReactNode;
}

export interface IQuestionContainer {
  question: string | JSX.Element;
  key: string;
  style?: boolean;
  children: React.ReactNode;
}
