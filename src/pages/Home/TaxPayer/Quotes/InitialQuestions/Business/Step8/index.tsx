import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { TRANSACTIONS_RECONCILED_MONTHLY } from "../../../../../../../constants/initialQuestions";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep8FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step8 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep8FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep8FormData = {
    haveCardTransactionsReconciledOnMonthlyBasis:
      state?.haveCardTransactionsReconciledOnMonthlyBasis,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step8.answer1"),
      value: TRANSACTIONS_RECONCILED_MONTHLY.YES,
    },
    {
      label: t("business.step8.answer2"),
      value: TRANSACTIONS_RECONCILED_MONTHLY.NO,
    },
    {
      label: t("business.step8.answer3"),
      value: TRANSACTIONS_RECONCILED_MONTHLY.IDK,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step8.question")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="haveCardTransactionsReconciledOnMonthlyBasis"
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

export default Step8;
