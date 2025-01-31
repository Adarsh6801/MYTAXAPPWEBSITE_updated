import { useEffect, useState } from "react";
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
  getClassNames,
} from "../../../../helpers/format";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../redux/conversationSlice";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { radio, upload } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step6 = (props: ITaxPayerInfoStepsProps) => {
  const {
    nextStep = noop,
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
  const [form] = Form.useForm();
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
      files: newData[index].isFile ? value[name].fileList : null,
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
      <div className={styles.marginBottom}>
        {questionContainer({
          key: "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
          question: t("organizer.business.step6.question1"),
          children: upload({
            key: "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[
                    findIndexData(
                      "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
                      data,
                    )
                  ].files[index].id,
                  data[
                    findIndexData(
                      "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
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
                    "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
                    data,
                  )
                ].files.slice(0, index),
                ...data[
                  findIndexData(
                    "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
                    data,
                  )
                ].files.slice(index + 1),
              ];
              newData[
                findIndexData(
                  "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
                  data,
                )
              ].files = newFileList;

              setData([...newData]);
            },
          }),
        })}
        {questionContainer({
          key: "additionalInfo_IncomeStatementForTheYear",
          question: t("organizer.business.step6.question2"),
          children: upload({
            key: "additionalInfo_IncomeStatementForTheYear",
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[
                    findIndexData(
                      "additionalInfo_IncomeStatementForTheYear",
                      data,
                    )
                  ].files[index].id,
                  data[
                    findIndexData(
                      "additionalInfo_IncomeStatementForTheYear",
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
                    "additionalInfo_IncomeStatementForTheYear",
                    data,
                  )
                ].files.slice(0, index),
                ...data[
                  findIndexData(
                    "additionalInfo_IncomeStatementForTheYear",
                    data,
                  )
                ].files.slice(index + 1),
              ];
              newData[
                findIndexData("additionalInfo_IncomeStatementForTheYear", data)
              ].files = newFileList;

              setData([...newData]);
            },
          }),
        })}
        {questionContainer({
          key: "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
          question: t("organizer.business.step6.question3"),
          children: upload({
            key: "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[
                    findIndexData(
                      "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
                      data,
                    )
                  ].files[index].id,
                  data[
                    findIndexData(
                      "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
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
                    "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
                    data,
                  )
                ].files.slice(0, index),
                ...data[
                  findIndexData(
                    "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
                    data,
                  )
                ].files.slice(index + 1),
              ];
              newData[
                findIndexData(
                  "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
                  data,
                )
              ].files = newFileList;

              setData([...newData]);
            },
          }),
        })}
        {questionContainer({
          key: "additionalInfo_If1099NECProvideFormW9AndAmounts",
          question: t("organizer.business.step6.question4"),
          children: upload({
            key: "additionalInfo_If1099NECProvideFormW9AndAmounts",
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[
                    findIndexData(
                      "additionalInfo_If1099NECProvideFormW9AndAmounts",
                      data,
                    )
                  ].files[index].id,
                  data[
                    findIndexData(
                      "additionalInfo_If1099NECProvideFormW9AndAmounts",
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
                    "additionalInfo_If1099NECProvideFormW9AndAmounts",
                    data,
                  )
                ].files.slice(0, index),
                ...data[
                  findIndexData(
                    "additionalInfo_If1099NECProvideFormW9AndAmounts",
                    data,
                  )
                ].files.slice(index + 1),
              ];
              newData[
                findIndexData(
                  "additionalInfo_If1099NECProvideFormW9AndAmounts",
                  data,
                )
              ].files = newFileList;

              setData([...newData]);
            },
          }),
        })}
        {questionContainer({
          key: "additionalInfo_IfWithdrawalsProvideDetails",
          question: t("organizer.business.step6.question5"),
          children: upload({
            key: "additionalInfo_IfWithdrawalsProvideDetails",
            data: data,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  data[
                    findIndexData(
                      "additionalInfo_IfWithdrawalsProvideDetails",
                      data,
                    )
                  ].files[index].id,
                  data[
                    findIndexData(
                      "additionalInfo_IfWithdrawalsProvideDetails",
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
                    "additionalInfo_IfWithdrawalsProvideDetails",
                    data,
                  )
                ].files.slice(0, index),
                ...data[
                  findIndexData(
                    "additionalInfo_IfWithdrawalsProvideDetails",
                    data,
                  )
                ].files.slice(index + 1),
              ];
              newData[
                findIndexData(
                  "additionalInfo_IfWithdrawalsProvideDetails",
                  data,
                )
              ].files = newFileList;

              setData([...newData]);
            },
          }),
        })}

        {questionContainer({
          key: "additionalInfo_AreAnyOfThePartnersResidentsOfDifferentState",
          question: t("organizer.business.step6.question6"),
          children: (
            <>
              {radio({
                name: "additionalInfo_AreAnyOfThePartnersResidentsOfDifferentState",
                radioButtons: radioButtons,
              })}
              {data[
                findIndexData(
                  "additionalInfo_AreAnyOfThePartnersResidentsOfDifferentState",
                  data,
                )
              ].answer &&
                upload({
                  key: "additionalInfo_PartnersResidentsOfDifferentStateDetails",
                  data: data,
                  dispatch: dispatch,
                  onClick: (index = 0) => {
                    dispatch(
                      downloadFile(
                        data[
                          findIndexData(
                            "additionalInfo_PartnersResidentsOfDifferentStateDetails",
                            data,
                          )
                        ].files[index].id,
                        data[
                          findIndexData(
                            "additionalInfo_PartnersResidentsOfDifferentStateDetails",
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
                          "additionalInfo_PartnersResidentsOfDifferentStateDetails",
                          data,
                        )
                      ].files.slice(0, index),
                      ...data[
                        findIndexData(
                          "additionalInfo_PartnersResidentsOfDifferentStateDetails",
                          data,
                        )
                      ].files.slice(index + 1),
                    ];
                    newData[
                      findIndexData(
                        "additionalInfo_PartnersResidentsOfDifferentStateDetails",
                        data,
                      )
                    ].files = newFileList;

                    setData([...newData]);
                  },
                })}
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

export default Step6;
