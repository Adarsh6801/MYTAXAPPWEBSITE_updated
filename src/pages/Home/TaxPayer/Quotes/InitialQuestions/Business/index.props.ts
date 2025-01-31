import { ISignUpBusinessPayload } from "../../../../../../redux/authSlice/index.props";

export interface IBusinessStepsProps {
  state: ISignUpBusinessPayload;
  onStepSubmit: (values: object) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}

export interface IBusinessInitialQuestionsProps {
  onSubmit?: (state: ISignUpBusinessPayload) => void;
}
