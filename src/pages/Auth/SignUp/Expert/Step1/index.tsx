import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";

import RadioGroup from "../../../../../components/RadioGroup";
import Select from "../../../../../components/Select";
import CircularDirection from "../../../../../components/CircularDirection";
import { IExpertStepsProps } from "../index.props";
import { IExpertStep1FormData } from "./index.props";
import { IRadioGroupItem } from "../../../../../components/RadioGroup/index.props";
import { TAX_PREPARER_TYPE } from "../../../../../constants/initialQuestions";
import { PTIN_LENGTH } from "../../../../../constants/settings";
import states from "../../../../../assets/json/states.json";
import styles from "./index.module.css";

const noop = () => {};

const Step1 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { nextStep = noop, onStepSubmit, state } = props;
  const [chooseIndex, setChooseIndex] = useState(state?.taxPreparerTypeId);

  const onFinish = (values: IExpertStep1FormData) => {
    onStepSubmit(values);
    nextStep();
  };

  const dataState = states.map(state => ({
    label: state.name,
    value: state.name,
  }));

  const initialValues: IExpertStep1FormData = {
    taxPreparerTypeId: state?.taxPreparerTypeId,
    taxPreparerPTINumber: state?.taxPreparerPTINumber,
    taxPreparerBarNumber: state?.taxPreparerBarNumber,
    taxPreparerState: state?.taxPreparerState,
    taxPreparerLicenseNumber: state?.taxPreparerLicenseNumber,
    taxPreparerEnrolledAgentNumber: state?.taxPreparerEnrolledAgentNumber,
    taxPreparerProofOfAnnualFilingSeasonProgram:
      state?.taxPreparerProofOfAnnualFilingSeasonProgram,
  };

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("expert.step1.answer1.answer"),
      value: TAX_PREPARER_TYPE.ATTORNEY,
    },
    {
      label: t("expert.step1.answer2.answer"),
      value: TAX_PREPARER_TYPE.CPA,
    },
    {
      label: t("expert.step1.answer3.answer"),
      value: TAX_PREPARER_TYPE.ENROLLED_AGENT,
    },
    {
      label: t("expert.step1.answer4.answer"),
      value: TAX_PREPARER_TYPE.REGISTERED_TAX_PREPARER,
    },
  ];

  const chooseType = (type: number): JSX.Element => {
    switch (type) {
      case TAX_PREPARER_TYPE.ATTORNEY:
        return render3FormItems({
          firstInput: "taxPreparerBarNumber",
          secondInput: "taxPreparerState",
          firstLabel: t("expert.step1.answer1.label2"),
          secondeLabel: t("expert.step1.answer1.label3"),
        });
      case TAX_PREPARER_TYPE.CPA:
        return render3FormItems({
          firstInput: "taxPreparerLicenseNumber",
          secondInput: "taxPreparerState",
          firstLabel: t("expert.step1.answer1.label4"),
          secondeLabel: t("expert.step1.answer1.label3"),
        });
      case TAX_PREPARER_TYPE.ENROLLED_AGENT:
        return render2FormItems({
          firstInput: "taxPreparerPTINumber",
          secondInput: "taxPreparerEnrolledAgentNumber",
          firstLabel: t("expert.step1.answer1.label1"),
          secondeLabel: t("expert.step1.answer1.label5"),
        });
      case TAX_PREPARER_TYPE.REGISTERED_TAX_PREPARER:
        return render4FormItems({
          firstInput: "taxPreparerPTINumber",
          firstLabel: t("expert.step1.answer1.label1"),
        });
      default:
        return <></>;
    }
  };
  const render4FormItems = (data: any) => {
    const { firstInput, firstLabel } = data;
    return (
      <Form.Item
        name={firstInput}
        label={firstLabel}
        rules={[
          {
            validator: (_, value) =>
              value && value.trim() ? Promise.resolve() : Promise.reject(),
          },
          {
            message: t("validations.invalid_pin"),
            validator: (_, value) => {
              const regex = new RegExp(/[A-Z]{1}?\d{6}?/i);
              return value && value.match(regex)
                ? Promise.resolve()
                : Promise.reject();
            },
          },
        ]}
      >
        <Input maxLength={PTIN_LENGTH} />
      </Form.Item>
    );
  };
  const render3FormItems = (data: any) => {
    const { firstInput, secondInput, firstLabel, secondeLabel } = data;
    return (
      <>
        <Form.Item
          name={firstInput}
          label={firstLabel}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
            firstInput && {
              max: 6,
              message: "Please write valid BAR Number",
            },
            firstInput && {
              min: 3,
              message: "Please write valid BAR Number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={secondInput}
          label={secondeLabel}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <Select data={dataState} />
        </Form.Item>
      </>
    );
  };

  const render2FormItems = (data: any) => {
    const { firstInput, secondInput, firstLabel, secondeLabel } = data;
    return (
      <>
        <Form.Item
          name={firstInput}
          label={firstLabel}
          rules={[
            {
              required: true,
              message: t("validations.required"),
              validator: (_, value) => {
                return (value && value.trim()) ||
                  form.getFieldValue(secondInput)
                  ? Promise.resolve()
                  : Promise.reject();
              },
            },
            {
              message: t("validations.invalid_pin"),
              validator: (_, value) => {
                const regex = new RegExp(/[A-Z]{1}?\d{6}?/i);
                return value.match(regex) || form.getFieldValue(secondInput)
                  ? Promise.resolve()
                  : Promise.reject();
              },
            },
          ]}
        >
          <Input maxLength={PTIN_LENGTH} />
        </Form.Item>

        <Form.Item
          name={secondInput}
          label={secondeLabel}
          rules={[
            {
              message: t("validations.required"),
              validator: (_, value) => {
                return (value && value.trim()) || form.getFieldValue(firstInput)
                  ? Promise.resolve()
                  : Promise.reject();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.join_expert")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h2 className={styles.question}>{t("expert.step1.question")}</h2>
      <Form
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          name="taxPreparerTypeId"
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
              setChooseIndex(val.target.value);
            }}
            contentClassName={styles.radioContentContainer}
          />
        </Form.Item>
        {chooseType(chooseIndex)}
        <CircularDirection
          hasLeft={false}
          rightButton={{
            htmlType: "submit",
          }}
        />
      </Form>
    </div>
  );
};

export default Step1;
