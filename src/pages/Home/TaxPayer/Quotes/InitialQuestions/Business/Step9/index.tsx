import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep9FormData } from "./index.props";
import { TRANSACTIONS_RECONCILE_HELPER_TYPES } from "../../../../../../../constants/initialQuestions";

import styles from "./index.module.css";

const noop = () => {};

const Step9 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep9FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep9FormData = {
    transactionsReconcileHelperId: state?.transactionsReconcileHelperId,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step9.answer1"),
      value: TRANSACTIONS_RECONCILE_HELPER_TYPES.BOOKKEEPER,
    },
    {
      label: t("business.step9.answer2"),
      value: TRANSACTIONS_RECONCILE_HELPER_TYPES.ACCOUNTANT,
    },
    {
      label: t("business.step9.answer3"),
      value: TRANSACTIONS_RECONCILE_HELPER_TYPES.CONSULTANT,
    },
    {
      label: t("business.step9.answer4"),
      value: TRANSACTIONS_RECONCILE_HELPER_TYPES.SOMEONE_ELSE,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step9.title")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="transactionsReconcileHelperId"
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

export default Step9;
