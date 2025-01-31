import { useTranslation } from "react-i18next";
import { Form, Input, Checkbox } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IIndividualStepsProps } from "../index.props";
import { IIndividualStep9FormData } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const Step9 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep9FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IIndividualStep9FormData = {
    anythingElseForPreparer: state?.anythingElseForPreparer || "",
    areYouLookingServiceToDropDocuments:
      state?.areYouLookingServiceToDropDocuments,
    areYouAbleToDigitalizeDocuments: state?.areYouAbleToDigitalizeDocuments,
    areYouOkWithVirtualMeetings: !!state?.areYouOkWithVirtualMeetings,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step9.yes"),
      value: true,
    },
    {
      label: t("individual.step9.no"),
      value: false,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("individual.step9.question")}</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="anythingElseForPreparer"
          label={t("individual.step9.label")}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item
          name="areYouLookingServiceToDropDocuments"
          label={t("individual.step9.question1")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup size={45} data={radioButtons} direction="horizontal" />
        </Form.Item>

        <Form.Item
          name="areYouAbleToDigitalizeDocuments"
          label={t("individual.step9.question2")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup size={45} data={radioButtons} direction="horizontal" />
        </Form.Item>

        <Form.Item name="areYouOkWithVirtualMeetings" valuePropName="checked">
          <Checkbox className={styles.checkbox}>
            {t("individual.step9.virtual_meeting")}
          </Checkbox>
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

export default Step9;
