import { useState } from "react";

import SingUpForm from "./SignUpForm";
import SmsVerification from "./SmsVerification";
import Confirmation from "./Confirmation";
import QuestionsContainer from "../../../../components/QuestionsContainer";
import { ISignUpFormData } from "./SignUpForm/index.props";

import styles from "./index.module.css";

export default () => {
  const [state, setState] = useState<ISignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mayCallDirectly: false,
    agreePrivacyPolicy: false,
    phoneNumber: "",
  });

  const onStepSubmit = (values: ISignUpFormData) => {
    setState(values);
  };

  return (
    <QuestionsContainer
      steps={[
        {
          component: <SingUpForm state={state} onStepSubmit={onStepSubmit} />,
        },
        {
          component: <SmsVerification state={state} />,
        },
        { component: <Confirmation /> },
      ]}
      contentClassName={styles.contentContainer}
    />
  );
};
