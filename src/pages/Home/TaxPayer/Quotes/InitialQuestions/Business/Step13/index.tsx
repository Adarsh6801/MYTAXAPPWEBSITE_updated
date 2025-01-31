import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep13FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step13 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep13FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep13FormData = {
    sendInvoicesToGetPaid: state?.sendInvoicesToGetPaid,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step13.answer1"),
      value: true,
    },
    {
      label: t("business.step13.answer2"),
      value: false,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step13.title")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="sendInvoicesToGetPaid"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup size={45} data={radioButtons} direction="horizontal" />
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

export default Step13;
