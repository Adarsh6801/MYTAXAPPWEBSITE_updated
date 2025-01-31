import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../components/RadioGroup";
import CircularDirection from "../../../../../components/CircularDirection";
import { IExpertStepsProps } from "../index.props";
import { IExpertStep2FormData } from "./index.props";
import { IRadioGroupItem } from "../../../../../components/RadioGroup/index.props";

import styles from "./index.module.css";
import { TAX_PREPARATION_TYPES } from "../../../../../constants/initialQuestions";

const noop = () => {};

const Step2 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IExpertStep2FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IExpertStep2FormData = {
    taxPreparationTypeId: state?.taxPreparationTypeId,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("expert.step2.answer1"),
      value: TAX_PREPARATION_TYPES.INDIVIDUAL,
    },
    {
      label: t("expert.step2.answer2"),
      value: TAX_PREPARATION_TYPES.BUSINESS_ENTITY,
    },
    {
      label: t("expert.step2.answer3"),
      value: TAX_PREPARATION_TYPES.BOTH,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.join_expert")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h4 className={styles.question}>{t("expert.step2.question")}</h4>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          name="taxPreparationTypeId"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup
            data={radioButtons}
            size={30}
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

export default Step2;
