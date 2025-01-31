import { useTranslation } from "react-i18next";
import { Checkbox as AntCheckbox, Form } from "antd";

import Checkbox from "../../../../../../../components/Checkbox";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IIndividualStep2FormData, IIncomeTypesData } from "./index.props";
import { INCOME_TYPES } from "../../../../../../../constants/initialQuestions";
import { IIndividualStepsProps } from "../index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step2 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep2FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep2FormData = {
    incomeTypeIds: state?.incomeTypeIds,
  };

  const data: IIncomeTypesData[] = [
    {
      label: t("individual.step2.answer1"),
      value: INCOME_TYPES.FORM_W2,
    },
    {
      label: t("individual.step2.answer2"),
      value: INCOME_TYPES.FORM_1099NEC_1099K,
    },
    {
      label: t("individual.step2.answer3"),
      value: INCOME_TYPES.FORM_K1,
    },
    {
      label: t("individual.step2.answer4"),
      value: INCOME_TYPES.FORM_1099B_1099INT_1099DIV,
    },
    {
      label: t("individual.step2.answer5"),
      value: INCOME_TYPES.RENTAL_PROPERTIES,
    },
    {
      label: t("individual.step2.answer6"),
      value: INCOME_TYPES.FORM_SSA_1099R,
    },
    {
      label: t("individual.step2.answer7"),
      value: INCOME_TYPES.FORM_OTHER,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("individual.step2.question")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          name="incomeTypeIds"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <AntCheckbox.Group className={styles.checkboxes}>
            {data.map((item, index) => (
              <Checkbox key={index} text={item.label} value={item.value} />
            ))}
          </AntCheckbox.Group>
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
