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
import { disabledDateFuture, disabledDatePast } from "../../../../../helpers/date";
import { data as initialData, DATA_KEY, radioButtons, dataRelation, personalProperyTypeOptions,rentalPropertyData,personalPropertData } from "./index.constants";
import { ORGANIZER_CATEGORY_ID, QUESTION_TYPE_ANSWER } from "../../../../../constants/organizer";
import { IRS_LINK } from "../../../../../constants/settings";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IQuestionContainer } from "./index.props";
import { dataPicker, input, radio, select } from "../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import { ReactComponent as Calendar } from "../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";
import moment from "moment";

const noop = () => {};

const Step3 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
  const [taxPayerCount, setTaxPayerCount] = useState(1);
  const [personalPropertyCount, setpersonalPropertyCount] = useState(1);

  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
  );

  const [rentalProperties, setRentalProperties] = useState(
    rentalPropertyData
  );

  const [personalProperties, setPersonalProperties] = useState(
    personalPropertData
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
          !!DATA_KEY.find(item => el.question.includes(item)) &&
          dataOrganizer.filter(
            (item: any, index: number) => index < i && item.question === el.question,
          )?.length < 2
        );
      });
  
      console.log(stepData, 'stepDatastepDatastepDatastepDatastepData');
  
      let realestateIndex = findIndexData('taxesPaid_realestateProperty', data);
      let personalpropertyIndex = findIndexData('taxesPaid_personalProperty', data);
  
      const realestateStepData = stepData[realestateIndex]?.answer;
      const personalPropertyStepData = stepData[personalpropertyIndex]?.answer;
  
      // Ensure valid JSON before parsing
      const isValidJson = (str: any) => {
        try {
          return JSON.parse(str);
        } catch (e) {
          console.error("Invalid JSON:", str);
          return null;
        }
      };
  
      const parsedRealEstate = isValidJson(realestateStepData);
      const parsedPersonalProperty = isValidJson(personalPropertyStepData);
  
      if (parsedRealEstate) {
        let newdata1 = isValidJson(parsedRealEstate.data);
        if (newdata1) {
          console.log(newdata1, 'newdata1');
          setRentalProperties(newdata1);
          if (newdata1.length > 0) {
            newdata1.forEach((item: any) => {
              form.setFieldsValue({
                [item.question]: item.question.includes("Date") ? moment(item?.answer) : item?.answer || null
              });
            });
            setTaxPayerCount(newdata1.length / 3);
          }
        }
      }
  
      if (parsedPersonalProperty) {
        let newdata2 = isValidJson(parsedPersonalProperty.data);
        if (newdata2) {
          console.log(newdata2, 'newdata2');
          setPersonalProperties(newdata2);
          if (newdata2.length > 0) {
            newdata2.forEach((item: any) => {
              form.setFieldsValue({
                [item.question]: item.question.includes("Date") ?item?.answer!=null? moment(item?.answer):null : item?.answer || null
              });
            });
            setpersonalPropertyCount(newdata2.length / 3);
          }
        }
      }
  
      const currentType = stepData.map((el: any) => getCurrentType(el));
  
      const resultData: any[] =
        stepData.length > 0
          ? addQuoteIdOrganizer(currentType, Number(quoteId))
          : [];
  
      resultData.forEach((item: any) => {
        if (item.isFile) {
          form.setFieldsValue({ [item.question]: item.files });
        } else {
          form.setFieldsValue({ [item.question]: item.answer?item.answer:null });
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
      if (!data || !Array.isArray(data)) {
        console.error("Error: data is undefined or not an array");
        return;
      }

      const newData = [...data];
        newData[findIndexData('taxesPaid_realestateProperty',data)].answer = JSON.stringify({
          data: JSON.stringify(rentalProperties)
        });
        newData[findIndexData('taxesPaid_personalProperty',data)].answer = JSON.stringify({
          data: JSON.stringify(personalProperties)
        });
  
      // Submit the updated data
      onStepSubmit(newData);
      await dispatch(setIndividualOrganizer(newData));
      nextStep();
    } catch (e) {
      console.error("Error submitting data:", e);
    }
  };
  
  
  
  

  // const onValuesChange = (value: any) => {
  //   const [name] = Object.keys(value);

    
  //   if (name.startsWith("taxesPaid_VehicleLicenseFees_")) {
  //     const index: number = findIndexData(name, rentalProperties);
  //     console.log(index,'index');
      
  //     const newData = [...rentalProperties];
  //     newData[index] = {
  //       ...rentalProperties[index],
  //       question: rentalProperties[index].question,
  //       answer: value[name],
  //     };
  //     setRentalProperties(newData)
  //     console.log(rentalProperties,'rentalProperties');
  //   }
    
  //   else if (name.startsWith("taxesPaid_PersonalProperty_")) {
  //     const index: number = findIndexData(name, personalProperties);
  //     const newData = [...personalProperties];
  //     newData[index] = {
  //       ...personalProperties[index],
  //       question: personalProperties[index].question,
  //       answer: value[name],
  //     };
  //     setPersonalProperties(newData)

  //   }else{
  //     const index: number = findIndexData(name, data);
  //     const newData = [...data];
  //     console.log(index,'indexindexindex');
  
  //     console.log(newData,'newDatanewDatanewData');
      
  //     newData[index] = {
  //       ...data[index],
  //       question: data[index].question,
  //       answer: value[name],
  //       files: newData[index].isFile ? value[name] : null,
  //     };
  //     setData([...newData]);
  //   }
  //   console.log(data,'dataaaaaa');
    
  //   console.log(rentalProperties,'rentalProperties');
  //   console.log(personalProperties,'personalProperties');
    
  // };


  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const newValue = value[name];
  
    if (name.startsWith("taxesPaid_VehicleLicenseFees_")) {
      const index = findIndexData(name, rentalProperties);
      if (index !== -1) {
        setRentalProperties(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], answer: newValue };
          return updated;
        });
      }
    } else if (name.startsWith("taxesPaid_PersonalProperty_")) {
      const index = findIndexData(name, personalProperties);
      if (index !== -1) {
        setPersonalProperties(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], answer: newValue };
          return updated;
        });
      }
    } else {
      const index = findIndexData(name, data);
      if (index !== -1) {
        setData(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            answer: newValue,
            files: updated[index].isFile ? newValue : null,
          };
          return updated;
        });
      }
    }
  };
  

  const addFields = () => {
    // {
    //   question: "taxesPaid_VehicleLicenseFees_Type1",
    //   answerTypeId: QUESTION_TYPE_ANSWER.string,
    //   answer: null,
    // },
    // {
    //   question: "taxesPaid_VehicleLicenseFees_Amount1",
    //   answerTypeId: QUESTION_TYPE_ANSWER.string,
    //   answer: null,
    // },
    // {
    //   question: "taxesPaid_VehicleLicenseFees_Date1",
    //   answerTypeId: QUESTION_TYPE_ANSWER.date,
    //   answer: null,
    // },
    const newData: any = [...rentalProperties];
    newData.push(
      ...[
        {
          question: `taxesPaid_VehicleLicenseFees_Type${taxPayerCount + 1}`,
          answer: null,
        },
        {
          question: `taxesPaid_VehicleLicenseFees_Amount${taxPayerCount + 1}`,
          answer: null,
        },
        {
          question: `taxesPaid_VehicleLicenseFees_Date${taxPayerCount + 1}`,
          answer: null,
        },
      ],
    );
    console.log(newData,'newDatanewDatanewData');
    
    setRentalProperties(newData);
    setTaxPayerCount(taxPayerCount + 1);
  };

  const removeFields = () => {
    const newData = rentalProperties.filter(
      (item, index) =>
        !(+item.question.charAt(item.question.length - 1) === taxPayerCount),
    );
    setRentalProperties(newData);
    setTaxPayerCount(taxPayerCount - 1);
  };

  const addPersonalPropertyFields = () => {
    const newData: any = [...personalProperties];
    newData.push(
      ...[
        {
          question: `taxesPaid_PersonalProperty_Type${personalPropertyCount + 1}`,
          answer: null,
        },
        {
          question: `taxesPaid_PersonalProperty_Amount${personalPropertyCount + 1}`,
          answer: null,
        },
        {
          question: `taxesPaid_PersonalProperty_Date${personalPropertyCount + 1}`,
          answer: null,
        },
      ],
    );
    setPersonalProperties(newData);
    setpersonalPropertyCount(personalPropertyCount + 1);
  };

  const removePersonalPropertyFields = () => {
    const newData = personalProperties.filter(
      (item, index) =>
        !(+item.question.charAt(item.question.length - 1) === personalPropertyCount),
    );
    setPersonalProperties(newData);
    setpersonalPropertyCount(personalPropertyCount - 1);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children, required } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question}
        required={required}
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
        <div className={styles.marginBottom}>
          {questionContainer({
            key: "doYou_pay_property_tax_directly",
            question: t("organizer.deductions.step3.question7"),
            required:true,
            children: radio({
              name: "doYou_pay_property_tax_directly",
              radioButtons: radioButtons,
              required: true,
            }),
          })}
        </div>

        <Divider />
        {data[findIndexData('doYou_pay_property_tax_directly',data)].answer && _.times(taxPayerCount, (index: number) => {
          return (
            <div key={index}>

              {questionContainer({
                key: `taxesPaid_VehicleLicenseFees_Amount${index + 1}`,
                question: t("organizer.deductions.step3.question1"),
                children: (
                  <>
                  <div className={styles.pickerContainer}>
                                          { select({
                          name: `taxesPaid_VehicleLicenseFees_Type${index + 1}`,
                          label: t("organizer.deductions.step3.label4"),
                          data: dataRelation,
                          placeholder:"Select Type",
                          // required: true,
                          message: "Select Real Estate Type",
                       
                      })}
                    {input({
                      name: `taxesPaid_VehicleLicenseFees_Amount${index + 1}`,
                      label: t("organizer.deductions.step3.label1"),
                      placeholder:"4,900",
                      pattern:{
                        value:/^\d{1,7}$/,
                        message:"Amount must be numeric and maximum 7 digits."
                      },
                      // required: true,
                    })}
                    {dataPicker({
                      name: `taxesPaid_VehicleLicenseFees_Date${index + 1}`,
                      label: t("organizer.deductions.step3.label2"),
                      icon: <Calendar />,
                      disabledDate: disabledDateFuture,
                      // required:true,
                      defaultValue:
                      rentalPropertyData[
                          findIndexData(
                            `taxesPaid_VehicleLicenseFees_Date${index + 1}`,
                            rentalPropertyData,
                          )
                        ]?.answer,
                    })}
                  </div>
                    <div className={styles.addRemoveContainer}>
                      {taxPayerCount === index + 1 && (
                        <Button
                          text={t("organizer.deductions.step3.add_realEstate")}
                          type="link"
                          className={styles.addAndRemoveBtn}
                          onClick={() => addFields()}
                        />
                      )}
                      {taxPayerCount === index + 1 && taxPayerCount > 1 && (
                        <Button
                          text={t("organizer.deductions.step3.remove_realEstate")}
                          type="link"
                          className={styles.addAndRemoveBtn}
                          onClick={() => {
                            removeFields();
                          }}
                        />
                      )}
                    </div>
                  </>
                ),
              })}
            </div>
          );
        })}
        <Divider />
        {data[findIndexData('doYou_pay_property_tax_directly',data)].answer && _.times(personalPropertyCount, (index: number) => {
          return (
            <div key={index}>

              {questionContainer({
                key: `taxesPaid_PersonalProperty_Amount${index + 1}`,
                question: t("organizer.deductions.step3.question2"),
                children: (
                  <>
                  <div className={styles.pickerContainer}>
                                          { select({
                          name: `taxesPaid_PersonalProperty_Type${index + 1}`,
                          label: t("organizer.deductions.step3.label5"),
                          data: personalProperyTypeOptions,
                          // required: true,
                          placeholder:"Select Personal Property",
                          message: "Select Personal Property Type",
                      })}
                    {input({
                      name: `taxesPaid_PersonalProperty_Amount${index + 1}`,
                      label: t("organizer.deductions.step3.label1"),
                      placeholder:"4,900",
                      pattern:{
                        value:/^\d{1,7}$/,
                        message:"Amount must be numeric and maximum 7 digits."
                      },
                      // required: true,
                    })}
                    {dataPicker({
                      name: `taxesPaid_PersonalProperty_Date${index + 1}`,
                      label: t("organizer.deductions.step3.label2"),
                      icon: <Calendar />,
                      disabledDate: disabledDateFuture,
                      // required: true,
                      defaultValue:
                      personalPropertData[
                          findIndexData(
                            `taxesPaid_PersonalProperty_Date${index + 1}`,
                            personalPropertData,
                          )
                        ]?.answer,
                    })}
                  </div>
                    <div className={styles.addRemoveContainer}>
                      {personalPropertyCount === index + 1 && (
                        <Button
                          text={t("organizer.deductions.step3.add_personalProperty")}
                          type="link"
                          className={styles.addAndRemoveBtn}
                          onClick={() => addPersonalPropertyFields()}
                        />
                      )}
                      {personalPropertyCount === index + 1 && personalPropertyCount > 1 && (
                        <Button
                          text={t("organizer.deductions.step3.remove_personalProperty")}
                          type="link"
                          className={styles.addAndRemoveBtn}
                          onClick={() => {
                            removePersonalPropertyFields();
                          }}
                        />
                      )}
                    </div>
                  </>
                ),
              })}
            </div>
          );
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
