import { Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import Button from "../../../../../../components/Button";
import CircularDirection from "../../../../../../components/CircularDirection";
import {
  setIndividualOrganizer,
  getTaxpayerIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../../redux/conversationSlice";
import { IQuestionContainer } from "./index.props";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { IRS_LINK } from "../../../../../../constants/settings";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../../helpers/format";
import { radio, upload, select } from "../../../../../../components/Module";
import {
  dataTaxpayerQuestion,
  DATA_KEY,
  radioButtons,
} from "./index.constants";
import TT from "../../../../../../documents/1099INT.pdf";

import styles from "./index.module.css";

const noop = () => {};

const OrganizerIndividualYesFlowStep1 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, goTo = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [fieldName, setFiledName] = useState("");
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );
  const objectURL = new Blob([TT], { type: "pdf" });
  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );
  const currentYear: number = new Date().getFullYear();

  // Generate an array of previous years (exclude the current year)
  const previousYears: number[] = Array.from(
    { length: currentYear - 2019 },
    (_, index: number): number => currentYear - index ,
  );
  
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    restField(fieldName);
  }, [fieldName]);

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
            [item.question]: item.answer === "null" ? null : item.answer,
          });
        }
      });
      const previousYear= resultData[findIndexData('taxFillingYear',resultData)].answer
      const prevTaxYearIndex= findIndexData('previousTaxYear',resultData)
    // Filter previous years to be less than the selected tax filing year
    let filteredPreviousYears = previousYears.filter(
      (year) => year < previousYear
    )
    if (previousYear === 2020 && filteredPreviousYears.length === 0) {
      filteredPreviousYears = [2019,2018,2017,2016];
    }

    resultData[prevTaxYearIndex].options = filteredPreviousYears.map((year) => ({
      label: year.toString(),
      value: year,
    }));
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
    try {
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      if (value.hasOwnProperty("previousTaxReturnFileUpload")) {
        goTo(1);
      } else {
        goTo(4);
      }
    } catch (e) {
      // TODO: handle catch error
    }
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
    form.resetFields(resetName);
    setData(newObject);
  };

const onValuesChange = (value: any) => {
  const [name] = Object.keys(value);
  const index: number = findIndexData(name, data);
  const newData = [...data];

  newData[index] = {
    ...data[index],
    answer: value[name],
    message: "",
    reminder: false,
    isFile: data[index].isFile,
    files: data[index].isFile ? value[name].fileList : null,
  };

  // If taxFillingYear is changed, filter previousTaxYear options
  if (name === "taxFillingYear") {
    const selectedYear = value[name];

    // Filter previous years to be less than the selected tax filing year
    let filteredPreviousYears = previousYears.filter(
      (year) => year < selectedYear
    )
    if (selectedYear === 2020 && filteredPreviousYears.length === 0) {
      filteredPreviousYears = [2019,2018,2017,2016];
    }

    // Find index of previousTaxYear field in data
    const prevTaxYearIndex = findIndexData("previousTaxYear", newData);

    // Reset previousTaxYear if it is invalid
    if (newData[prevTaxYearIndex]?.answer >= selectedYear) {
      newData[prevTaxYearIndex].answer = null;
      form.setFieldValue("previousTaxYear", null);
    }

    // Update previousTaxYear options
    newData[prevTaxYearIndex].options = filteredPreviousYears.map((year) => ({
      label: year.toString(),
      value: year,
    }));
  }

  setData([...newData]);
};


  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children, required } = dataQuestion;
    const index: number = findIndexData(key, data);
    console.log(required, "required on the question");

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
        className={styles.container}
        required={required}
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

{
        questionContainer({
          question: t("organizer.individual.yes_flow.step1.question_8"),
          key: "taxFillingYear",
          children: select({
            name: "taxFillingYear",
            placeholder: "Select Tax Filing Year",
            data: previousYears.map((year: number) => ({
              label: year.toString(),
              value: year,
            })),
            required: true,
            message: "Select Tax Filing Year.",
          }),
          required: true,
        })}
      {questionContainer({
        question: t("organizer.individual.yes_flow.step1.question_1"),
        key: "hasFiledTaxReturnPreviously",
        required: true,
        children: radio({
          name: "hasFiledTaxReturnPreviously",
          radioButtons: radioButtons,
          required: true,
          message: "Select Yes/No.",
        }),
      })}
      {data[findIndexData("hasFiledTaxReturnPreviously", data)].answer &&
questionContainer({
  question: t("organizer.individual.yes_flow.step1.question_7"),
  key: "previousTaxYear",
  children: select({
    name: "previousTaxYear",
    placeholder: "Select Year",
    data: data[findIndexData("previousTaxYear", data)].options || [],
    required: true,
    message: "Select Previous Tax Year.",
  }),
  required: true,
})}
      {data[findIndexData("hasFiledTaxReturnPreviously", data)].answer &&
        questionContainer({
          question: t("organizer.individual.yes_flow.step1.question_2"),
          key: "hasDigitalCopyInPdfFormat",
          required: true,
          children: radio({
            name: "hasDigitalCopyInPdfFormat",
            radioButtons: radioButtons,
            required: true,
            message: "Select Yes/No.",
          }),
        })}

      {data[findIndexData("hasDigitalCopyInPdfFormat", data)].answer !== null
        ? data[findIndexData("hasDigitalCopyInPdfFormat", data)].answer
          ? questionContainer({
              question: t("organizer.individual.yes_flow.step1.question_3"),
              key: "previousTaxReturnFileUpload",
              required: true,
              children: upload({
                key: "previousTaxReturnFileUpload",

                label: t(
                  "organizer.individual.yes_flow.step1.upload_file_label",
                ),
                buttonText: t("organizer.individual.yes_flow.step1.attach"),
                data,
                dispatch: dispatch,
                onClick: (index = 0) => {
                  dispatch(
                    downloadFile(
                      data[findIndexData("previousTaxReturnFileUpload", data)]
                        .files[index].id,
                      data[findIndexData("previousTaxReturnFileUpload", data)]
                        .files[index].name,
                    ),
                  );
                },
                onRemove: (index = 0) => {
                  const newData = [...data];
                  const indexToRemove = index;
                  const dataIndex = findIndexData(
                    "previousTaxReturnFileUpload",
                    data,
                  );

                  // Get the file UID being removed
                  const removedFileUid =
                    data[dataIndex].answer.fileList[indexToRemove]?.uid;

                  // Remove from files array
                  const newFileList = [
                    ...data[dataIndex].files.slice(0, indexToRemove),
                    ...data[dataIndex].files.slice(indexToRemove + 1),
                  ];

                  // Remove from answer.fileList array
                  const newAnswerFileList = [
                    ...data[dataIndex].answer.fileList.slice(0, indexToRemove),
                    ...data[dataIndex].answer.fileList.slice(indexToRemove + 1),
                  ];

                  // Remove answer.file if it matches the removed file
                  if (data[dataIndex].answer.file?.uid === removedFileUid) {
                    newData[dataIndex].answer.file = null; // Or delete newData[dataIndex].answer.file;
                  }

                  // Update the data object
                  newData[dataIndex].files = newFileList;
                  newData[dataIndex].answer.fileList = newAnswerFileList;

                  setData([...newData]);
                },
                allowedFileTypes: ["application/pdf"],
                required: true,
                maxCount: 3,
                minCount:1
              }),
            })
          : questionContainer({
              question: t("organizer.individual.yes_flow.step1.question_4"),
              key: "canRequestPdfCopyForPreviousPreparer",
              required: true,
              children: radio({
                name: "canRequestPdfCopyForPreviousPreparer",
                radioButtons: radioButtons,
                required: true,
                message: "Select Yes/No.",
              }),
            })
        : null}
      {data[findIndexData("canRequestPdfCopyForPreviousPreparer", data)]
        .answer !== null &&
        questionContainer({
          question: t("organizer.individual.yes_flow.step1.question_5"),
          key: "hasHardCopyOfTaxReturn",
          required: true,
          children: radio({
            name: "hasHardCopyOfTaxReturn",
            radioButtons: radioButtons,
            required: true,
            message: "Select Yes/No",
          }),
        })}
      {data[findIndexData("hasHardCopyOfTaxReturn", data)].answer !== null ? (
        data[findIndexData("hasHardCopyOfTaxReturn", data)].answer ? (
          questionContainer({
            question: t("organizer.individual.yes_flow.step1.question_6"),
            key: "canScanTaxReturnIntoPdfFormat",
            required: true,
            children: radio({
              name: "canScanTaxReturnIntoPdfFormat",
              radioButtons: radioButtons,
              required: true,
              message: "Select Yes/No",
            }),
          })
        ) : (
          <div>
            <Button
              type="ghost"
              text={t("organizer.individual.yes_flow.step1.btn_irs")}
              style={{
                borderColor: "#0032da",
                color: "#0032da",
                paddingTop: 0,
                paddingBottom: 0,
              }}
              href={IRS_LINK}
              target={"_blank"}
              className={styles.button}
            />
          </div>
        )
      ) : null}
      {data[findIndexData("canScanTaxReturnIntoPdfFormat", data)].answer !==
      null ? (
        data[findIndexData("canScanTaxReturnIntoPdfFormat", data)].answer ? (
          questionContainer({
            question: t("organizer.individual.yes_flow.step1.question_3"),
            key: "previousTaxReturnFileUpload",
            children: upload({
              key: "previousTaxReturnFileUpload",
              required:true,
              label: t("organizer.individual.yes_flow.step1.upload_file_label"),
              buttonText: t("organizer.individual.yes_flow.step1.attach"),
              data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData("previousTaxReturnFileUpload", data)]
                      .files[index].id,
                    data[findIndexData("previousTaxReturnFileUpload", data)]
                      .files[index].name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[
                    findIndexData("previousTaxReturnFileUpload", data)
                  ].files.slice(0, index),
                  ...data[
                    findIndexData("previousTaxReturnFileUpload", data)
                  ].files.slice(index + 1),
                ];
                newData[
                  findIndexData("previousTaxReturnFileUpload", data)
                ].files = newFileList;

                setData([...newData]);
              },
              minCount:1
            }),
            required: true,
          })
        ) : (
          <p className={styles.textInfo}>
            {t("organizer.individual.yes_flow.step1.info")}
          </p>
        )
      ) : null}
      <CircularDirection
        hasLeft={false}
        rightButton={{
          htmlType: "submit",
        }}
      />
    </Form>
  );
};

export default OrganizerIndividualYesFlowStep1;
