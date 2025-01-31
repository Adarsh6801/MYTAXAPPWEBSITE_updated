import { Dispatch } from "react";
import { IRadioGroupItem } from "../../../components/RadioGroup/index.props";
import { IDataItem } from "../../../components/Select/index.props";

export interface ITaxPayerInfoStepsProps {
  state: any;
  onStepSubmit: (values: object) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  goTo?: (pageNumber: number) => void;
}

export interface IOrganizerQuestionStatus {
  comment: string;
  reminder: boolean;
  checked?: boolean;
}

export interface IOrganizerStepProps {
  answerTypeId: number;
  quoteId: number;
  categoryId: number;
  forSpouse: boolean;
  question: string;
  message: string;
  reminder: boolean;
  answer: null | FileList | string | number | boolean;
  isFile: boolean;
  files: any;
}

export interface IOrganizerStepTestProps {
  quoteId: number;
  categoryId: number;
  forSpouse: boolean;
  question: string;
  message: string;
  reminder: boolean;
  answer: null | FileList | string | number | boolean;
  isFile: boolean;
  file?: any;
}

export interface IInput {
  name: string;
  label?: string;
  text?: string;
  key?: number;
  defaultValue?: any;
  placeholder?: string;
  hasMargin?: boolean;
  textStyle?: string;
  formStyles?: any;
  inputStyle?: string;
  required?: boolean; // Add this property
  message?: string;
  minLength?: number; // Minimum length validation
  maxLength?: number; // Maximum length validation
  minLengthMessage?: string; // Custom message for minLength
  maxLengthMessage?: string; // Custom message for maxLength
  customOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNumericOnly?: boolean;
  pattern?: {
    value: RegExp; // Regular expression for validation
    message: string; // Error message if pattern fails
  };
  maskedInputPhone?: boolean;
  maskFormat?:string;
}


export interface IInputMask {
  name: string;
  label?: string;
  text?: string;
  key?: number;
  defaultValue?: any;
  placeholder?: string;
  hasMargin?: boolean;
  textStyle?: string;
  formStyles?: any;
  inputStyle?: string;
  required?: boolean; // Add this property
  message?: string;
  minLength?: number; // Minimum length validation
  maxLength?: number; // Maximum length validation
  minLengthMessage?: string; // Custom message for minLength
  maxLengthMessage?: string; // Custom message for maxLength
  customOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNumericOnly?: boolean;
  pattern?: {
    value: RegExp; // Regular expression for validation
    message: string; // Error message if pattern fails
  };
  maskedInputPhone?: boolean;
  maskFormat:string;
}

export interface IRadio {
  name: string;
  value?: any;
  defaultValue?: any;
  direction?: "vertical" | "horizontal";
  radioButtons: IRadioGroupItem[];
  required?: boolean; // Add this property
  message?: string;
  onChange?: (value: any) => void;
}

export interface IUpload {
  key: string;
  label?: string;
  index?: number;
  multiple?: boolean;
  maxCount?: number;
  buttonText?: string;
  onClick: (index?: number) => void;
  onRemove: (index: number) => void;
  dispatch: Dispatch<any>;
  data: any;
  required?:boolean;
  allowedFileTypes?:string[];
}

export interface ISelect {
  name: string;
  data: IDataItem[];
  label?: string;
  styleSelect?: any;
  required?: boolean; // Add this property
  message?: string;
  minLength?: number; // Minimum length validation
  maxLength?: number; // Maximum length validation
  minLengthMessage?: string; // Custom message for minLength
  maxLengthMessage?: string; // Custom message for maxLength
  placeholder?: string; // Add this property
}

export interface IDataPicker {
  name: string;
  defaultValue: any;
  icon?: JSX.Element;
  label?: string;
  styleSelect?: any;
  disabledDate?: any;
  required?: boolean; // Add this property
  message?: string;
  minLength?: number; // Minimum length validation
  maxLength?: number; // Maximum length validation
  minLengthMessage?: string; // Custom message for minLength
  maxLengthMessage?: string; // Custom message for maxLength
  isNumericOnly?: boolean;
}

export interface IDataCheckbox {
  name: string;
  value: any;
  label?: string;
  style?: string;
}
