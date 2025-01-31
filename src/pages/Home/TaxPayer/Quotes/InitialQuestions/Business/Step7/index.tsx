import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { PERSONAL_CARD_BUSINESS_TRANSACTIONS } from "../../../../../../../constants/initialQuestions";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep7FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step7 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep7FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep7FormData = {
    haveBusinessTransactionsOnPersonalCard:
      state?.haveBusinessTransactionsOnPersonalCard,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step7.answer1"),
      value: PERSONAL_CARD_BUSINESS_TRANSACTIONS.YES,
    },
    {
      label: t("business.step7.answer2"),
      value: PERSONAL_CARD_BUSINESS_TRANSACTIONS.NO,
    },
    {
      label: t("business.step7.answer3"),
      value: PERSONAL_CARD_BUSINESS_TRANSACTIONS.IDK,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step7.question")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="haveBusinessTransactionsOnPersonalCard"
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

export default Step7;
