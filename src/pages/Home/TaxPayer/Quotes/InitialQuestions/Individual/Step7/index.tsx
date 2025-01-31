import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IIndividualStepsProps } from "../index.props";
import { IIndividualStep7FormData } from "./index.props";
import { LAST_YEAR_PREPARATION_COSTS } from "../../../../../../../constants/initialQuestions";

import styles from "./index.module.css";

const noop = () => {};

const Step7 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep7FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep7FormData = {
    lastYearPreparationCostId: state?.lastYearPreparationCostId,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step7.answer1"),
      value: LAST_YEAR_PREPARATION_COSTS.UP_TO_250,
    },
    {
      label: t("individual.step7.answer2"),
      value: LAST_YEAR_PREPARATION_COSTS.UP_TO_500,
    },
    {
      label: t("individual.step7.answer3"),
      value: LAST_YEAR_PREPARATION_COSTS.UP_TO_750,
    },
    {
      label: t("individual.step7.answer4"),
      value: LAST_YEAR_PREPARATION_COSTS.OVER_750,
    },
    {
      label: t("individual.step7.answer5"),
      value: LAST_YEAR_PREPARATION_COSTS.NOT_REMEMBER,
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>{t("individual.step7.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
        className={styles.container}
      >
        <Form.Item
          name="lastYearPreparationCostId"
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

export default Step7;
