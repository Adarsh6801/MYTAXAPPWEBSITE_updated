import { useState } from "react";
import { useNavigate } from "react-router";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import QuestionsContainer from "../../../../components/QuestionsContainer";
import StepGiftInfo from "../components/StepGiftInfo";
import StepGift from "../components/StepGift";
import { ISignUpExpertInitialQuestionsPayload } from "../../../../redux/authSlice/index.props";
import { SIGN_UP_EXPERT_FORM_PAGE } from "../../../../constants/routes";

const Expert = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ISignUpExpertInitialQuestionsPayload>(
    {} as ISignUpExpertInitialQuestionsPayload,
  );

  const onStepSubmit = (values: object) => {
    setState({ ...state, ...values });
  };

  return (
    <QuestionsContainer
      steps={[
        {
          type: "step",
          component: <Step1 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step2 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step3 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step4 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step5 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step6 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step7 state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          type: "step",
          component: <Step8 state={state} onStepSubmit={onStepSubmit} />,
        },
        { type: "gift", component: <StepGift /> },
        {
          component: (
            <StepGiftInfo
              onNextClick={() => {
                navigate(SIGN_UP_EXPERT_FORM_PAGE, {
                  state: state,
                  replace: true,
                });
              }}
            />
          ),
        },
      ]}
    />
  );
};

export default Expert;
