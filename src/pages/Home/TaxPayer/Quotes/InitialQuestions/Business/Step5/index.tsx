import { useTranslation } from "react-i18next";
import { Form, InputNumber } from "antd";

import CircularDirection from "../../../../../../../components/CircularDirection";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep5FormData } from "./index.props";

import styles from "./index.module.css";
import { isInteger } from "lodash";

const noop = () => {};

const Step5 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;
  const [form] = Form.useForm();
  const onFinish = (values: IBusinessStep5FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep5FormData = {
    businessCheckingAccountsCount: state?.businessCheckingAccountsCount || 0,
    businessCreditCardsCount: state?.businessCreditCardsCount || 0,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step5.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="businessCheckingAccountsCount"
          label={t("business.step5.label1")}
          rules={[
            {
              required: true,
              validator: (_, value) =>
                isInteger(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("validations.natural_number"))),
            },
          ]}
        >
          <InputNumber
            min={0}
            className={styles.input}
            defaultValue={form.getFieldValue("businessCheckingAccountsCount")}
          />
        </Form.Item>
        <Form.Item
          name="businessCreditCardsCount"
          label={t("business.step5.label2")}
          rules={[
            {
              required: true,
              validator: (_, value) =>
                isInteger(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("validations.natural_number"))),
            },
          ]}
        >
          <InputNumber
            min={0}
            className={styles.input}
            defaultValue={form.getFieldValue("businessCreditCardsCount")}
          />
        </Form.Item>

        <CircularDirection
          onClickLeft={prevStep}
          rightButton={{
            htmlType: "submit",
          }}
        />
      </Form>
    </div>
  );
};

export default Step5;
