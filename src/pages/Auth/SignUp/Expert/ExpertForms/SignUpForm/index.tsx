import { Trans, useTranslation } from "react-i18next";
import { Form, Checkbox, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { MaskedInput } from "antd-mask-input";

import PasswordInput from "../../../../../../components/PasswordInput";
import CircularDirection from "../../../../../../components/CircularDirection";
import { ISignUpFormData, ISignUpFormProps } from "./index.props";
import { sendEmailVerificationCode } from "../../../../../../redux/authSlice";
import { PHONE_MASK } from "../../../../../../constants/settings";
import {
  PRIVACY_POLICY_PAGE,
  TERMS_CONDITIONS_PAGE,
} from "../../../../../../constants/routes";

import styles from "./index.module.css";

const noop = () => {};

const SingUpForm = (props: ISignUpFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { nextStep = noop, state, onStepSubmit } = props;

  const onFinish = async (values: ISignUpFormData) => {
    try {
      await dispatch(sendEmailVerificationCode(values.email));
      onStepSubmit(values);
      nextStep();
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const initialValues: ISignUpFormData = {
    firstName: state?.firstName || "",
    lastName: state?.lastName || "",
    email: state?.email || "",
    password: state?.password || "",
    phoneNumber: state?.phoneNumber || "",
    agreePrivacyPolicy: !!state?.agreePrivacyPolicy,
  };

  return (
    <div style={{ justifySelf: "flex-start" }}>
      <h2 className={styles.title}>{t("individual.sing_up.exper_title")}</h2>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
        className={styles.container}
      >
        <Form.Item
          name="firstName"
          label={t("individual.sing_up.name")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <Input type="text" className={styles.input} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={t("individual.sing_up.last_name")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <Input type="text" className={styles.input} />
        </Form.Item>

        <Form.Item
          name="email"
          label={t("individual.sing_up.email")}
          rules={[
            {
              type: "email",
              message: t("validations.invalid_email"),
            },
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("individual.sing_up.password")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
            {
              min: 8,
              message: t("validations.min_password"),
            },
          ]}
        >
          <PasswordInput className={styles.input} />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={t("individual.sing_up.phone")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <MaskedInput mask={PHONE_MASK} className={styles.input} />
        </Form.Item>

        <Form.Item
          name="agreePrivacyPolicy"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("validations.required"))),
            },
          ]}
        >
          <Checkbox className={styles.text}>
            <Trans
              i18nKey="individual.sing_up.agreement"
              values={{
                privacy: "Privacy Policy",
                terms: "Terms & Conditions",
              }}
              components={[
                <a
                  href={PRIVACY_POLICY_PAGE}
                  target="_blank"
                  className={styles.linkText}
                >
                  text
                </a>,
                <a
                  href={TERMS_CONDITIONS_PAGE}
                  target="_blank"
                  className={styles.linkText}
                >
                  text
                </a>,
              ]}
            />
          </Checkbox>
        </Form.Item>

        <CircularDirection
          hasLeft={false}
          rightButton={{
            htmlType: "submit",
          }}
        />
      </Form>
    </div>
  );
};

export default SingUpForm;
