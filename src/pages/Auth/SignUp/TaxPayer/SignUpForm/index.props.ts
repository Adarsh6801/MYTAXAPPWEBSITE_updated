export interface ISignUpFormData {
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  mayCallDirectly?: boolean;
  agreePrivacyPolicy: boolean;
  timeZone?: string;
}

export interface ISignUpFormProps {
  state: ISignUpFormData;
  onStepSubmit: (values: ISignUpFormData) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}
