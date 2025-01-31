import { useTranslation } from "react-i18next";
import { Form, InputNumber } from "antd";

import CircularDirection from "../../../../../../../components/CircularDirection";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep6FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step6 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;
  const [form] = Form.useForm();
  const onFinish = (values: IBusinessStep6FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep6FormData = {
    businessCheckingTransactionsCount:
      state?.businessCheckingTransactionsCount || 0,
    businessCreditCardTransactionsCount:
      state?.businessCreditCardTransactionsCount || 0,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step6.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="businessCheckingTransactionsCount"
          label={t("business.step6.label1")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <InputNumber
            min={0}
            className={styles.input}
            defaultValue={form.getFieldValue(
              "businessCheckingTransactionsCount",
            )}
          />
        </Form.Item>

        <Form.Item
          name="businessCreditCardTransactionsCount"
          label={t("business.step6.label2")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <InputNumber
            min={0}
            className={styles.input}
            defaultValue={form.getFieldValue(
              "businessCreditCardTransactionsCount",
            )}
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

export default Step6;
