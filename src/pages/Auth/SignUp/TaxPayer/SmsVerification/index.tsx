import { Trans, useTranslation } from "react-i18next";
import ReactCodeInput from "react-code-input";
import { useDispatch } from "react-redux";
import { Form, message } from "antd";
import { isInteger } from "lodash";

import Button from "../../../../../components/Button";
import CircularDirection from "../../../../../components/CircularDirection";
import { SMS_CODE_LENGTH } from "../../../../../constants/settings";
import {
  sendEmailVerificationCode,
  signIn,
  signUpTaxPayer,
} from "../../../../../redux/authSlice";
import { ISmsVerificationFormData, ISmsVerificationProps } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const SmsVerification = (props: ISmsVerificationProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { nextStep = noop, prevStep = noop, state } = props;

  const onFinish = async (values: ISmsVerificationFormData) => {
    try {
      message.loading(t("validations.loading"), 1);

      await dispatch(
        signUpTaxPayer({
          ...state,
          ...values,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      );
      await dispatch(signIn({ email: state.email, password: state.password }));

      nextStep();
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const resentCode = async () => {
    await dispatch(sendEmailVerificationCode(state.email));
  };

  const checkCode = (_: any, value: any) => {
    if (value.length === SMS_CODE_LENGTH && isInteger(+value)) {
      return Promise.resolve();
    }
    if (value.length === SMS_CODE_LENGTH) {
      return Promise.reject(new Error(t("validations.wrong_sms_code")));
    }
    if (value.length === 0) {
      return Promise.reject(new Error(t("validations.required")));
    }
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
              onClick={resentCode}
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
