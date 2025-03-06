import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Checkbox } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import Button from "../../../../../components/Button";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import {
  namesSpouseFields,
  namesTaxPayerFields,
} from "../../../../../constants/organizer";
import { ORGANIZER_CATEGORY_ID } from "../../../../../constants/organizer";
import { taxPayer, spouse as spouseData, DATA_KEY } from "./index.constants";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getClassNames,
  getCurrentType,
  getDynamicDataCount,
} from "../../../../../helpers/format";
import { input, InputMask, radio, upload } from "../../../../../components/Module";
import { QUESTION_TYPE_ANSWER } from "../../../../../constants/organizer";
import { IQuestionContainer } from "./index.props";

import styles from "./index.module.css";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { radioButtons } from "../Step4/index.constants";

const noop = () => {};

const Step3 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, goTo = noop, prevStep = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();

  const [spouse, setSpouse] = useState(false);
  const [countTaxPayer, setCountTaxPayer] = useState(1);
  const [countSpouse, setCountSpouse] = useState(1);
  const [data, setData] = useState<IOrganizerStepProps[]>([
    ...addQuoteIdOrganizer(taxPayer, Number(quoteId)),
    ...addQuoteIdOrganizer(spouseData, Number(quoteId)),
  ]);

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  const onFinish = async (value: any) => {
    onStepSubmit(value);

    await dispatch(setIndividualOrganizer(data));
    goTo(19);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrganizer) {
      console.log(data,'datafirst');

      const stepData = dataOrganizer.filter((el: any) => {
        return !!DATA_KEY.find(item => {
          return el.question.includes(item);
        });
      });

      const currentType = stepData.map((el: any) => {
        return getCurrentType(el);
      });      
      const resultData: any[] =
        stepData.length > 0
          ? addQuoteIdOrganizer(currentType, Number(quoteId))
          : [];

      if (resultData.length >= DATA_KEY.length || resultData.length <= DATA_KEY.length) {
        resultData.forEach((item: any) => {          
          if (item.isFile) {
            form.setFieldsValue({
              [item.question]: item.files,
            });
          } else {
            form.setFieldsValue({
              [item.question]: item.answer!="null"?item.answer:null,
            });
          }
        });
        console.log(data,'data');

        console.log(resultData,'resultDataaaaaaaaaaaaaaaa' , form.getFieldsValue());
        
        if(resultData.length > 0 ){
          setData(resultData);
          setCountTaxPayer(
            getDynamicDataCount("taxPayerBusinessName", resultData),
          );
          setCountSpouse(getDynamicDataCount("spouseBusinessName", resultData));
        }

        console.log(data,'datalast');

      }
    }
  }, [dataOrganizer]);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const onValuesChange = (value: any) => {
    console.log(value,'value');
    
    const [name] = Object.keys(value);
    console.log(name,'name');
console.log(data,'datadata');

    const index: number = findIndexData(name, data);
    const newData = [...data];
    console.log(newData,'newDatanewData');
    console.log(index,'indexindexindex');
    
    newData[index] = {
      ...data[index],
      question: data[index]?.question,
      answer: value[name],
      isFile: data[index]?.isFile,
      files: data[index]?.isFile ? value[name].fileList : null,
    };

    setData([...newData]);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children, required } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question}
        data={data[index]}
        required={required}
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

  const formInfo = (names: any, count: number) => {
    return (
      <div>
        <p>
          {t("organizer.individual.income.step3.title")}
          {count}
        </p>
  
        {Object.keys(names).map((key, index) => {
          let required = false;
          let pattern = null;
          let message = "";
          let placeholder = "";
          let inputComponent = null;
  
          if (["businessName", "productOrService", "employerIDNumber", "grossIncome"].includes(key)) {
            required = true;
          }
  
          switch (key) {
            case "businessName":
              pattern = /^[a-zA-Z0-9\s-]+$/;
              message = "Only alphabets and numbers allowed";
              placeholder = "Enter your business name";
              break;
            case "productOrService":
              pattern = /^[A-Za-z\s]+$/;
              message = "Only Alphabets Are Allowed";
              placeholder = "Enter your product or service";
              break;
            case "employerIDNumber":
              pattern = /^(\d{2}-\d{7}(?: \d{0,4})?)?$/;
              message = "9 digits only allowed";
              placeholder = "XX-XXXXXXX";
              inputComponent = 
                <InputMask
                  name={names[key]}
                  label={t(`organizer.individual.income.step3.question${index + 1}`)}
                  placeholder={placeholder}
                  required={required}
                  pattern={{ value: pattern, message: message }}
                  maskFormat="00-0000000"
                />
              
              break;
            case "grossIncome":
              pattern = /^[0-9\s-]{1,9}$/;
              message = "Enter a valid income amount (e.g., 5000)";
              placeholder = "15,0000";
              break;
            default:
              placeholder = "18,0000";
              pattern = /^\d{0,9}$/;
              message = "Please enter a number (maximum 9 digits)";
          }
  
          return (
            <div key={index}>
              {questionContainer({
                key: names[key],
                children:
                  key === "employerIDNumber"
                    ? inputComponent
                    : input({
                        name: names[key],
                        label: t(`organizer.individual.income.step3.question${index + 1}`),
                        formStyles: styles.marginBottom,
                        required: required,
                        pattern: pattern ? { value: pattern, message: message } : undefined,
                        placeholder: placeholder,
                      }),
              })}
            </div>
          );
        })}
      </div>
    );
  };
  

  const add = (names: any) => {
    const newQuestions = Object.values(names).map(el => {
      return {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses,
        forSpouse: false,
        question: `${el}${countTaxPayer + 1}`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      };
    });

    const newData = [...data];
    newData.push(...newQuestions);
    setData(newData);
    setCountTaxPayer(countTaxPayer + 1);
  };

  const remove = (name: string, count: number) => {
    if (name.includes("taxPayer")) {
      const newData = data.filter(
        (item, index) =>
          !item.question.includes("taxPayer") &&
          !item.question.includes(`${countTaxPayer}`),
      );
      const lastData = data.filter((item, index) =>
        item.question.includes("spouse"),
      );
      setData([...newData, ...lastData]);
      setCountTaxPayer(count - 1);
      return;
    }

    const newData = data.filter(
      (item, index) =>
        !item.question.includes("spouse") &&
        !item.question.includes(`${countTaxPayer}`),
    );
    const lastData = data.filter((item, index) =>
      item.question.includes("taxPayer"),
    );
    setData([...newData, ...lastData]);
    setCountSpouse(count - 1);
  };

  const addSpouse = (names: any) => {
    const newQuestions = Object.values(names).map(el => {
      return {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses,
        forSpouse: true,
        question: `${el}${countSpouse + 1}`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      };
    });

    const newData = [...data];
    newData.push(...newQuestions);
    setData(newData);
    setCountSpouse(countSpouse + 1);
  };

  return (
    <Form
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div className={styles.container}>
        <div className={getClassNames(styles.subContainer, styles.marginTop)}>
          <p>{t("organizer.individual.income.step3.taxpayer")}</p>
          {_.times(countTaxPayer, (index: number) => {
            const namesTaxPayer = {
              businessName: `taxPayerBusinessName${index + 1}`,
              employerIDNumber: `taxPayerBusiness_EmployerIDNumber${index + 1}`,
              productOrService: `taxPayerBusiness_productOrService${index + 1}`,
              selfEmployedHealthInsuranceCost: `taxPayerBusiness_SelfEmployedHealthInsuranceCost${
                index + 1
              }`,
              grossIncome: `taxPayerBusiness_GrossIncome${index + 1}`,
              returnsAllowances: `taxPayerBusiness_ReturnsAndAllowances${
                index + 1
              }`,
              beginningInventory: `taxPayerBusiness_BeginningInventory${
                index + 1
              }`,
              additionsInventory: `taxPayerBusiness_AdditionsToInventory${
                index + 1
              }`,
              endingInventory: `taxPayerBusiness_EndingInventory${index + 1}`,
              advertising: `taxPayerBusinessExpense_Advertising${index + 1}`,
              commissionsAndFees: `taxPayerBusinessExpense_CommissionsandFees${
                index + 1
              }`,
              contractLabor: `taxPayerBusinessExpense_ContractLabor${
                index + 1
              }`,
              duesPublications: `taxPayerBusinessExpense_DuesAndPublications${
                index + 1
              }`,
              businessMeals: `taxPayerBusinessExpense_Meals${index + 1}`,
              employeeBenefitPrograms: `taxPayerBusinessExpense_EmployeeBenefitPrograms${
                index + 1
              }`,
              employeeHealthBenefitPlans: `taxPayerBusinessExpense_EmployeeHealthBenefitPlans${
                index + 1
              }`,
              equipment: `taxPayerBusinessExpense_Equipment${index + 1}`,
              freight: `taxPayerBusinessExpense_Freight${index + 1}`,
              gifts: `taxPayerBusinessExpense_Gifts${index + 1}`,
              insuranceNotHealth: `taxPayerBusinessExpense_InsuranceNotHealth${
                index + 1
              }`,
              interestMortgage: `taxPayerBusinessExpense_InterestMortgage${
                index + 1
              }`,
              interestOther: `taxPayerBusinessExpense_InterestOther${
                index + 1
              }`,
              businessInternetService: `taxPayerBusinessExpense_BusinessInternetService${
                index + 1
              }`,
              leaseImprovements: `taxPayerBusinessExpense_LeaseImprovements${
                index + 1
              }`,
              legalProfessional: `taxPayerBusinessExpense_LegalProfessional${
                index + 1
              }`,
              licenses: `taxPayerBusinessExpense_Licenses${index + 1}`,
              officeExpense: `taxPayerBusinessExpense_OfficeExpense${
                index + 1
              }`,
              pensionPlanFees: `taxPayerBusinessExpense_PensionPlanFees${
                index + 1
              }`,
              rentEquipment: `taxPayerBusinessExpense_RentEquipment${
                index + 1
              }`,
              rentOther: `taxPayerBusinessExpense_RentOther${index + 1}`,
              repairs: `taxPayerBusinessExpense_Repairs${index + 1}`,
              supplies: `taxPayerBusinessExpense_Supplies${index + 1}`,
              taxesPayroll: `taxPayerBusinessExpense_TaxesPayroll${index + 1}`,
              taxesSales: `taxPayerBusinessExpense_TaxesSales${index + 1}`,
              taxesProperty: `taxPayerBusinessExpense_TaxesProperty${
                index + 1
              }`,
              businessTelephone: `taxPayerBusinessExpense_BusinessTelephone${
                index + 1
              }`,
              utilities: `taxPayerBusinessExpense_Utilities${index + 1}`,
              wages: `taxPayerBusinessExpense_Wages${index + 1}`,
              otherExpenses: `taxPayerBusinessExpense_Other${index + 1}`,
            };
            return (
              <div key={index}>
        {questionContainer({
          key: "do_you_use_accounting_software_prepare_income_tax",
          question: t("organizer.individual.income.step3.radio_question"),
          required:true,
          children: radio({
            name: "do_you_use_accounting_software_prepare_income_tax",
          required:true,
            radioButtons: radioButtons,
          }),
        })}
                              {data[findIndexData("do_you_use_accounting_software_prepare_income_tax", data)]?.answer==true &&
                                questionContainer({
                                  key: "do_you_use_accounting_software_prepare_income_tax_attachment",
                                  question: t(
                                    "organizer.individual.income.step3.radio_question_attchement",
                                  ),
                                  required:true,
                                  children: upload({
                                    key: "do_you_use_accounting_software_prepare_income_tax_attachment",
                                    data: data,
                                    required:true,
                                    form,
                                    allowedFileTypes: ["application/pdf", "image/jpeg"],
                                    buttonText: t("organizer.individual.yes_flow.step3.attach"),
                                    dispatch: dispatch,
                                    minCount: 1,
                                    onClick: (index = 0) => {
                                      dispatch(
                                        downloadFile(
                                          data[
                                            findIndexData("do_you_use_accounting_software_prepare_income_tax_attachment", data)
                                          ].files[index].id,
                                          data[
                                            findIndexData("do_you_use_accounting_software_prepare_income_tax_attachment", data)
                                          ].files[index].name,
                                        ),
                                      );
                                    },
                                    onRemove: (index = 0) => {
                                      console.log("Data before removal:", data); // Log the entire data object
                                      const newData = [...data];
                                      const fileIndex = findIndexData(
                                        "do_you_use_accounting_software_prepare_income_tax_attachment",
                                        data,
                                      );
                
                                      // Ensure the fileIndex exists and is correct
                                      if (
                                        fileIndex !== undefined &&
                                        newData[fileIndex]?.files
                                      ) {
                                        const newFileList = [
                                          ...newData[fileIndex].files.slice(0, index),
                                          ...newData[fileIndex].files.slice(index + 1),
                                        ];
                
                                        console.log("Updated file list:", newFileList); // Log the updated list
                                        newData[fileIndex].files = newFileList;
                
                                        setData([...newData]);
                                      } else {
                                        console.error(
                                          "Failed to find file index or file list:",
                                          newData,
                                        );
                                      }
                                    },
                                    maxCount: 1,
                                  }),
                                
                                })}
                {data[findIndexData("do_you_use_accounting_software_prepare_income_tax", data)]?.answer==false && formInfo(namesTaxPayer, index + 1)}
                {data[findIndexData("do_you_use_accounting_software_prepare_income_tax", data)]?.answer==false && countTaxPayer === index + 1 && countTaxPayer > 1 && (
                  <Button
                    key={`button${index}`}
                    text={t(
                      "organizer.individual.income.step3.remove_business",
                    )}
                    type="link"
                    onClick={() =>
                      remove(namesTaxPayer.businessName, countTaxPayer)
                    }
                  />
                )}
              </div>
            );
          })}
{data[findIndexData("do_you_use_accounting_software_prepare_income_tax", data)]?.answer == false && (
  <Button
    text={t("organizer.individual.income.step3.add_business")}
    type="link"
    onClick={() => {
      add(namesTaxPayerFields);
    }}
  />
)}

        </div>
        <div className={styles.subContainer}>
          <Checkbox
            onChange={() => {
              setSpouse(!spouse);
            }}
          >
            {t("organizer.individual.no_flow.step4.add_separately_for_spouse")}
          </Checkbox>
          {spouse && (
            <div
              className={getClassNames(styles.subContainer, styles.marginTop)}
            >
              <p>{t("organizer.individual.income.step3.spouse")}</p>
              {_.times(countSpouse, (index: number) => {
                const namesSpouse = {
                  businessName: `spouseBusinessName${index + 1}`,
                  productOrService: `spouseproductOrService${index + 1}`,
                  employerIDNumber: `spouseBusiness_EmployerIDNumber${
                    index + 1
                  }`,
                  selfEmployedHealthInsuranceCost: `spouseBusiness_SelfEmployedHealthInsuranceCost${
                    index + 1
                  }`,
                  grossIncome: `spouseBusiness_GrossIncome${index + 1}`,
                  returnsAllowances: `spouseBusiness_ReturnsAndAllowances${
                    index + 1
                  }`,
                  beginningInventory: `spouseBusiness_BeginningInventory${
                    index + 1
                  }`,
                  additionsInventory: `spouseBusiness_AdditionsToInventory${
                    index + 1
                  }`,
                  endingInventory: `spouseBusiness_EndingInventory${index + 1}`,
                  advertising: `spouseBusinessExpense_Advertising${index + 1}`,
                  commissionsAndFees: `spouseBusinessExpense_CommissionsandFees${
                    index + 1
                  }`,
                  contractLabor: `spouseBusinessExpense_ContractLabor${
                    index + 1
                  }`,
                  duesPublications: `spouseBusinessExpense_DuesAndPublications${
                    index + 1
                  }`,
                  businessMeals: `spouseBusinessExpense_Meals${index + 1}`,
                  employeeBenefitPrograms: `spouseBusinessExpense_EmployeeBenefitPrograms${
                    index + 1
                  }`,
                  employeeHealthBenefitPlans: `spouseBusinessExpense_EmployeeHealthBenefitPlans${
                    index + 1
                  }`,
                  equipment: `spouseBusinessExpense_Equipment${index + 1}`,
                  freight: `spouseBusinessExpense_Freight${index + 1}`,
                  gifts: `spouseBusinessExpense_Gifts${index + 1}`,
                  insuranceNotHealth: `spouseBusinessExpense_InsuranceNotHealth${
                    index + 1
                  }`,
                  interestMortgage: `spouseBusinessExpense_InterestMortgage${
                    index + 1
                  }`,
                  interestOther: `spouseBusinessExpense_InterestOther${
                    index + 1
                  }`,
                  businessInternetService: `spouseBusinessExpense_BusinessInternetService${
                    index + 1
                  }`,
                  leaseImprovements: `spouseBusinessExpense_LeaseImprovements${
                    index + 1
                  }`,
                  legalProfessional: `spouseBusinessExpense_LegalProfessional${
                    index + 1
                  }`,
                  licenses: `spouseBusinessExpense_Licenses${index + 1}`,
                  officeExpense: `spouseBusinessExpense_OfficeExpense${
                    index + 1
                  }`,
                  pensionPlanFees: `spouseBusinessExpense_PensionPlanFees${
                    index + 1
                  }`,
                  rentEquipment: `spouseBusinessExpense_RentEquipment${
                    index + 1
                  }`,
                  rentOther: `spouseBusinessExpense_RentOther${index + 1}`,
                  repairs: `spouseBusinessExpense_Repairs${index + 1}`,
                  supplies: `spouseBusinessExpense_Supplies${index + 1}`,
                  taxesPayroll: `spouseBusinessExpense_TaxesPayroll${
                    index + 1
                  }`,
                  taxesSales: `spouseBusinessExpense_TaxesSales${index + 1}`,
                  taxesProperty: `spouseBusinessExpense_TaxesProperty${
                    index + 1
                  }`,
                  businessTelephone: `spouseBusinessExpense_BusinessTelephone${
                    index + 1
                  }`,
                  utilities: `spouseBusinessExpense_Utilities${index + 1}`,
                  wages: `spouseBusinessExpense_Wages${index + 1}`,
                  otherExpenses: `spouseBusinessExpense_Other${index + 1}`,
                };
                return (
                  <div key={index}>
                    {formInfo(namesSpouse, index + 1)}
                    {countSpouse === index + 1 && countSpouse > 1 && (
                      <Button
                        key={`button${index}`}
                        text={t(
                          "organizer.individual.income.step3.remove_business",
                        )}
                        type="link"
                        onClick={() =>
                          remove(namesSpouse.businessName, countSpouse)
                        }
                      />
                    )}
                  </div>
                );
              })}
              <Button
                text={t("organizer.individual.income.step3.add_business")}
                type="link"
                className={styles.btn}
                onClick={() => {
                  addSpouse(namesSpouseFields);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <CircularDirection
        hasLeft
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default Step3;
