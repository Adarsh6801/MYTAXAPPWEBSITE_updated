import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep2FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step2 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep2FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep2FormData = {
    haveLastYearEntityReturnInPDF: state?.haveLastYearEntityReturnInPDF,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step2.yes"),
      value: true,
    },
    {
      label: t("business.step2.no"),
      value: false,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step2.question")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="haveLastYearEntityReturnInPDF"
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
            className={styles.radio}
            direction="horizontal"
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
