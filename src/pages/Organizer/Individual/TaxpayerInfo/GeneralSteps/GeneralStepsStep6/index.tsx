import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, Divider, Form, Input, Upload } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import Button from "../../../../../../components/Button";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { getClassNames, findIndexData } from "../../../../../../helpers/format";
import { dummyRequest } from "../../../../../../helpers/file";
import {
  taxpayerCheckbox,
  spouseCheckbox,
  formInfoSpouseKeysStep6,
  formInfoTaxPayerKeysStep6,
} from "../../../../../../constants/organizer";

import Attach from "../../../../../../assets/svgs/attach.svg";
import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep6 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [spouse, setSpouse] = useState(false);
  const [data, setData] = useState<any[]>([
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerEIPAmount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerIRSAmount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerIRSFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerCoverdellEducationAccountFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerSec529TuitionPlan_Contribution",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerSec529TuitionPlan_Distribution",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerSec529TuitionPlan_1099_QFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerHSA_ContributionOtherThenViaEmployer",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerHSA_Distribution",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerHSA_1099_SAFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerChild_AdoptionExpenses",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerChild_SpecialNeedsChild",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerChild_EducatorExpenses",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseEIPAmount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseIRSAmount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseIRSFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseCoverdellEducationAccountFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseSec529TuitionPlan_Contribution",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseSec529TuitionPlan_Distribution",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseSec529TuitionPlan_1099_QFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseHSA_ContributionOtherThenViaEmployer",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseHSA_Distribution",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseHSA_1099_SAFile",
      value: null,
      comment: "",
      reminder: false,
      isFile: true,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseChild_AdoptionExpenses",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseChild_SpecialNeedsChild",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseChild_EducatorExpenses",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
  ]);

  const onFinish = (values: any) => {
    onStepSubmit(values);
    nextStep();
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);
    const newData = [...data];

    if (index !== -1) {
      newData[index] = {
        categoryId: data[index].categoryId,
        forSpouse: data[index].forSpouse,
        question: data[index].question,
        value: value[name],
        comment: data[index].comment,
        reminder: data[index].reminder,
        isFile: data[index].isFile,
        file: data[index].isFile ? value[name].fileList : data[index].file,
      };
      setData(newData);
    }
  };

  const initialValues = {
    taxPayerEIPAmount: null,
    checkboxEipReceived: false,
    checkboxEipAmount: false,
    checkboxHsa: false,
    checkboxIRS: null,
    spouseCheckboxEipReceived: false,
    spouseCheckboxIRS: false,
    spouseCheckboxCEA: false,
    spouseCheckboxEipAmount: false,
    spouseCheckboxHsa: false,
    spouseCheckboxChild: false,
    accountNumber: null,
    city: null,
    alternateHomePhoneNumber: null,
  };

  const attachUpload = (name: string, label: string, checkbox: any) => (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: false,
        },
        ({ getFieldValue }) => ({
          validator(item, value) {
            if (getFieldValue(checkbox) === true && _.isEmpty(value)) {
              return Promise.reject(new Error(t("validations.required")));
            }
            return Promise.resolve();
          },
        }),
      ]}
      valuePropName="file"
      className={styles.upload}
    >
      <Upload
        name="file"
        accept="image/png,image/jpeg,application/doc,application/pdf"
        customRequest={dummyRequest}
      >
        <Button
          icon={<img src={Attach} className={styles.img} />}
          text={t("expert.step8.attach")}
          type="ghost"
        />
      </Upload>
    </Form.Item>
  );

  const input = (names: string[], label: string, text?: string) => {
    const [formName, checkbox] = names;

    return (
      <div className={styles.inputContainer}>
        <Form.Item
          name={checkbox}
          valuePropName="checked"
          rules={[
            {
              required: false,
              message: t("validations.required"),
            },
          ]}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name={formName}
          label={label}
          dependencies={[checkbox]}
          rules={[
            {
              required: false,
            },
            ({ getFieldValue }) => ({
              validator(item, value) {
                if (getFieldValue(checkbox) === true && _.isEmpty(value)) {
                  return Promise.reject(new Error(t("validations.required")));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <p className={styles.promptText}>{text}</p>
      </div>
    );
  };

  const inputsFile = (names: string[], labels: string[]) => {
    const [formName1, formName2, formName3, checkbox] = names;
    const [label1, label2, label3] = labels;

    return (
      <div className={styles.inputContainer}>
        <Form.Item
          name={checkbox}
          valuePropName="checked"
          rules={[
            {
              required: false,
              message: t("validations.required"),
            },
          ]}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name={formName1}
          label={label1}
          dependencies={[checkbox]}
          rules={[
            {
              required: false,
            },
            ({ getFieldValue }) => ({
              validator(item, value) {
                if (getFieldValue(checkbox) === true && _.isEmpty(value)) {
                  return Promise.reject(new Error(t("validations.required")));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={formName2}
          label={label2}
          dependencies={[checkbox]}
          rules={[
            {
              required: false,
            },
            ({ getFieldValue }) => ({
              validator(item, value) {
                if (getFieldValue(checkbox) === true && _.isEmpty(value)) {
                  return Promise.reject(new Error(t("validations.required")));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        {attachUpload(formName3, label3, checkbox)}
      </div>
    );
  };

  const questionContainer = (
    key: string,
    label: string,
    children: JSX.Element,
  ) => {
    const index: number = +findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        data={data[index]}
        question={label}
        onAlert={() => {
          const newData = [...data];
          newData[index] = { ...data[index], reminder: !data[index].reminder };
          setData(newData);
        }}
        onMessage={(comment: string) => {
          const newData = [...data];
          newData[index] = { ...data[index], comment: comment };
          setData(newData);
        }}
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (names: string[], checkbox: string[], style: boolean) => {
    const [
      eipAmount,
      irsAmount,
      irsFile,
      coverdellEducationAccountFile,
      sec529TuitionPlan_Contribution,
      sec529TuitionPlan_Distribution,
      sec529TuitionPlan_1099_QFile,
      hhsa_ContributionOtherThenViaEmployer,
      hSA_Distribution,
      hSA_1099_SAFile,
      child_AdoptionExpenses,
      child_SpecialNeedsChild,
      child_EducatorExpenses,
    ] = names;
    const [
      checkboxEipReceived,
      checkboxIRS,
      checkboxCEA,
      checkboxEipAmount,
      checkboxHsa,
      checkboxChild,
    ] = checkbox;
    return (
      <div className={getClassNames(style && styles.marginTop)}>
        {questionContainer(
          eipAmount,
          t("organizer.individual.general_steps.step6.question1"),
          input([eipAmount, checkboxEipReceived], "Amount"),
        )}
        <Divider />
        {questionContainer(
          irsAmount,
          t("organizer.individual.general_steps.step6.question2"),
          <div>
            <Form.Item
              name={checkboxIRS}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                  message: t("validations.required"),
                },
              ]}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              name={irsAmount}
              label={t("organizer.individual.general_steps.step6.amount")}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                },
                ({ getFieldValue }) => ({
                  validator(item, value) {
                    if (
                      getFieldValue(checkboxIRS) === true &&
                      _.isEmpty(value)
                    ) {
                      return Promise.reject(
                        new Error(t("validations.required")),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            {attachUpload(irsFile, "1099-Q", checkboxIRS)}
          </div>,
        )}
        <Divider />
        {questionContainer(
          coverdellEducationAccountFile,
          t("organizer.individual.general_steps.step6.question3"),
          <div>
            <Form.Item
              name={checkboxCEA}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                  message: t("validations.required"),
                },
              ]}
            >
              <Checkbox />
            </Form.Item>
            {attachUpload(coverdellEducationAccountFile, "1099-Q", checkboxCEA)}
          </div>,
        )}
        <Divider />

        {questionContainer(
          sec529TuitionPlan_Contribution,
          t("organizer.individual.general_steps.step6.question4"),
          inputsFile(
            [
              sec529TuitionPlan_Contribution,
              sec529TuitionPlan_Distribution,
              sec529TuitionPlan_1099_QFile,
              checkboxEipAmount,
            ],
            ["Contribution", "Distribution", "1099-Q"],
          ),
        )}
        <Divider />
        {questionContainer(
          hhsa_ContributionOtherThenViaEmployer,
          t("organizer.individual.general_steps.step6.question5"),
          inputsFile(
            [
              hhsa_ContributionOtherThenViaEmployer,
              hSA_Distribution,
              hSA_1099_SAFile,
              checkboxHsa,
            ],
            ["Contribution other then via employer", "Distribution", "1099-SA"],
          ),
        )}
        <Divider />
        {questionContainer(
          child_AdoptionExpenses,
          t("organizer.individual.general_steps.step6.question6"),
          <div>
            <Form.Item
              name={checkboxChild}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                  message: t("validations.required"),
                },
              ]}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              name={child_AdoptionExpenses}
              label={t("organizer.individual.general_steps.step6.amount")}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                },
                ({ getFieldValue }) => ({
                  validator(item, value) {
                    if (
                      getFieldValue(checkboxChild) === true &&
                      _.isEmpty(value)
                    ) {
                      return Promise.reject(
                        new Error(t("validations.required")),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={child_SpecialNeedsChild}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                },
                ({ getFieldValue }) => ({
                  validator(item, value) {
                    if (
                      getFieldValue(checkboxChild) === true &&
                      _.isEmpty(value)
                    ) {
                      return Promise.reject(
                        new Error(t("validations.required")),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              name={child_EducatorExpenses}
              label={t("organizer.individual.general_steps.step6.amount")}
              valuePropName="checked"
              rules={[
                {
                  required: false,
                },
                ({ getFieldValue }) => ({
                  validator(item, value) {
                    if (
                      getFieldValue(checkboxChild) === true &&
                      _.isEmpty(value)
                    ) {
                      return Promise.reject(
                        new Error(t("validations.required")),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </div>,
        )}
      </div>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div className={styles.container}>
        {formInfo(formInfoTaxPayerKeysStep6, taxpayerCheckbox, true)}
        <div>
          <Button
            type="link"
            text={
              spouse
                ? t("organizer.individual.general_steps.step6.remove_spouse")
                : t("organizer.individual.general_steps.step6.add_spouse")
            }
            onClick={() => {
              setSpouse(!spouse);
            }}
          />
          {spouse && formInfo(formInfoSpouseKeysStep6, spouseCheckbox, false)}
        </div>
      </div>
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default GeneralStepsStep6;
