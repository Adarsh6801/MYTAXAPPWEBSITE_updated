import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { DEDUCTION_TYPES } from "../../../../../../../constants/initialQuestions";
import { IIndividualStep4FormData } from "./index.props";
import { IIndividualStepsProps } from "../index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step5 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep4FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep4FormData = {
    deductionTypeId: state?.deductionTypeId,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step4.answer1"),
      value: DEDUCTION_TYPES.ITEMIZE,
    },
    {
      label: t("individual.step4.answer2"),
      value: DEDUCTION_TYPES.STANDARD,
    },
    {
      label: t("individual.step4.answer3"),
      value: DEDUCTION_TYPES.IDK,
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>{t("individual.step4.question")}</h1>
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        className={styles.container}
      >
        <Form.Item
          name="deductionTypeId"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup
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

export default Step5;
