import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form, Divider } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import Button from "../../../../../components/Button";
import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../helpers/format";
import { disabledDatePast } from "../../../../../helpers/date";
import { data as initialData, DATA_KEY } from "./index.constants";
import { ORGANIZER_CATEGORY_ID } from "../../../../../constants/organizer";
import { IRS_LINK } from "../../../../../constants/settings";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IQuestionContainer } from "./index.props";
import { dataPicker, input } from "../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import { ReactComponent as Calendar } from "../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const Step3 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const [taxPayerCount, setTaxPayerCount] = useState(1);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
  );

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrganizer) {
      const stepData = dataOrganizer.filter((el: any, i: number) => {
        return (
          !!DATA_KEY.find(item => {
            return el.question.includes(item);
          }) &&
          dataOrganizer.filter(
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
          form.setFieldsValue({
            [item.question]: item.answer,
          });
        }
      });

      resultData.length >= DATA_KEY.length && setData(resultData);
    }
  }, [dataOrganizer]);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const onFinish = async () => {
    try {
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      nextStep();
    } catch (e) {
      // TODO: handle catch error
    }
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

  const addFields = () => {
    const newData: any = [...data];
    newData.push(
      ...[
        {
          categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
          forSpouse: false,
          question: `taxesPaid_VehicleLicenseFees_Amount${taxPayerCount + 1}`,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          file: null,
        },
        {
          categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
          forSpouse: false,
          question: `taxesPaid_VehicleLicenseFees_Date${taxPayerCount + 1}`,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          file: null,
        },
      ],
    );
    setData(addQuoteIdOrganizer(newData, Number(quoteId)));
    setTaxPayerCount(taxPayerCount + 1);
  };

  const removeFields = () => {
    const newData = data.filter(
      (item, index) =>
        !(+item.question.charAt(item.question.length - 1) === taxPayerCount),
    );
    setData(newData);
    setTaxPayerCount(taxPayerCount - 1);
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
          i18nKey="organizer.deductions.step3.description1"
          values={{ note: "Note –" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <p>
        <Trans
          i18nKey="organizer.deductions.step3.description2"
          values={{ note: "Caution – " }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <p>
        <Trans
          i18nKey="organizer.deductions.step3.description3"
          values={{ note: "Caution – " }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <Button
        text={t("organizer.individual.general_steps.step2.irs")}
        type={"ghost"}
        className={styles.btn}
        href={IRS_LINK}
        target={"_blank"}
      />
      <div>
        <span>{t("organizer.deductions.step3.label3")}</span>
      </div>
      <div>
        {questionContainer({
          key: "taxesPaid_RealEstatePrimaryResidence_Amount",
          question: t("organizer.deductions.step3.question1"),
          children: (
            <div className={styles.pickerContainer}>
              {input({
                name: "taxesPaid_RealEstatePrimaryResidence_Amount",
                label: t("organizer.deductions.step3.label1"),
              })}
              {dataPicker({
                name: "taxesPaid_RealEstatePrimaryResidence_Date",
                label: t("organizer.deductions.step3.label2"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue:
                  data[
                    findIndexData(
                      "taxesPaid_RealEstatePrimaryResidence_Date",
                      data,
                    )
                  ].answer,
              })}
            </div>
          ),
        })}
        <Divider />
        {questionContainer({
          key: "taxesPaid_RealEstate2ndHome_Amount",
          question: t("organizer.deductions.step3.question2"),
          children: (
            <div className={styles.pickerContainer}>
              {input({
                name: "taxesPaid_RealEstate2ndHome_Amount",
                label: t("organizer.deductions.step3.label1"),
              })}
              {dataPicker({
                name: "taxesPaid_RealEstate2ndHome_Date",
                label: t("organizer.deductions.step3.label2"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue:
                  data[findIndexData("taxesPaid_RealEstate2ndHome_Date", data)]
                    .answer,
              })}
            </div>
          ),
        })}
        <Divider />
        {questionContainer({
          key: "taxesPaid_RealEstateInvestmentProperty_Amount",
          question: t("organizer.deductions.step3.question3"),
          children: (
            <div className={styles.pickerContainer}>
              {input({
                name: "taxesPaid_RealEstateInvestmentProperty_Amount",
                label: t("organizer.deductions.step3.label1"),
              })}
              {dataPicker({
                name: "taxesPaid_RealEstateInvestmentProperty_Date",
                label: t("organizer.deductions.step3.label2"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue:
                  data[
                    findIndexData(
                      "taxesPaid_RealEstateInvestmentProperty_Date",
                      data,
                    )
                  ].answer,
              })}
            </div>
          ),
        })}

        <Divider />
        {_.times(taxPayerCount, (index: number) => {
          return (
            <div key={index}>
              {questionContainer({
                key: `taxesPaid_VehicleLicenseFees_Amount${index + 1}`,
                question: t("organizer.deductions.step3.question1"),
                children: (
                  <div className={styles.pickerContainer}>
                    {input({
                      name: `taxesPaid_VehicleLicenseFees_Amount${index + 1}`,
                      label: t("organizer.deductions.step3.label1"),
                    })}
                    {dataPicker({
                      name: `taxesPaid_VehicleLicenseFees_Date${index + 1}`,
                      label: t("organizer.deductions.step3.label2"),
                      icon: <Calendar />,
                      disabledDate: disabledDatePast,
                      defaultValue:
                        data[
                          findIndexData(
                            `taxesPaid_VehicleLicenseFees_Date${index + 1}`,
                            data,
                          )
                        ].answer,
                    })}
                    <div className={styles.addRemoveContainer}>
                      {taxPayerCount === index + 1 && (
                        <Button
                          text={t("organizer.deductions.step3.add_vehicle")}
                          type="link"
                          className={styles.addAndRemoveBtn}
                          onClick={() => addFields()}
                        />
                      )}
                      {taxPayerCount === index + 1 && taxPayerCount > 1 && (
                        <Button
                          text={t("organizer.deductions.step3.remove_vehicle")}
                          type="link"
                          className={styles.addAndRemoveBtn}
                          onClick={() => {
                            removeFields();
                          }}
                        />
                      )}
                    </div>
                  </div>
                ),
              })}
            </div>
          );
        })}
        <Divider />
        {questionContainer({
          key: "taxesPaid_PersonalPropertyTax_Amount",
          question: t("organizer.deductions.step3.question4"),
          children: (
            <div className={styles.pickerContainer}>
              {input({
                name: "taxesPaid_PersonalPropertyTax_Amount",
                label: t("organizer.deductions.step3.label1"),
              })}
              {dataPicker({
                name: "taxesPaid_PersonalPropertyTax_Date",
                label: t("organizer.deductions.step3.label2"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue:
                  data[
                    findIndexData("taxesPaid_PersonalPropertyTax_Date", data)
                  ].answer,
              })}
            </div>
          ),
        })}
        <Divider />
        {questionContainer({
          key: "taxesPaid_SalesTaxReceipted_Amount",
          question: t("organizer.deductions.step3.question5"),
          children: (
            <div className={styles.pickerContainer}>
              {input({
                name: "taxesPaid_SalesTaxReceipted_Amount",
                label: t("organizer.deductions.step3.label1"),
              })}
              {dataPicker({
                name: "taxesPaid_SalesTaxReceipted_Date",
                label: t("organizer.deductions.step3.label2"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue:
                  data[findIndexData("taxesPaid_SalesTaxReceipted_Date", data)]
                    .answer,
              })}
            </div>
          ),
        })}
        <Divider />
        {questionContainer({
          key: "taxesPaid_SalesTaxCarsBoatsHome_Amount",
          question: t("organizer.deductions.step3.question6"),
          children: (
            <div className={styles.pickerContainer}>
              {input({
                name: "taxesPaid_SalesTaxCarsBoatsHome_Amount",
                label: t("organizer.deductions.step3.label1"),
              })}
              {dataPicker({
                name: "taxesPaid_SalesTaxCarsBoatsHome_Date",
                label: t("organizer.deductions.step3.label2"),
                icon: <Calendar />,
                disabledDate: disabledDatePast,
                defaultValue:
                  data[
                    findIndexData("taxesPaid_SalesTaxCarsBoatsHome_Date", data)
                  ].answer,
              })}
            </div>
          ),
        })}
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

export default Step3;
