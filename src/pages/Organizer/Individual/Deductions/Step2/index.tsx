import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import Button from "../../../../../components/Button";
import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
  getDynamicDataCount,
} from "../../../../../helpers/format";
import {
  initialTaxPayerData,
  initialSpouseData,
  radioButtons,
  DATA_KEY,
} from "./index.constants";
import { ORGANIZER_CATEGORY_ID } from "../../../../../constants/organizer";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";
import {
  checkbox,
  input,
  radio,
  upload,
} from "../../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step2 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const { prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();

  const [showSpouse, setShowSpouse] = useState(false);
  const [countTaxPayer, setCountTaxPayer] = useState(1);
  const [countSpouse, setCountSpouse] = useState(1);

  const [data, setData] = useState<IOrganizerStepProps[]>([
    ...addQuoteIdOrganizer(initialTaxPayerData, Number(quoteId)),
    ...addQuoteIdOrganizer(initialSpouseData, Number(quoteId)),
  ]);

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
      resultData.length >= DATA_KEY.length &&
        setCountTaxPayer(
          getDynamicDataCount(
            "taxPayer_MortgageInterest_PaidTo_PayeeName",
            resultData,
          ),
        );
      resultData.length >= DATA_KEY.length &&
        setCountTaxPayer(
          getDynamicDataCount(
            "spouse_MortgageInterest_PaidTo_PayeeName",
            resultData,
          ),
        );
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

      await dispatch(setIndividualOrganizer([...data]));
      data[findIndexData("taxPayer_PayHomeMortgageinterest", data)].answer &&
      data[findIndexData("taxPayer_Reseive1098Form", data)].answer === null
        ? goTo(31)
        : goTo(25);
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
      files: newData[index].isFile ? value[name].fileList : null,
    };

    setData([...newData]);
  };

  const addFields = (isTaxPayer: boolean, dataKey: any) => {
    const { name, ssn, address } = dataKey;
    const count = isTaxPayer ? countTaxPayer : countSpouse;

    const newData: any = [
      ...data,
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.homeMortgageINterest,
        forSpouse: false,
        question: `${name.key}${count + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.homeMortgageINterest,
        forSpouse: false,
        question: `${ssn.key}${count + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.homeMortgageINterest,
        forSpouse: false,
        question: `${address.key}${count + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
    ];

    isTaxPayer ? setCountTaxPayer(count + 1) : setCountSpouse(count + 1);
    setData(newData);
  };

  const removeFields = (isTaxPayer: boolean, key: string) => {
    const count = isTaxPayer ? countTaxPayer : countSpouse;
    const isTax = isTaxPayer ? "taxPayer" : "spouse";
    const newdata = data.filter(
      item =>
        !item.question.includes(`${count}`) && item.question.includes(isTax),
    );
    const other = data.filter(item => !item.question.includes(isTax));
    setData([...newdata, ...other]);
    isTaxPayer ? setCountTaxPayer(count - 1) : setCountSpouse(count - 1);
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
        childrenClassName={styles.context}
        className={styles.container}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const manyInput = (dataInput: any) => {
    const { name, ssn, address } = dataInput;
    const count = name.key.includes("taxPayer") ? countTaxPayer : countSpouse;

    return (
      <>
        {_.times(count, index => {
          if (index + 1 > count) {
            return null;
          }
          return (
            <div key={index}>
              {questionContainer({
                key: `${name.key}${index + 1}`,
                children: input({
                  name: `${name.key}${index + 1}`,
                  label: name.label,
                }),
              })}
              {questionContainer({
                key: `${ssn.key}${index + 1}`,
                children: input({
                  name: `${ssn.key}${index + 1}`,
                  label: ssn.label,
                }),
              })}
              {questionContainer({
                key: `${address.key}${index + 1}`,
                children: checkbox({
                  name: `${address.key}${index + 1}`,
                  label: address.label,
                  value: findIndexData(`${address.key}${index + 1}`, data)
                    ? data[findIndexData(`${address.key}${index + 1}`, data)]
                        ?.answer
                    : false,
                }),
              })}
              {count === index + 1 && (
                <Button
                  text={t("organizer.deductions.step2.add_fields")}
                  type="link"
                  onClick={() =>
                    addFields(name.key.includes("taxPayer"), dataInput)
                  }
                />
              )}
              {count === index + 1 && count > 1 && (
                <Button
                  text={t("organizer.deductions.step2.remove_fields")}
                  type="link"
                  onClick={() => {
                    removeFields(name.key.includes("taxPayer"), name.key);
                  }}
                />
              )}
            </div>
          );
        })}
      </>
    );
  };

  const formInfo = (keys: IFormInfo, isTaxesPayer: boolean) => {
    const {
      homeMortgage,
      youReceiveForm1098,
      uploadData,
      payersName,
      amount,
      secondHome,
      equityLoan,
      checkQualified,
      name,
      ssn,
      address,
      homeLoanBeen,
      refinanceAnyLoansYear,
    } = keys;

    return (
      <div>
        {questionContainer({
          key: homeMortgage.key,
          question: t("organizer.deductions.step2.question1"),
          required: true,
          children: radio({
            required:true,
            name: homeMortgage.key,
            radioButtons: radioButtons,
          }),
        })}
        {data[findIndexData(homeMortgage.key, data)]?.answer === true &&
          questionContainer({
            key: youReceiveForm1098.key,
            question: t("organizer.deductions.step2.question2"),
            required:true,
            children: (
              <>
                <>
                  {radio({
                    name: youReceiveForm1098.key,
                    radioButtons: radioButtons,
                    required:true
                  })}
                </>
                <>
                  {data[findIndexData(youReceiveForm1098.key, data)]?.answer ===
                    true &&
                    upload({
                      key: uploadData.key,
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[findIndexData(uploadData.key, data)].files[
                              index
                            ].id,
                            data[findIndexData(uploadData.key, data)].files[
                              index
                            ].name,
                          ),
                        );
                      },
                      onRemove: (index = 0) => {
                        const newData = [...data];
                        const newFileList = [
                          ...data[
                            findIndexData(uploadData.key, data)
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(uploadData.key, data)
                          ].files.slice(index + 1),
                        ];
                        newData[findIndexData(uploadData.key, data)].files =
                          newFileList;

                        setData([...newData]);
                      },
                      required:true,
                      minCount:1
                    })}
                </>
              </>
            ),
          })}
        {data[findIndexData(youReceiveForm1098.key, data)]?.answer ===
                    false && (
          <>
                        {" "}
                        <p>{t("organizer.deductions.step2.sub_title1")}</p>
            <>
              {/* <p>Paid to</p> */}
              {questionContainer({
                key: payersName.key,
                children: input({
                  name: payersName.key,
                  label: t("organizer.deductions.step2.label1"),
                }),
              })}
              {questionContainer({
                key: amount.key,
                children: input({
                  name: amount.key,
                  label: t("organizer.deductions.step2.label1"),
                }),
              })}

              {questionContainer({
                key: secondHome.key,
                children: (
                  <div className={styles.checkboxContainer}>
                    {checkbox({
                      name: secondHome.key,
                      label: t("organizer.deductions.step2.label3"),
                      value: data[findIndexData(secondHome.key, data)].answer,
                    })}{" "}
                    {checkbox({
                      name: equityLoan.key,
                      label: t("organizer.deductions.step2.label4"),
                      value: data[findIndexData(equityLoan.key, data)].answer,
                    })}
                  </div>
                ),
              })}

              {questionContainer({
                key: checkQualified.key,
                children: checkbox({
                  name: checkQualified.key,
                  label: t("organizer.deductions.step2.label5"),
                  value: data[findIndexData(checkQualified.key, data)].answer,
                }),
              })}
            </>
            {/* <>

              <p>
                <Trans
                  i18nKey="organizer.deductions.step4.description1"
                  answers={{ note: "Caution –" }}
                  components={[<span className={styles.notesTitle}>text</span>]}
                />
              </p>
            </>
            {manyInput({
              name: {
                key: name.key,
                label: t("organizer.deductions.step4.label1"),
              },
              ssn: {
                key: ssn.key,
                label: t("organizer.deductions.step4.label2"),
              },
              address: {
                key: address.key,
                label: t("organizer.deductions.step4.label3"),
              },
            })} */}
            <>
              <p>{t("organizer.deductions.step2.sub_title2")}</p>
              {questionContainer({
                key: homeLoanBeen.key,
                children: (
                  <div className={styles.checkboxContainer}>
                    {checkbox({
                      name: homeLoanBeen.key,
                      label: t("organizer.deductions.step2.taxPayer"),
                      value: data[findIndexData(homeLoanBeen.key, data)].answer,
                    })}
                  </div>
                ),
              })}

              {questionContainer({
                key: refinanceAnyLoansYear.key,
                question: refinanceAnyLoansYear.key.includes("taxPayer")
                  ? t("organizer.deductions.step2.question5")
                  : t("organizer.deductions.step2.spouse"),
                children: (
                  <div className={styles.checkboxContainer}>
                    {checkbox({
                      name: refinanceAnyLoansYear.key,
                      label: refinanceAnyLoansYear.key.includes("taxPayer")
                        ? t("organizer.deductions.step2.question5")
                        : t("organizer.deductions.step2.spouse"),
                      value:
                        data[findIndexData(refinanceAnyLoansYear.key, data)]
                          .answer,
                    })}
                  </div>
                ),
              })}
            </>
          </>
        )}
      </div>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      onValuesChange={onValuesChange}
      layout="vertical"
      className={styles.marginRight}
    >
      <p>
        <Trans
          i18nKey="organizer.deductions.step2.description"
          values={{ note: "Note –" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <div>
        {formInfo(
          {
            homeMortgage: { key: "taxPayer_PayHomeMortgageinterest", index: 0 },
            youReceiveForm1098: { key: "taxPayer_Reseive1098Form", index: 1 },
            uploadData: { key: "taxPayer_Form1098Upload", index: 2 },
            payersName: {
              key: "taxPayer_MortgageInterest_PaidTo_PayeeName",
              index: 3,
            },
            amount: {
              key: "taxPayer_MortgageInterest_PaidTo_Amount",
              index: 4,
            },
            secondHome: {
              key: "taxPayer_MortgageInterest_PaidTo_SecondHome",
              index: 5,
            },
            equityLoan: {
              key: "taxPayer_MortgageInterest_PaidTo_EquityLoan",
              index: 6,
            },
            checkQualified: {
              key: "taxPayer_MortgageInterest_PaidTo_CheckIfHomeQualified",
              index: 7,
            },

            name: { key: "taxPayer_MortgageInterest_PaidTo_Name", index: 10 },
            ssn: { key: "taxPayer_MortgageInterest_PaidTo_SSN", index: 11 },
            address: {
              key: "taxPayer_MortgageInterest_PaidTo_Address",
              index: 12,
            },

            homeLoanBeen: {
              key: "taxPayer_MortgageInterest_HasOriginalHomeLoan",
              index: 8,
            },
            refinanceAnyLoansYear: {
              key: "taxPayer_MortgageInterest_PaidTo_RefinanceAnyLoans",
              index: 9,
            },
          },
          true,
        )}
      </div>
      <div>
        <Checkbox
          className={styles.marginBottom}
          onChange={() => {
            setShowSpouse(!showSpouse);
          }}
        >
          {showSpouse
            ? t("organizer.deductions.step4.remove_spouse")
            : t("organizer.deductions.step4.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <>
            {formInfo(
              {
                homeMortgage: {
                  key: "spouse_PayHomeMortgageinterest",
                  index: 0,
                },
                youReceiveForm1098: {
                  key: "spouse_Reseive1098Form",
                  index: 1,
                },
                uploadData: { key: "spouse_Form1098Upload", index: 2 },
                payersName: {
                  key: "spouse_MortgageInterest_PaidTo_PayeeName",
                  index: 3,
                },
                amount: {
                  key: "spouse_MortgageInterest_PaidTo_Amount",
                  index: 4,
                },
                secondHome: {
                  key: "taxPayer_MortgageInterest_PaidTo_SecondHome",
                  index: 5,
                },
                equityLoan: {
                  key: "spouse_MortgageInterest_PaidTo_EquityLoan",
                  index: 6,
                },
                checkQualified: {
                  key: "spouse_MortgageInterest_PaidTo_CheckIfHomeQualified",
                  index: 7,
                },
                name: { key: "spouse_MortgageInterest_PaidTo_Name", index: 10 },
                ssn: { key: "spouse_MortgageInterest_PaidTo_SSN", index: 11 },
                address: {
                  key: "spouse_MortgageInterest_PaidTo_Address",
                  index: 12,
                },
                homeLoanBeen: {
                  key: "spouse_MortgageInterest_HasOriginalHomeLoan",
                  index: 8,
                },
                refinanceAnyLoansYear: {
                  key: "spouse_MortgageInterest_PaidTo_RefinanceAnyLoans",
                  index: 9,
                },
              },
              false,
            )}
          </>
        )}
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

export default Step2;
