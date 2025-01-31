import { ISignUpFormData } from "../SignUpForm/index.props";

export interface ISmsVerificationFormData {
  emailValidationCode: string;
}

export interface ISmsVerificationProps {
  state: ISignUpFormData;
  nextStep?: () => void;
  prevStep?: () => void;
}
