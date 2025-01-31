import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash";
import moment from "moment";

import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../helpers/format";
import { disabledDateFuture } from "../../../../helpers/date";
import {
  dataPicker,
  input,
  radio,
  select,
  upload,
} from "../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import { ITaxPayerInfoStepsProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { IOrganizerStepProps } from "../../Individual/index.props";
import {
  data as initialData,
  radioButtons,
  methodAccounting,
  radioButtonsYesOrNo,
  DATA_KEY,
} from "./index.constants";
import { DEFAULT_DATE_FORMAT } from "../../../../constants/format";

import styles from "./index.module.css";
import { downloadFile } from "../../../../redux/conversationSlice";

const noop = () => {};

const Step3 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const { prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
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
      goTo(4);
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);

    const index: number = findIndexData(name, data);
    const newData = [...data];

    const result =
      name === "businessEntity_DateOfIncorporation" ||
      name === "businessEntity_DateElectionOfIncorporation" ||
      name === "businessEntity_DateElectionOfSCorporation" ||
      name === "businessEntity_StartDate"
        ? moment(
            value[name] === ""
              ? moment(undefined)
              : moment(
                  moment(value[name]).format(DEFAULT_DATE_FORMAT).toString(),
                  DEFAULT_DATE_FORMAT,
                ),
          )
        : value[name];

    newData[index] = {
      ...data[index],
      question: data[index].question,
      answer: result,
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
        subClass={getClassNames(styles.subContainer)}
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
          key: "businessEntity_CkeckOne_Corporation",
          question: t("organizer.business.step3.question1"),
          children: (
            <div>
              {radio({
                name: "businessEntity_CkeckOne_Corporation",
                radioButtons: radioButtons,
                direction: "vertical",
              })}
              {(data[0].answer === 1 || data[0].answer === 2) && (
                <>
                  {select({
                    name: "businessEntity_StateOfIncorporation",
                    data: radioButtons,
                    label: t("organizer.business.step3.label6"),
                  })}
                  {input({
                    name: "businessEntity_StateIdNumberOfIncorporation",
                    label: t("organizer.business.step3.label1"),
                  })}
                  {dataPicker({
                    name: "businessEntity_DateOfIncorporation",
                    label: t("organizer.business.step3.label7"),
                    defaultValue:
                      data[
                        findIndexData(
                          "businessEntity_DateOfIncorporation",
                          data,
                        )
                      ].answer,
                  })}
                  {dataPicker({
                    name: "businessEntity_DateElectionOfIncorporation",
                    label: t("organizer.business.step3.label8"),
                    defaultValue:
                      data[
                        findIndexData(
                          "businessEntity_DateElectionOfIncorporation",
                          data,
                        )
                      ].answer,
                  })}
                  {data[0].answer === 2 && (
                    <>
                      {questionContainer({
                        key: "businessEntity_DateElectionOfSCorporation",
                        question: t("organizer.business.step3.question3"),
                        children: (
                          <>
                            {radio({
                              name: "businessEntity_DateElectionOfSCorporation",
                              radioButtons: radioButtonsYesOrNo,
                            })}
                            {upload({
                              key: "businessEntity_SCorporationElectionLetterFile",
                              data: data,
                              dispatch: dispatch,
                              onClick: (index = 0) => {
                                dispatch(
                                  downloadFile(
                                    data[
                                      findIndexData(
                                        "businessEntity_SCorporationElectionLetterFile",
                                        data,
                                      )
                                    ].files[index].id,
                                    data[
                                      findIndexData(
                                        "businessEntity_SCorporationElectionLetterFile",
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
                                      "businessEntity_SCorporationElectionLetterFile",
                                      data,
                                    )
                                  ].files.slice(0, index),
                                  ...data[
                                    findIndexData(
                                      "businessEntity_SCorporationElectionLetterFile",
                                      data,
                                    )
                                  ].files.slice(index + 1),
                                ];
                                newData[
                                  findIndexData(
                                    "businessEntity_SCorporationElectionLetterFile",
                                    data,
                                  )
                                ].files = newFileList;

                                setData([...newData]);
                              },
                            })}
                          </>
                        ),
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          ),
        })}

        {questionContainer({
          key: "businessEntity_PrincipalBusinessActivity",
          children: input({
            name: "businessEntity_PrincipalBusinessActivity",
            label: t("organizer.business.step3.label1"),
          }),
        })}

        {questionContainer({
          key: "businessEntity_PrincipalProductOrService",
          children: input({
            name: "businessEntity_PrincipalProductOrService",
            label: t("organizer.business.step3.label2"),
          }),
        })}

        {questionContainer({
          key: "businessEntity_StartDate",
          children: (
            <div className={styles.dataInputContainer}>
              {dataPicker({
                name: "businessEntity_StartDate",
                label: t("organizer.business.step3.label3"),
                disabledDate: disabledDateFuture,
                defaultValue:
                  data[findIndexData("businessEntity_StartDate", data)].answer,
              })}
              {input({
                name: "businessEntity_BusinessCode",
                label: t("organizer.business.step3.label4"),
              })}
            </div>
          ),
        })}

        {questionContainer({
          key: "businessEntity_MethodOfAccounting",
          question: t("organizer.business.step3.question2"),
          children: (
            <>
              {radio({
                name: "businessEntity_MethodOfAccounting",
                radioButtons: methodAccounting,
                defaultValue:
                  data[findIndexData("businessEntity_MethodOfAccounting", data)]
                    .answer,
              })}
              {input({
                name: "businessEntity_MethodOfAccounting_Describe",
                label: t("organizer.business.step3.label5"),
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

export default Step3;
