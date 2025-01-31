import { useTranslation } from "react-i18next";
import { Form, Checkbox as AntCheckbox } from "antd";

import CircularDirection from "../../../../../../../components/CircularDirection";
import Checkbox from "../../../../../../../components/Checkbox";
import { IIndividualStepsProps } from "../index.props";
import { IIndividualStep6FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step6 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;
  const [form] = Form.useForm();

  const onFinish = (values: IIndividualStep6FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep6FormData = {
    factorThatHelpYouHirePreparer: state?.factorThatHelpYouHirePreparer || 1,
    reasonToLookNewPreparer: state?.reasonToLookNewPreparer || 1,
  };

  const answerQuestion1 = [
    { label: t("individual.step6.question1.answer1"), value: 1 },
    { label: t("individual.step6.question1.answer2"), value: 2 },
    { label: t("individual.step6.question1.answer3"), value: 3 },
    { label: t("individual.step6.question1.answer4"), value: 4 },
    { label: t("individual.step6.question1.answer5"), value: 5 },
    { label: t("individual.step6.question1.answer6"), value: 6 },
  ];

  const answerQuestion2 = [
    { label: t("individual.step6.question2.answer1"), value: 1 },
    { label: t("individual.step6.question2.answer2"), value: 2 },
    { label: t("individual.step6.question2.answer3"), value: 3 },
    { label: t("individual.step6.question2.answer4"), value: 4 },
    { label: t("individual.step6.question2.answer5"), value: 5 },
    { label: t("individual.step6.question2.answer6"), value: 6 },
  ];

  return (
    <div className={styles.mainContainer}>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
        className={styles.container}
      >
        <h2 className={styles.title}>
          {t("individual.step6.question1.question")}
        </h2>
        <Form.Item
          name="reasonToLookNewPreparer"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value.length > 0
                  ? Promise.resolve()
                  : Promise.reject(t("validations.required")),
            },
          ]}
        >
          <AntCheckbox.Group
            className={styles.checkboxes}
            defaultValue={state?.factorThatHelpYouHirePreparer}
            onChange={value => {
              value.length === 0 &&
                form.resetFields(["reasonToLookNewPreparer"]);
            }}
          >
            {answerQuestion1.map((item, index) => (
              <Checkbox key={index} text={item.label} value={item.value} />
            ))}
          </AntCheckbox.Group>
        </Form.Item>
        <h2 className={styles.title}>
          {t("individual.step6.question2.question")}
        </h2>
        <Form.Item
          name="factorThatHelpYouHirePreparer"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value.length > 0
                  ? Promise.resolve()
                  : Promise.reject(t("validations.required")),
            },
          ]}
        >
          <AntCheckbox.Group
            className={styles.checkboxes}
            defaultValue={state?.reasonToLookNewPreparer}
            onChange={value => {
              value.length === 0 &&
                form.resetFields(["factorThatHelpYouHirePreparer"]);
            }}
          >
            {answerQuestion2.map((item, index) => (
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

export default Step6;
