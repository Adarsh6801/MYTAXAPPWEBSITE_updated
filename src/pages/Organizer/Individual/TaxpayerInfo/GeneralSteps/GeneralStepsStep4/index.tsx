import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Checkbox, Divider } from "antd";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import { findIndexData } from "../../../../../../helpers/format";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { IFinishValue } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep4 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerEIPReceived",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerIRSLetterReceived",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerCoverdellEducationAccount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerSec529TuitionPlan",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerHSA",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "taxPayerChild",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseEIPReceived",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseIRSLetterReceived",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseCoverdellEducationAccount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseSec529TuitionPlan",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseHSA",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseChild",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
  ]);

  const onFinish = (value: IFinishValue) => {
    Object.entries(value).forEach((item, index) => {
      const [key, value] = item;
      data[index].value = value;
    });

    onStepSubmit(value);
    nextStep();
  };

  const initialValues = {
    taxPayerEIPReceived: false,
    taxPayerIRSLetterReceived: false,
    taxPayerCoverdellEducationAccount: false,
    taxPayerSec529TuitionPlan: false,
    taxPayerHSA: false,
    taxPayerChild: false,
    spouseEIPReceived: false,
    spouseIRSLetterReceived: false,
    spouseCoverdellEducationAccount: false,
    spouseSec529TuitionPlan: false,
    spouseHSA: false,
    spouseChild: false,
  };

  const radioContainer = (
    question: string,
    taxpayerKey: any,
    spouseKey: any,
    divider: boolean,
  ) => {
    const indexT: number = +findIndexData(taxpayerKey, data);
    const indexS: number = +findIndexData(spouseKey, data);

    return (
      <>
        <OrganizerQuestionCard
          question={question}
          data={data[indexT]}
          onAlert={() => {
            const newData = [...data];
            newData[indexT] = {
              ...data[indexT],
              reminder: !data[indexT].reminder,
            };
            newData[indexS] = {
              ...data[indexS],
              reminder: !data[indexS].reminder,
            };
            setData(newData);
          }}
          onMessage={(comment: string) => {
            const newData = [...data];
            newData[indexT] = { ...data[indexT], comment: comment };
            newData[indexS] = { ...data[indexS], comment: comment };
            setData(newData);
          }}
          childrenClassName={styles.context}
          questionClassName={styles.questionCardContainer}
          subClass={styles.subClass}
        >
          <Form.Item
            name={taxpayerKey}
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
            name={spouseKey}
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
        </OrganizerQuestionCard>
        {divider && <Divider />}
      </>
    );
  };

  return (
    <div>
      <div className={styles.subTitle}>
        <div className={styles.emptyDiv}></div>
        <div className={styles.textContainer}>
          <p>{t("organizer.individual.general_steps.step4.taxpayer")}</p>
          <p>{t("organizer.individual.general_steps.step4.spouse")}</p>
        </div>
      </div>

      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        requiredMark={false}
        layout="vertical"
      >
        {radioContainer(
          t("organizer.individual.general_steps.step4.question1"),
          "taxPayerEIPReceived",
          "spouseEIPReceived",
          true,
        )}
        {radioContainer(
          t("organizer.individual.general_steps.step4.question2"),
          "taxPayerIRSLetterReceived",
          "spouseIRSLetterReceived",
          true,
        )}
        {radioContainer(
          t("organizer.individual.general_steps.step4.question3"),
          "taxPayerCoverdellEducationAccount",
          "spouseCoverdellEducationAccount",
          true,
        )}
        {radioContainer(
          t("organizer.individual.general_steps.step4.question4"),
          "taxPayerSec529TuitionPlan_1099_QFile",
          "spouseSec529TuitionPlan",
          true,
        )}
        {radioContainer(
          t("organizer.individual.general_steps.step4.question5"),
          "taxPayerHSA",
          "spouseHSA",
          true,
        )}
        {radioContainer(
          t("organizer.individual.general_steps.step4.question6"),
          "taxPayerChild",
          "spouseChild",
          false,
        )}

        <CircularDirection
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default GeneralStepsStep4;
