import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../helpers/format";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { checkbox, radio, upload } from "../../../../components/Module";
import { downloadFile } from "../../../../redux/conversationSlice";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";

import Avatar from "../../../../assets/svgs/avatar_circle.svg";
import styles from "./index.module.css";

const noop = () => {};

const Step11 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    nextStep = noop,
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
  } = props;
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

  useEffect(() => {
    fieldName !==
      "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem" &&
      restField(fieldName);
  }, [fieldName]);

  const onFinish = async () => {
    onStepSubmit(data);
    await dispatch(setIndividualOrganizer(data));
    if (
      data[
        findIndexData(
          "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
          data,
        )
      ].answer
    ) {
      goTo(14);
      return;
    }
    nextStep();
  };

  const restField = (name: string) => {
    let newObject = [...data];
    const resetName: string[] = [];
    const dataKeys = Object.entries(data);
    const propertyIndex = findIndexData(name, data);

    dataKeys.forEach((item, index) => {
      if (index > propertyIndex) {
        resetName.push(data[index].question);
        newObject[index] = {
          ...data[index],
          answer: null,
          message: "",
          reminder: false,
          isFile: data[index].isFile,
          files: null,
        };
      }
    });

    setData(newObject);
    form.resetFields(resetName);
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
        childrenClassName={styles.context}
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      requiredMark={false}
      form={form}
      layout="vertical"
    >
      <div className={styles.marginBottom}>
        {questionContainer({
          key: "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
          question: (
            <div className={styles.questionTextContainer}>
              <p>{t("organizer.business.step11.question1")}</p>
              <ul>
                <li>{t("organizer.business.step11.label8")}</li>
                <li>{t("organizer.business.step11.label9")}</li>
                <li>{t("organizer.business.step11.label10")}</li>
                <li>{t("organizer.business.step11.label11")}</li>
              </ul>
            </div>
          ),
          children: radio({
            name: "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
            radioButtons: radioButtons,
          }),
        })}
        {data[
          findIndexData(
            "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
            data,
          )
        ]?.answer &&
          data[
            findIndexData(
              "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
              data,
            )
          ]?.answer != null && (
            <>
              <div className={styles.infoContainer}>
                <img src={Avatar} className={styles.img} />
                <p>{t("organizer.business.step11.sub_title1")}</p>
              </div>
              <div className={styles.textContainer}>
                <p>{t("organizer.business.step11.sub_title3")}</p>
                {checkbox({
                  name: "automatedBookkeeping_SentInviteFromMyAccountingSoftware",
                  label: t("organizer.business.step11.label2"),
                  value:
                    data[
                      findIndexData(
                        "automatedBookkeeping_SentInviteFromMyAccountingSoftware",
                        data,
                      )
                    ].answer,
                })}
              </div>
            </>
          )}
        {!data[
          findIndexData(
            "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
            data,
          )
        ]?.answer &&
          data[
            findIndexData(
              "automatedBookkeeping_DoMaintainOnlineCloudBasedAccountingSystem",
              data,
            )
          ]?.answer != null && (
            <>
              {questionContainer({
                key: "automatedBookkeeping_ExcelOfIncomeStatementFile",
                question: t("organizer.business.step11.question2"),
                children: radio({
                  name: "automatedBookkeeping_ExcelOfIncomeStatementFile",
                  radioButtons: radioButtons,
                }),
              })}
              {data[
                findIndexData("automatedBookkeeping_CanAttacheExcelFiles", data)
              ]?.answer &&
                data[
                  findIndexData(
                    "automatedBookkeeping_CanAttacheExcelFiles",
                    data,
                  )
                ]?.answer != null && (
                  <div>
                    <p>{t("organizer.business.step11.sub_title2")}</p>
                    <p className={styles.maxWidth}>
                      {" "}
                      <Trans
                        i18nKey="organizer.business.step11.description"
                        values={{ note: "Note -" }}
                        components={[
                          <span className={styles.notesTitle}>text</span>,
                        ]}
                      />
                    </p>
                    {upload({
                      key: "automatedBookkeeping_ExcelOfIncomeStatementFile",
                      label: t("organizer.business.step11.label3"),
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[
                              findIndexData(
                                "automatedBookkeeping_ExcelOfIncomeStatementFile",
                                data,
                              )
                            ].files[index].id,
                            data[
                              findIndexData(
                                "automatedBookkeeping_ExcelOfIncomeStatementFile",
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
                              "automatedBookkeeping_ExcelOfIncomeStatementFile",
                              data,
                            )
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(
                              "automatedBookkeeping_ExcelOfIncomeStatementFile",
                              data,
                            )
                          ].files.slice(index + 1),
                        ];
                        newData[
                          findIndexData(
                            "automatedBookkeeping_ExcelOfIncomeStatementFile",
                            data,
                          )
                        ].files = newFileList;

                        setData([...newData]);
                      },
                    })}
                    {upload({
                      key: "automatedBookkeeping_ExcelOfBalanceSheetFile",
                      label: t("organizer.business.step11.label4"),
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[
                              findIndexData(
                                "automatedBookkeeping_ExcelOfBalanceSheetFile",
                                data,
                              )
                            ].files[index].id,
                            data[
                              findIndexData(
                                "automatedBookkeeping_ExcelOfBalanceSheetFile",
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
                              "automatedBookkeeping_ExcelOfBalanceSheetFile",
                              data,
                            )
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(
                              "automatedBookkeeping_ExcelOfBalanceSheetFile",
                              data,
                            )
                          ].files.slice(index + 1),
                        ];
                        newData[
                          findIndexData(
                            "automatedBookkeeping_ExcelOfBalanceSheetFile",
                            data,
                          )
                        ].files = newFileList;

                        setData([...newData]);
                      },
                    })}
                    {upload({
                      key: "automatedBookkeeping_ExcelOfGeneralLedgerFile",
                      label: t("organizer.business.step11.label5"),
                      data: data,
                      dispatch: dispatch,
                      onClick: (index = 0) => {
                        dispatch(
                          downloadFile(
                            data[
                              findIndexData(
                                "automatedBookkeeping_ExcelOfGeneralLedgerFile",
                                data,
                              )
                            ].files[index].id,
                            data[
                              findIndexData(
                                "automatedBookkeeping_ExcelOfGeneralLedgerFile",
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
                              "automatedBookkeeping_ExcelOfGeneralLedgerFile",
                              data,
                            )
                          ].files.slice(0, index),
                          ...data[
                            findIndexData(
                              "automatedBookkeeping_ExcelOfGeneralLedgerFile",
                              data,
                            )
                          ].files.slice(index + 1),
                        ];
                        newData[
                          findIndexData(
                            "automatedBookkeeping_ExcelOfGeneralLedgerFile",
                            data,
                          )
                        ].files = newFileList;

                        setData([...newData]);
                      },
                    })}

                    <p>{t("organizer.business.step11.sub_title3")}</p>
                    {checkbox({
                      name: "automatedBookkeeping_ReportCoversCorrectAccountingPeriod",
                      label: t("organizer.business.step11.label6"),
                      value:
                        data[
                          findIndexData(
                            "automatedBookkeeping_ReportCoversCorrectAccountingPeriod",
                            data,
                          )
                        ].answer,
                    })}
                    {checkbox({
                      name: "automatedBookkeeping_ReportsAreTheSameBasisAsAccountingMethod",
                      label: t("organizer.business.step11.label7"),
                      value:
                        data[
                          findIndexData(
                            "automatedBookkeeping_ReportsAreTheSameBasisAsAccountingMethod",
                            data,
                          )
                        ].answer,
                    })}
                  </div>
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

export default Step11;
