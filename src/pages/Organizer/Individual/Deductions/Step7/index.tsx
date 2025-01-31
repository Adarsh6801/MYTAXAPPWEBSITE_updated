import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../helpers/format";
import {
  data as initialData,
  DATA_AMOUNT_PAID,
  DATA_KEY,
} from "./index.constants";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IQuestionContainer } from "./index.props";
import { input, select } from "../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step7 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
  );

  const dataOrgnaizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrgnaizer) {
      const stepData = dataOrgnaizer.filter((el: any, i: number) => {
        return (
          !!DATA_KEY.find(item => {
            return el.question.includes(item);
          }) &&
          dataOrgnaizer.filter(
            (item: any, index: number) =>
              index < i && item.question === el.question,
          )?.length < 2
        );
      });
      const currentType = stepData.map((el: any) => {
        return getCurrentType(el);
      });

      const resultData: any[] =
        stepData.length > 0
          ? addQuoteIdOrganizer(currentType, Number(quoteId))
          : [];

      resultData.forEach((item: any) => {
        if (item.isFile) {
          form.setFieldsValue({
            [item.question]: item.files,
          });
        } else {
          item.question.includes("studentStatus")
            ? form.setFieldsValue({
                [item.question]: DATA_AMOUNT_PAID[+item.answer],
              })
            : form.setFieldsValue({
                [item.question]: item.answer,
              });
        }
      });
      resultData.length >= DATA_KEY.length && setData(resultData);
    }
  }, [dataOrgnaizer]);

  const onFinish = async () => {
    try {
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      nextStep();
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);
    const newData = [...data];

    newData[index] = {
      ...data[index],
      question: data[index].question,
      answer: value[name],
      files: newData[index].isFile ? value[name] : null,
    };

    setData([...newData]);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question}
        data={data[index]}
        onAlert={() => {
          const newData = [...data];
          newData[index] = { ...data[index], reminder: !data[index].reminder };
          setData(newData);
        }}
        onMessage={(comment: string) => {
          const newData = [...data];
          newData[index] = { ...data[index], message: comment };
          setData(newData);
        }}
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      onValuesChange={onValuesChange}
      requiredMark={false}
      layout="vertical"
    >
      <p>
        <Trans
          i18nKey="organizer.deductions.step7.description1"
          values={{ note: "Note –" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <p>{t("organizer.deductions.step7.description2")}</p>
      <div className={styles.dropDownContainer}>
        {select({
          name: "taxPayer_MedicalExpenses",
          label: t("organizer.deductions.step7.label4"),
          data: DATA_AMOUNT_PAID,
        })}
        {select({
          name: "spouse_MedicalExpenses",
          label: t("organizer.deductions.step7.label5"),
          data: DATA_AMOUNT_PAID,
        })}
      </div>
      {questionContainer({
        key: "taxPayer_MedicalExpenses_InsurancePremiums",
        question: t("organizer.deductions.step7.question1"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_InsurancePremiums",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_InsurancePremiums",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      {questionContainer({
        key: "taxPayer_MedicalExpenses_InsurancePremiumsNotPayrollTax",
        question: t("organizer.deductions.step7.question2"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_InsurancePremiumsNotPayrollTax",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_InsurancePremiumsNotPayrollTax",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      {questionContainer({
        key: "taxPayer_MedicalExpenses_LongTermCareInsurance",
        question: t("organizer.deductions.step7.question3"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_LongTermCareInsurance",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_LongTermCareInsurance",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      {questionContainer({
        key: "taxPayer_MedicalExpenses_AnyXpecialNeedsServices",
        question: t("organizer.deductions.step7.question4"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_AnyXpecialNeedsServices",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_AnyXpecialNeedsServices",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      {questionContainer({
        key: "taxPayer_MedicalExpenses_PrescriptionDrugsAndMedicalSupplies",
        question: t("organizer.deductions.step7.question6"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_PrescriptionDrugsAndMedicalSupplies",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_PrescriptionDrugsAndMedicalSupplies",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      {questionContainer({
        key: "taxPayer_MedicalExpenses_TransportationServices",
        question: t("organizer.deductions.step7.question6"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_TransportationServices",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_TransportationServices",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      {questionContainer({
        key: "taxPayer_MedicalExpenses_Rentals",
        question: t("organizer.deductions.step7.question6"),
        children: (
          <div className={styles.pickerContainer}>
            {input({
              name: "taxPayer_MedicalExpenses_Rentals",
              label: t("organizer.deductions.step7.label2"),
            })}
            {input({
              name: "spouse_MedicalExpenses_Rentals",
              label: t("organizer.deductions.step7.label3"),
            })}
          </div>
        ),
      })}

      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default Step7;
