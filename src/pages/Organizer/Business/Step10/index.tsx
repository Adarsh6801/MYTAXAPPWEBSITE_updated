import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import {
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../helpers/format";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../redux/conversationSlice";
import {
  data as initialData,
  radioYesNoButtons,
  answersData,
  DATA_KEY,
} from "./index.constants";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { radio, upload } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step10 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [fieldName, setFiledName] = useState("");
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
    onStepSubmit(data);
    await dispatch(setIndividualOrganizer(data));
    nextStep();
  };

  useEffect(() => {
    fieldName ===
      "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod" &&
      restField(fieldName);
  }, [fieldName]);

  const restField = (name: string) => {
    let newObject = [...data];
    const resetName: string[] = [];
    const dataKeys = Object.entries(data);
    const propertyIndex = findIndexData(name, data);

    dataKeys.forEach((item, index) => {
      if (index > propertyIndex) {
        resetName.push(data[index].question);
        newObject[index] = {
          ...newObject[index],
          answer: null,
          message: "",
          reminder: false,
          isFile: data[index].isFile,
          files: null,
        };
      }
    });

    form.resetFields(resetName);
    setData(newObject);
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
        subClass={styles.subjectContainer}
        className={styles.questionContainer}
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
      <div className={styles.marginBottom}>
        {questionContainer({
          key: "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
          question: t("organizer.business.step10.question1"),
          children: radio({
            name: "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
            radioButtons: radioYesNoButtons,
          }),
        })}
        {!data[
          findIndexData(
            "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
            data,
          )
        ].answer &&
          data[
            findIndexData(
              "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
              data,
            )
          ].answer !== null &&
          questionContainer({
            key: "automatedBookkeeping_CanProvideReportsInPdf",
            question: t("organizer.business.step10.question2"),
            children: radio({
              name: "automatedBookkeeping_CanProvideReportsInPdf",
              radioButtons: answersData,
              direction: "vertical",
            }),
          })}

        {data[
          findIndexData(
            "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
            data,
          )
        ].answer &&
          data[
            findIndexData(
              "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
              data,
            )
          ].answer !== null &&
          questionContainer({
            key: "automatedBookkeeping_CanProvideReportsInPdf",
            question: t("organizer.business.step10.question3"),
            children: (
              <>
                {radio({
                  name: "automatedBookkeeping_CanProvideReportsInPdf",
                  radioButtons: radioYesNoButtons,
                })}
                {data[
                  findIndexData(
                    "automatedBookkeeping_CanProvideReportsInPdf",
                    data,
                  )
                ].answer && (
                  <>
                    {upload({
                      key: "automatedBookkeeping_IncomeStatementFile",
                      label: t("organizer.business.step10.label3"),
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[
                              findIndexData(
                                "automatedBookkeeping_IncomeStatementFile",
                                data,
                              )
                            ].files[index].id,
                            data[
                              findIndexData(
                                "automatedBookkeeping_IncomeStatementFile",
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
                              "automatedBookkeeping_IncomeStatementFile",
                              data,
                            )
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(
                              "automatedBookkeeping_IncomeStatementFile",
                              data,
                            )
                          ].files.slice(index + 1),
                        ];
                        newData[
                          findIndexData(
                            "automatedBookkeeping_IncomeStatementFile",
                            data,
                          )
                        ].files = newFileList;

                        setData([...newData]);
                      },
                    })}
                    {upload({
                      key: "automatedBookkeeping_BalanceSheetFile",
                      label: t("organizer.business.step10.label4"),
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[
                              findIndexData(
                                "automatedBookkeeping_BalanceSheetFile",
                                data,
                              )
                            ].files[index].id,
                            data[
                              findIndexData(
                                "automatedBookkeeping_BalanceSheetFile",
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
                              "automatedBookkeeping_BalanceSheetFile",
                              data,
                            )
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(
                              "automatedBookkeeping_BalanceSheetFile",
                              data,
                            )
                          ].files.slice(index + 1),
                        ];
                        newData[
                          findIndexData(
                            "automatedBookkeeping_BalanceSheetFile",
                            data,
                          )
                        ].files = newFileList;

                        setData([...newData]);
                      },
                    })}
                    {upload({
                      key: "automatedBookkeeping_GeneralLedgerFile",
                      label: t("organizer.business.step10.label5"),
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[
                              findIndexData(
                                "automatedBookkeeping_GeneralLedgerFile",
                                data,
                              )
                            ].files[index].id,
                            data[
                              findIndexData(
                                "automatedBookkeeping_GeneralLedgerFile",
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
                              "automatedBookkeeping_GeneralLedgerFile",
                              data,
                            )
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(
                              "automatedBookkeeping_GeneralLedgerFile",
                              data,
                            )
                          ].files.slice(index + 1),
                        ];
                        newData[
                          findIndexData(
                            "automatedBookkeeping_GeneralLedgerFile",
                            data,
                          )
                        ].files = newFileList;

                        setData([...newData]);
                      },
                    })}
                  </>
                )}
              </>
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

export default Step10;
