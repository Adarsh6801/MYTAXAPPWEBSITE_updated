import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, InputNumber } from "antd";

import RadioGroup from "../../../../../components/RadioGroup";
import CircularDirection from "../../../../../components/CircularDirection";
import { IExpertStepsProps } from "../index.props";
import { IExpertStep4FormData } from "./index.props";
import { IRadioGroupItem } from "../../../../../components/RadioGroup/index.props";
import {
  EMPLOYER_NUMBER_LENGTH,
  YEAR_FOUNDED_LENGTH,
} from "../../../../../constants/settings";

import styles from "./index.module.css";

const noop = () => {};

const Step4 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit, state } = props;
  const [selectedValue, setSelectedValue] = useState<boolean | undefined>(
    state?.isEnterprise,
  );

  const onFinish = (values: IExpertStep4FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const initialValues: IExpertStep4FormData = {
    isEnterprise: state?.isEnterprise,
    businessName: state?.businessName,
    yearFounded: state?.yearFounded,
    numberOfEmployees: state?.numberOfEmployees,
    yearsOfExperience: state?.yearsOfExperience,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("expert.step4.answer1.answer"),
      value: true,
    },
    {
      label: t("expert.step4.answer2.answer"),
      value: false,
    },
  ];

  const chooseType = (value: boolean | undefined): JSX.Element => {
    if (value) {
      return additionalInfo1("yearsOfExperience");
    } else if (!value && value !== undefined) {
      return additionalInfo2(
        "businessName",
        "yearFounded",
        "numberOfEmployees",
      );
    }
    return <></>;
  };

  const additionalInfo1 = (...args: string[]) => {
    return (
      <>
        <h4 className={styles.subTitle}>{t("expert.step4.answer1.title")}</h4>
        <Form.Item
          name={args[0]}
          label={t("expert.step4.answer1.label")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
            {
              validator: (_, value) => {
                return +value < 1000
                  ? Promise.resolve()
                  : Promise.reject(new Error());
              },
              message: t("validations.max_value_experiences"),
            },
          ]}
        >
          <InputNumber min={1} defaultValue={1} className={styles.fullWith} />
        </Form.Item>
      </>
    );
  };

  const additionalInfo2 = (...args: string[]) => {
    return (
      <>
        <h4 className={styles.subTitle}>{t("expert.step4.answer2.title")}</h4>
        <Form.Item
          name={args[0]}
          label={t("expert.step4.answer2.label1")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={args[1]}
          label={t("expert.step4.answer2.label2")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
            {
              validator: (_, value) => {
                return +value > 1000
                  ? Promise.resolve()
                  : Promise.reject(new Error());
              },
              message: t("validations.valid_year"),
            },
          ]}
        >
          <InputNumber
            min={0}
            minLength={YEAR_FOUNDED_LENGTH}
            maxLength={YEAR_FOUNDED_LENGTH}
            className={styles.fullWith}
          />
        </Form.Item>

        <Form.Item
          name={args[2]}
          label={t("expert.step4.answer2.label3")}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <InputNumber
            min={0}
            maxLength={EMPLOYER_NUMBER_LENGTH}
            className={styles.fullWith}
          />
        </Form.Item>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.set_up_profile")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h2 className={styles.question}>{t("expert.step4.question")}</h2>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="isEnterprise"
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup
            data={radioButtons}
            size={30}
            onChange={val => {
              setSelectedValue(val.target.value);
            }}
          />
        </Form.Item>
        {chooseType(selectedValue)}

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

export default Step4;
