import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep11FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step11 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep11FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep11FormData = {
    haveLastMonthFinancialStatement: state?.haveLastMonthFinancialStatement,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step11.answer1"),
      value: true,
    },
    {
      label: t("business.step11.answer2"),
      value: false,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step11.title")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="haveLastMonthFinancialStatement"
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

export default Step11;
