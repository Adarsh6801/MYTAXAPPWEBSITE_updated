import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form, Checkbox, Divider } from "antd";
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
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { IQuestionContainer } from "./index.props";
import {
  checkbox,
  input,
  radio,
  upload,
} from "../../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step4 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const {
    nextStep = noop,
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
  } = props;
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
    }
  }, [dataOrganizer]);

  const onFinish = async () => {
    try {
      await dispatch(setIndividualOrganizer(data));
      onStepSubmit(data);
      // if (
      //   !data[
      //     findIndexData(
      //       "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
      //       data,
      //     )
      //   ].answer
      // ) {
      //   goTo(29);
      // }
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
      ...newData[index],
      question: newData[index].question,
      answer: value[name],
      files: newData[index].isFile ? value[name].fileList : null,
    };

    setData([...newData]);
  };

  const addFields = (isTaxPayer: boolean, dataKey: any) => {
    const count = isTaxPayer ? countTaxPayer : countSpouse;
    const { name, amount, proofOfPayment } = dataKey;

    const newData: any = [
      ...data,
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
        forSpouse: false,
        question: `${name.key}${count + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        file: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
        forSpouse: false,
        question: `${amount.key}${count + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        file: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
        forSpouse: false,
        question: `${proofOfPayment.key}${count + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        file: null,
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

  const manyInput = (dataInput: any) => {
    const { name, amount, proofOfPayment } = dataInput;
    const count = name.key.includes("taxPayer") ? countTaxPayer : countSpouse;

    return (
      <>
        {_.times(count, index => {
          if (index + 1 > count) {
            return null;
          }
          return (
            <div key={`name${index}`}>
              {questionContainer({
                key: `${name.key}${index + 1}`,
                children: input({
                  name: `${name.key}${index + 1}`,
                  label: name.label,
                }),
              })}
              {questionContainer({
                key: `${amount.key}${index + 1}`,
                children: input({
                  name: `${amount.key}${index + 1}`,
                  label: amount.label,
                }),
              })}

              {questionContainer({
                key: `${proofOfPayment.key}${index + 1}`,
                children: checkbox({
                  name: `${proofOfPayment.key}${index + 1}`,
                  label: proofOfPayment.label,
                  value: findIndexData(
                    `${proofOfPayment.key}${index + 1}`,
                    data,
                  )
                    ? data[
                        findIndexData(`${proofOfPayment.key}${index + 1}`, data)
                      ]?.answer
                    : false,
                }),
              })}
              {count === index + 1 && (
                <Button
                  text={t("organizer.deductions.step4.add_cash_charitable")}
                  type="link"
                  onClick={() =>
                    addFields(name.key.includes("taxPayer"), dataInput)
                  }
                />
              )}
              {count === index + 1 && count > 1 && (
                <Button
                  text={t("organizer.deductions.step4.remove_cash_charitable")}
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
        className={getClassNames(
          styles.questionContainer,
          key === "unitNoAsOfDec31" ||
            ("spouseUnitNoAsOfDec31" && styles.smallInput),
        )}
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
        {
          <Trans
            i18nKey="organizer.deductions.step4.description1"
            values={{ note: "Note –" }}
            components={[<span className={styles.notesTitle}>text</span>]}
          />
        }
      </p>
      <p>
        {
          <Trans
            i18nKey="organizer.deductions.step4.description2"
            values={{ note: "Note –" }}
            components={[<span className={styles.notesTitle}>text</span>]}
          />
        }
      </p>
      <div>
        {questionContainer({
          key: "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
          question: t("organizer.deductions.step4.question1"),
          children: radio({
            name: "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
            radioButtons: radioButtons,
          }),
        })}
        <Divider />
        {data[
          findIndexData(
            "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
            data,
          )
        ]?.answer &&
          questionContainer({
            key: "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
            question: t("organizer.deductions.step4.question2"),
            children: (
              <>
                {radio({
                  name: "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
                  radioButtons: radioButtons,
                })}
                {data[
                  findIndexData(
                    "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
                    data,
                  )
                ]?.answer &&
                  upload({
                    key: "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                    data: data,
                    dispatch: dispatch,
                    onClick: (index = 0) => {
                      dispatch(
                        downloadFile(
                          data[
                            findIndexData(
                              "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                              data,
                            )
                          ].files[index].id,
                          data[
                            findIndexData(
                              "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                              data,
                            )
                          ].files[index].name,
                        ),
                      );
                    },
                    onRemove: (index = 0) => {
                      const newData = [...data];
                      const newFileList = [
                        ...data[
                          findIndexData(
                            "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                            data,
                          )
                        ].files.slice(0, index),
                        ...data[
                          findIndexData(
                            "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                            data,
                          )
                        ].files.slice(index + 1),
                      ];
                      newData[
                        findIndexData(
                          "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                          data,
                        )
                      ].files = newFileList;

                      setData([...newData]);
                    },
                  })}
              </>
            ),
          })}
        <Divider />
        {data[
          findIndexData(
            "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
            data,
          )
        ]?.answer === true &&
          data[
            findIndexData(
              "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
              data,
            )
          ]?.answer === false &&
          manyInput({
            name: {
              key: "taxPayer_CashCharitableContributions_NameOfOrganization",
              label: t("organizer.deductions.step4.label1"),
            },
            amount: {
              key: "taxPayer_CashCharitableContributions_Amount",
              label: t("organizer.deductions.step4.label2"),
            },
            proofOfPayment: {
              key: "taxPayer_CashCharitableContributions_HasProofOfPayment",
              label: t("organizer.deductions.step4.label3"),
            },
          })}
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
            {questionContainer({
              key: "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
              question: t("organizer.deductions.step4.question1"),
              children: radio({
                name: "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
                radioButtons: radioButtons,
              }),
            })}
            <Divider />
            {data[
              findIndexData(
                "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
                data,
              )
            ]?.answer &&
              questionContainer({
                key: "spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
                question: t("organizer.deductions.step4.question2"),
                children: (
                  <>
                    {radio({
                      name: "spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
                      radioButtons: radioButtons,
                    })}
                    {data[
                      findIndexData(
                        "spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
                        data,
                      )
                    ]?.answer &&
                      upload({
                        key: "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                        data: data,
                        dispatch: dispatch,
                        onClick: (index = 0) => {
                          dispatch(
                            downloadFile(
                              data[
                                findIndexData(
                                  "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                                  data,
                                )
                              ].files[index].id,
                              data[
                                findIndexData(
                                  "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                                  data,
                                )
                              ].files[index].name,
                            ),
                          );
                        },
                        onRemove: (index = 0) => {
                          const newData = [...data];
                          const newFileList = [
                            ...data[
                              findIndexData(
                                "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                                data,
                              )
                            ].files.slice(0, index),
                            ...data[
                              findIndexData(
                                "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                                data,
                              )
                            ].files.slice(index + 1),
                          ];
                          newData[
                            findIndexData(
                              "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
                              data,
                            )
                          ].files = newFileList;

                          setData([...newData]);
                        },
                      })}
                  </>
                ),
              })}
            <Divider />
            {data[
              findIndexData(
                "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
                data,
              )
            ]?.answer === true &&
              data[
                findIndexData(
                  "spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
                  data,
                )
              ]?.answer === false &&
              manyInput({
                name: {
                  key: "spouse_CashCharitableContributions_NameOfOrganization",
                  label: t("organizer.deductions.step4.label1"),
                },
                amount: {
                  key: "spouse_CashCharitableContributions_Amount",
                  label: t("organizer.deductions.step4.label2"),
                },
                proofOfPayment: {
                  key: "spouse_CashCharitableContributions_HasProofOfPayment",
                  label: t("organizer.deductions.step4.label3"),
                },
              })}
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

export default Step4;
