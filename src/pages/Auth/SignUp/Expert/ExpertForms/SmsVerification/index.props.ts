import { ISignUpExpertInitialQuestionsPayload } from "../../../../../../redux/authSlice/index.props";
import { ISignUpFormData } from "../SignUpForm/index.props";

export interface ISmsVerificationFormData {
  emailValidationCode: string;
}

export interface ISmsVerificationProps {
  state: ISignUpFormData;
  initialQuestions: ISignUpExpertInitialQuestionsPayload;
  nextStep?: () => void;
  prevStep?: () => void;
}
