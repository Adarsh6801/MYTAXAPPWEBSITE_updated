import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import SingUpForm from "./SignUpForm";
import SmsVerification from "./SmsVerification";
import Confirmation from "./Confirmation";
import QuestionsContainer from "../../../../../components/QuestionsContainer";
import { ISignUpFormData } from "./SignUpForm/index.props";
import { ISignUpExpertInitialQuestionsPayload } from "../../../../../redux/authSlice/index.props";
import Loading from "../../../../../components/Loading";
import { RootState } from "../../../../../redux/store";

import styles from "./index.module.css";

export default () => {
  const { state: initialQuestions } = useLocation();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [state, setState] = useState<ISignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreePrivacyPolicy: false,
    phoneNumber: "",
  });

  const onStepSubmit = (values: ISignUpFormData) => {
    setState(values);
  };

  return (
    <>
      <QuestionsContainer
        steps={[
          {
            component: <SingUpForm state={state} onStepSubmit={onStepSubmit} />,
          },
          {
            component: (
              <SmsVerification
                state={state}
                initialQuestions={
                  initialQuestions as ISignUpExpertInitialQuestionsPayload
                }
              />
            ),
          },
          { component: <Confirmation /> },
        ]}
        contentClassName={styles.contentContainer}
      />
      {loading && <Loading type="secondary" />}
    </>
  );
};
