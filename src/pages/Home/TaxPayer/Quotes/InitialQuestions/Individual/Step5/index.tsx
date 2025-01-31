import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IIndividualStepsProps } from "../index.props";
import { IIndividualStep5FormData } from "./index.props";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { LAST_YEAR_PREPARATION_TYPES } from "../../../../../../../constants/initialQuestions";

import styles from "./index.module.css";

const noop = () => {};

const Step5 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep5FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep5FormData = {
    lastYearPreparedExpertId: state?.lastYearPreparedExpertId,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step5.answer1"),
      value: LAST_YEAR_PREPARATION_TYPES.SELF_PREPARED,
    },
    {
      label: t("individual.step5.answer2"),
      value: LAST_YEAR_PREPARATION_TYPES.CPA,
    },
    {
      label: t("individual.step5.answer3"),
      value: LAST_YEAR_PREPARATION_TYPES.ENROLLED_AGENT,
    },
    {
      label: t("individual.step5.answer4"),
      value: LAST_YEAR_PREPARATION_TYPES.TAX_PREPARER,
    },
    {
      label: t("individual.step5.answer5"),
      value: LAST_YEAR_PREPARATION_TYPES.OTHER,
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>{t("individual.step5.question")}</h1>
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        className={styles.container}
      >
        <Form.Item
          name="lastYearPreparedExpertId"
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
