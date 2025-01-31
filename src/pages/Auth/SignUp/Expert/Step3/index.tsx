import { useTranslation } from "react-i18next";
import { Form, Checkbox as AntCheckbox } from "antd";

import CircularDirection from "../../../../../components/CircularDirection";
import Checkbox from "../../../../../components/Checkbox";
import { IExpertStepsProps } from "../index.props";
import { IExpertStep3FormData, ICheckboxItem } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step3 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IExpertStep3FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IExpertStep3FormData = {
    workingTypeIds: state?.workingTypeIds,
  };

  const data: ICheckboxItem[] = [
    {
      label: t("expert.step3.answer1"),
      value: 1,
    },
    {
      label: t("expert.step3.answer2"),
      value: 2,
    },
    {
      label: t("expert.step3.answer3"),
      value: 3,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.join_expert")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h4 className={styles.question}>{t("expert.step3.question")}</h4>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          name="workingTypeIds"
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

export default Step3;
