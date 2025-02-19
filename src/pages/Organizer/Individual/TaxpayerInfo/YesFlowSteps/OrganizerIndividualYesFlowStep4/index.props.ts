export interface Item {
  key: string;
  federal: string;
  state: string;
  datePaid: string;
  paytype_amount?: string;
  paytype?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "name" | "datePaid" | "state" | "attachement" | "actions" | "paytype" | 'paytype_amount';
  record: Item;
  index: number;
  children: React.ReactNode;
  deleteRow?: any;

}
