import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IIndividualStep3FormData } from "./index.props";
import { IIndividualStepsProps } from "../index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step3 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep3FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep3FormData = {
    isOwnHome: state?.isOwnHome,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step3.yes"),
      value: true,
    },
    {
      label: t("individual.step3.no"),
      value: false,
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>{t("individual.step3.question")}</h1>
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        className={styles.container}
      >
        <Form.Item
          name="isOwnHome"
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

export default Step3;
