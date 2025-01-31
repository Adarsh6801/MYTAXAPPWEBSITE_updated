import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IIndividualStepsProps } from "../index.props";
import { IIndividualStep8FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step8 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep8FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep8FormData = {
    fromWhereKnowMyTaxApp: state?.fromWhereKnowMyTaxApp || "",
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step8.answer1"),
      value: 1,
    },
    {
      label: t("individual.step8.answer2"),
      value: 2,
    },
    {
      label: t("individual.step8.answer4"),
      value: 3,
    },
    {
      label: t("individual.step8.answer5"),
      value: 4,
    },
    {
      label: t("individual.step8.answer6"),
      value: 5,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("individual.step8.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="fromWhereKnowMyTaxApp"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup size={25} data={radioButtons} direction="vertical" />
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
