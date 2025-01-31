export interface Item {
  key: string;
  name: string;
  federal: string;
  dataKey: string;
  state: string;
  datePaid: string;
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
