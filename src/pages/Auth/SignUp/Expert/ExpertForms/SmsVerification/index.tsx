import { Trans, useTranslation } from "react-i18next";
import ReactCodeInput from "react-code-input";
import { useDispatch } from "react-redux";
import { Form, message } from "antd";

import Button from "../../../../../../components/Button";
import CircularDirection from "../../../../../../components/CircularDirection";
import { SMS_CODE_LENGTH } from "../../../../../../constants/settings";
import { signIn, signUpExpert } from "../../../../../../redux/authSlice";
import { ISmsVerificationFormData, ISmsVerificationProps } from "./index.props";
import { ISignUpExpertInitialQuestionsPayload } from "../../../../../../redux/authSlice/index.props";

import styles from "./index.module.css";

const noop = () => {};

const SmsVerification = (props: ISmsVerificationProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { nextStep = noop, prevStep = noop, state, initialQuestions } = props;

  const onFinish = async (values: ISmsVerificationFormData) => {
    try {
      await dispatch(
        signUpExpert({
          ...state,
          ...values,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          initialQuestions:
            initialQuestions as ISignUpExpertInitialQuestionsPayload,
        }),
      );
      await dispatch(signIn({ email: state.email, password: state.password }));

      nextStep();
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const checkCode = (_: any, value: any) => {
    if (value.length === SMS_CODE_LENGTH) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(t("validations.wrong_sms_code")));
  };

  const initialValues: ISmsVerificationFormData = {
    emailValidationCode: "",
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h4 className={styles.title}>
          {t("individual.sms_verification.title")}
        </h4>
        <p className={styles.text}>
          {
            <Trans
              i18nKey="individual.sms_verification.description"
              values={{ email: state?.email }}
              components={[<>text</>]}
            />
          }
        </p>
      </div>
      <div>
        <Form onFinish={onFinish} initialValues={initialValues}>
          <Form.Item
            name="emailValidationCode"
            rules={[
              {
                required: true,
                validator: checkCode,
              },
            ]}
          >
            <ReactCodeInput
              name="emailValidationCode"
              inputMode={"numeric"}
              type="tel"
              fields={SMS_CODE_LENGTH}
              inputStyle={{
                width: "60px",
                height: "80px",
                fontSize: "50px",
                textAlign: "center",
                borderRadius: "4px",
                color: "black",
                marginRight: "30px",
                border: "1px solid #CAD5F8",
              }}
            />
          </Form.Item>

          <div className={styles.buttonContainer}>
            <Button
              type="link"
              text={t("individual.sms_verification.resend")}
            />

            <CircularDirection
              rightButton={{
                htmlType: "submit",
              }}
              onClickLeft={prevStep}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SmsVerification;
