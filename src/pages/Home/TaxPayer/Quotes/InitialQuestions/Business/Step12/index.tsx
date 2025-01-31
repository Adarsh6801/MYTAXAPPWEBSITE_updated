import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IBusinessStepsProps } from "../index.props";
import { IBusinessStep12FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step11 = (props: IBusinessStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IBusinessStep12FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IBusinessStep12FormData = {
    closedBooksForWhichRequestingTaxService:
      state?.closedBooksForWhichRequestingTaxService,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("business.step12.answer1"),
      value: true,
    },
    {
      label: t("business.step12.answer2"),
      value: false,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("business.step12.title")}</h1>
      <Form onFinish={onFinish} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="closedBooksForWhichRequestingTaxService"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup size={45} data={radioButtons} direction="horizontal" />
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

export default Step11;
