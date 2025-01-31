import { ISignUpIndividualPayload } from "../../../../../../redux/authSlice/index.props";

export interface IIndividualStepsProps {
  state: ISignUpIndividualPayload;
  onStepSubmit: (values: object) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}

export interface IIndividualInitialQuestionsProps {
  onSubmit?: (state: ISignUpIndividualPayload) => void;
}
