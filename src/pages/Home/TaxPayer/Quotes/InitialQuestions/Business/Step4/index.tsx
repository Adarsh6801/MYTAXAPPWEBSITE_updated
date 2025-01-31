import { useTranslation } from "react-i18next";
import { Form } from "antd";

import CircularDirection from "../../../../../../../components/CircularDirection";
import RadioGroup from "../../../../../../../components/RadioGroup";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep4FormData } from "./index.props";
import { ACCOUNTING_SOFTWARE } from "../../../../../../../constants/initialQuestions";

import styles from "./index.module.css";

const noop = () => {};

const Step4 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep4FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step4.answer1"),
      value: ACCOUNTING_SOFTWARE.QUICK_BOOKS,
    },
    {
      label: t("business.step4.answer2"),
      value: ACCOUNTING_SOFTWARE.XERO,
    },
    {
      label: t("business.step4.answer3"),
      value: ACCOUNTING_SOFTWARE.EXCEL,
    },
    {
      label: t("business.step4.answer4"),
      value: ACCOUNTING_SOFTWARE.OTHER,
    },
    {
      label: t("business.step4.answer5"),
      value: ACCOUNTING_SOFTWARE.IDK,
    },
  ];

  const initialValues: IBusinessStep4FormData = {
    businessTransactionAccountingSoftwareId:
      state?.businessTransactionAccountingSoftwareId,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step4.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="businessTransactionAccountingSoftwareId"
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

export default Step4;
