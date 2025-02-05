export interface IQuestionProperties {
  key: string;
  title: any;
  subClass?: string;
}

export interface IInputsName {
  key: string;
  value: string;
  pattern?: {
    value: RegExp; // Regular expression for validation
    message: string; // Error message if pattern fails
  };
  required?: boolean; // Add this property
  placeholder?: string;

}

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
  subClass?: string;
  required?: boolean;
}
