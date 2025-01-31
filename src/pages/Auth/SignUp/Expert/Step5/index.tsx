import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";

import CircularDirection from "../../../../../components/CircularDirection";
import { IExpertStepsProps } from "../index.props";
import { IExpertStep5FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step5 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IExpertStep5FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IExpertStep5FormData = {
    aboutBusinessOrServiceStandOut: state?.aboutBusinessOrServiceStandOut,
    linkedin: state?.linkedin,
    website: state?.website,
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.join_expert")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h2 className={styles.title}>{t("expert.step5.question")}</h2>
      <p>{t("expert.step5.label1")}</p>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item name="aboutBusinessOrServiceStandOut">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <p className={styles.description}>{t("expert.step5.description")}</p>
        <Form.Item
          name="linkedin"
          label={t("expert.step5.label2")}
          rules={[
            {
              validator: (_, value) => {
                const regex = new RegExp(
                  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                );
                return (value && value.match(regex)) || value == undefined
                  ? Promise.resolve()
                  : Promise.reject();
              },
              message: t("validations.invalid_web_url"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="website"
          label={t("expert.step5.label3")}
          rules={[
            {
              validator: (_, value) => {
                const regex = new RegExp(
                  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                );
                return (value && value.match(regex)) || value == undefined
                  ? Promise.resolve()
                  : Promise.reject();
              },
              message: t("validations.invalid_web_url"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <CircularDirection
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default Step5;
