import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Checkbox } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getClassNames,
  getCurrentType,
} from "../../../../../helpers/format";
import { radio, upload } from "../../../../../components/Module";
import { IQuestionContainer } from "./index.props";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";

import {
  taxPayer,
  spouse as spouseData,
  dataRadio,
  DATA_KEY,
} from "./index.constants";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step2 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, goTo = noop, prevStep = noop } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();

  const [fieldName, setFiledName] = useState("");
  const [spouse, setSpouse] = useState(false);
  const [data, setData] = useState<IOrganizerStepProps[]>([
    ...addQuoteIdOrganizer(taxPayer, Number(quoteId)),
    ...addQuoteIdOrganizer(spouseData, Number(quoteId)),
  ]);

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    (fieldName == "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC" ||
      fieldName == "didSpouseEarnIncomeAsASelfEmployedOrSMLLC") &&
      restField(fieldName);
  }, [fieldName]);

  useEffect(() => {
    if (dataOrganizer) {
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

  const onFinish = async (value: any) => {
    await dispatch(setIndividualOrganizer(data));
    onStepSubmit(value);
    if (
      !!data[findIndexData("didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC", data)]
        .answer &&
      data[
        findIndexData(
          "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
          data,
        )
      ].answer === null
    ) {
      goTo(21);
      return;
    }

    if (
      !!data[
        findIndexData(
          "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
          data,
        )
      ].answer
    ) {
      goTo(18);
      return;
    } else {
      goTo(19);
      return;
    }
  };

  const restField = (name: string) => {
    let newObject = [...data];
    const resetName: string[] = [];
    const newdataReset = name.toLowerCase().includes("taxpayer")
      ? DATA_KEY.filter(el => el.toLowerCase().includes("taxpayer"))
      : DATA_KEY.filter(el => el.toLowerCase().includes("spouse"));

    newdataReset.forEach(item => {
      if (
        item === "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC" ||
        item === "didSpouseEarnIncomeAsASelfEmployedOrSMLLC"
      ) {
        return;
      }
      resetName.push(data[findIndexData(item, data)].question);
      newObject[findIndexData(item, data)] = {
        ...data[findIndexData(item, data)],
        answer: null,
        message: "",
        reminder: false,
        isFile: data[findIndexData(item, data)].isFile,
        files: null,
      };
    });

    setData([...newObject]);
    form.resetFields(resetName);
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);

    const index: number = +findIndexData(name, data);
    const newData = [...data];
    newData[index] = {
      ...data[index],
      answer: value[name],
      isFile: data[index].isFile,
      files: data[index].isFile ? value[name].fileList : null,
    };
    setData([...newData]);
    setFiledName(name);
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
        childrenClassName={styles.context}
      >
        {children}
      </OrganizerQuestionCard>
    );
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
          <p>{t("organizer.individual.income.step2.taxpayer")}</p>
          {questionContainer({
            key: "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC",
            question: t("organizer.individual.income.step2.question1"),
            children: radio({
              name: "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC",
              radioButtons: dataRadio,
              value:
                data[
                  findIndexData(
                    "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC",
                    data,
                  )
                ]?.answer,
            }),
          })}
          {data[
            findIndexData("didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC", data)
          ]?.answer &&
            questionContainer({
              key: "didTaxPayerReceive_1099NEC_Misc_KForms",
              question: t("organizer.individual.income.step2.question2"),
              children: radio({
                name: "didTaxPayerReceive_1099NEC_Misc_KForms",
                radioButtons: dataRadio,
              }),
            })}
          {data[
            findIndexData("didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC", data)
          ]?.answer &&
            data[findIndexData("didTaxPayerReceive_1099NEC_Misc_KForms", data)]
              ?.answer &&
            questionContainer({
              key: "taxPayerSelfEmployedDocument",
              question: t("organizer.individual.income.step2.question3"),
              children: upload({
                key: "taxPayerSelfEmployedDocument",
                data: data,
                buttonText: "Attach",
                dispatch: dispatch,
                onClick: (index = 0) => {
                  dispatch(
                    downloadFile(
                      data[findIndexData("taxPayerSelfEmployedDocument", data)]
                        .files[index].id,
                      data[findIndexData("taxPayerSelfEmployedDocument", data)]
                        .files[index].name,
                    ),
                  );
                },
                onRemove: (index = 0) => {
                  const newData = [...data];
                  const newFileList = [
                    ...data[
                      findIndexData("taxPayerSelfEmployedDocument", data)
                    ].files.slice(0, index),
                    ...data[
                      findIndexData("taxPayerSelfEmployedDocument", data)
                    ].files.slice(index + 1),
                  ];
                  newData[
                    findIndexData("taxPayerSelfEmployedDocument", data)
                  ].files = newFileList;

                  setData([...newData]);
                },
              }),
            })}
          {data[
            findIndexData("didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC", data)
          ]?.answer &&
            questionContainer({
              key: "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
              question: t("organizer.individual.income.step2.question4"),
              children: radio({
                name: "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
                radioButtons: dataRadio,
                value:
                  data[
                    findIndexData(
                      "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
                      data,
                    )
                  ]?.answer,
              }),
            })}
        </div>
        <div className={styles.subContainer}>
          <Checkbox
            onChange={() => {
              setSpouse(!spouse);
            }}
          >
            {t("organizer.individual.income.step2.add_spouse")}
          </Checkbox>
          {spouse && (
            <>
              <p>{t("organizer.individual.income.step2.spouse")}</p>
              {questionContainer({
                key: "didSpouseEarnIncomeAsASelfEmployedOrSMLLC",
                question: t("organizer.individual.income.step2.question1"),
                children: radio({
                  name: "didSpouseEarnIncomeAsASelfEmployedOrSMLLC",
                  radioButtons: dataRadio,
                  value:
                    data[
                      findIndexData(
                        "didSpouseEarnIncomeAsASelfEmployedOrSMLLC",
                        data,
                      )
                    ]?.answer,
                }),
              })}
              {data[
                findIndexData("didSpouseEarnIncomeAsASelfEmployedOrSMLLC", data)
              ]?.answer &&
                questionContainer({
                  key: "didSpouseReceive_1099NEC_Misc_KForms",
                  question: t("organizer.individual.income.step2.question2"),
                  children: radio({
                    name: "didSpouseReceive_1099NEC_Misc_KForms",
                    radioButtons: dataRadio,
                    value:
                      data[
                        findIndexData(
                          "didSpouseReceive_1099NEC_Misc_KForms",
                          data,
                        )
                      ]?.answer,
                  }),
                })}
              {data[
                findIndexData("didSpouseEarnIncomeAsASelfEmployedOrSMLLC", data)
              ]?.answer &&
                (data[
                  findIndexData("didSpouseReceive_1099NEC_Misc_KForms", data)
                ].answer ||
                  data[
                    findIndexData("didSpouseReceive_1099NEC_Misc_KForms", data)
                  ]?.answer) &&
                questionContainer({
                  key: "spouseSelfEmployedDocument",
                  question: t("organizer.individual.income.step2.question3"),
                  children: upload({
                    key: "spouseSelfEmployedDocument",
                    data: data,
                    buttonText: "Attach",
                    dispatch: dispatch,
                    onClick: (index = 0) => {
                      dispatch(
                        downloadFile(
                          data[
                            findIndexData("spouseSelfEmployedDocument", data)
                          ].files[index].id,
                          data[
                            findIndexData("spouseSelfEmployedDocument", data)
                          ].files[index].name,
                        ),
                      );
                    },
                    onRemove: (index = 0) => {
                      const newData = [...data];
                      const newFileList = [
                        ...data[
                          findIndexData("spouseSelfEmployedDocument", data)
                        ].files.slice(0, index),
                        ...data[
                          findIndexData("spouseSelfEmployedDocument", data)
                        ].files.slice(index + 1),
                      ];
                      newData[
                        findIndexData("spouseSelfEmployedDocument", data)
                      ].files = newFileList;

                      setData([...newData]);
                    },
                  }),
                })}
              {data[
                findIndexData("didSpouseEarnIncomeAsASelfEmployedOrSMLLC", data)
              ]?.answer &&
                questionContainer({
                  key: "didSpouseReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
                  question: t("organizer.individual.income.step2.question4"),
                  children: radio({
                    name: "didSpouseReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
                    radioButtons: dataRadio,
                    value:
                      data[
                        findIndexData(
                          "didSpouseReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
                          data,
                        )
                      ]?.answer,
                  }),
                })}
            </>
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

export default Step2;
