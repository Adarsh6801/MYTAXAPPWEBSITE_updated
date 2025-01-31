import { useTranslation } from "react-i18next";
import { Checkbox as AntCheckbox, Form } from "antd";

import Checkbox from "../../../../../../../components/Checkbox";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { THIRD_PARTY_PAYMENT_PROCESSOR_TYPE } from "../../../../../../../constants/initialQuestions";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep14FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step14 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep14FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep14FormData = {
    thirdPartyPaymentProcessorId: state?.thirdPartyPaymentProcessorId,
  };

  const data: IRadioGroupItem[] = [
    {
      label: t("business.step14.answer1"),
      value: THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.PAYPAL,
    },
    {
      label: t("business.step14.answer2"),
      value: THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.SQUARE,
    },
    {
      label: t("business.step14.answer3"),
      value: THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.STRIPE,
    },
    {
      label: t("business.step14.answer4"),
      value: THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.ZELLE,
    },
    {
      label: t("business.step14.answer5"),
      value: THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.OTHER,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step14.title")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="thirdPartyPaymentProcessorId"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <AntCheckbox.Group className={styles.checkboxes}>
            {data.map((item, index) => (
              <Checkbox key={index} text={item.label} value={item.value} />
            ))}
          </AntCheckbox.Group>
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

export default Step14;
