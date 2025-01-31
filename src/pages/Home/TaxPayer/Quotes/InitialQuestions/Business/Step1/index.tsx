import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep1FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step1 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep1FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step1.yes"),
      value: true,
    },
    {
      label: t("business.step1.no"),
      value: false,
    },
  ];

  const initialValues: IBusinessStep1FormData = {
    fieldPreviousEntityReturnBefore: state?.fieldPreviousEntityReturnBefore,
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      className={styles.container}
    >
      <h2 className={styles.title}>{t("business.step1.question")}</h2>
      <Form.Item
        name="fieldPreviousEntityReturnBefore"
        rules={[
          {
            required: true,
            message: t("validations.required"),
          },
        ]}
      >
        <RadioGroup
          size={45}
          data={radioButtons}
          className={styles.radioContentContainer}
          direction="horizontal"
        />
      </Form.Item>

      <CircularDirection
        hasLeft={false}
        rightButton={{
          htmlType: "submit",
        }}
      />
    </Form>
  );
};

export default Step1;
