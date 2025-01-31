import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep10FormData } from "./index.props";
import { MONTHLY_FINANCIAL_STATEMENT_REPORT } from "../../../../../../../constants/initialQuestions";

import styles from "./index.module.css";

const noop = () => {};

const Step10 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep10FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep10FormData = {
    getMonthlyFinancialReportFromProvider:
      state?.getMonthlyFinancialReportFromProvider,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step10.answer1"),
      value: MONTHLY_FINANCIAL_STATEMENT_REPORT.YES,
    },
    {
      label: t("business.step10.answer2"),
      value: MONTHLY_FINANCIAL_STATEMENT_REPORT.NO,
    },
    {
      label: t("business.step10.answer3"),
      value: MONTHLY_FINANCIAL_STATEMENT_REPORT.IDK,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step10.title")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="getMonthlyFinancialReportFromProvider"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup
            size={15}
            data={radioButtons}
            contentClassName={styles.radioContentContainer}
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

export default Step10;
