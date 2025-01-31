import { useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../../components/RadioGroup";
import Select from "../../../../../../../components/Select";
import CircularDirection from "../../../../../../../components/CircularDirection";
import { IRadioGroupItem } from "../../../../../../../components/RadioGroup/index.props";
import { IIndividualStepsProps } from "../index.props";
import { IIndividualStep1FormData } from "./index.props";

import countries from "../../../../../../../assets/json/countries.json";
import states from "../../../../../../../assets/json/states.json";
import styles from "./index.module.css";

const noop = () => {};

const Step1 = (props: IIndividualStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, onStepSubmit, state } = props;

  const onFinish = (values: IIndividualStep1FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("individual.step1.yes"),
      value: true,
    },
    {
      label: t("individual.step1.no"),
      value: false,
    },
  ];

  const dataCountry = countries.map(country => ({
    label: country.name,
    value: country.name,
  }));

  const dataState = states.map(state => ({
    label: state.name,
    value: state.name,
  }));

  const initialValues: IIndividualStep1FormData = {
    country: state?.country || dataCountry[0].value,
    state: state?.state,
    isMarried: state?.isMarried,
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      className={styles.container}
    >
      <h2 className={styles.title}>{t("individual.step1.question")}</h2>
      <Form.Item
        name="country"
        label={t("individual.step1.country")}
        rules={[
          {
            required: true,
            message: t("validations.required"),
          },
        ]}
      >
        <Select data={dataCountry} />
      </Form.Item>

      <Form.Item
        name="state"
        label={"State"}
        rules={[
          {
            required: true,
            message: t("individual.step1.state"),
          },
        ]}
      >
        <Select data={dataState} className={styles.radioContentContainer} />
      </Form.Item>

      <h2 className={styles.title}>{t("individual.step1.married")}</h2>
      <Form.Item
        name="isMarried"
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
          contentClassName={styles.radioContentContainer}
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
