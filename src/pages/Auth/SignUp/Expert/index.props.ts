import { ISignUpExpertInitialQuestionsPayload } from "../../../../redux/authSlice/index.props";

export interface IExpertStepsProps {
  state: ISignUpExpertInitialQuestionsPayload;
  onStepSubmit: (values: object) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}
