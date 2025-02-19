import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Table, Input, Form, DatePicker, Upload, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import Select from "../../../../../../components/Select";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { EditableCellProps, Item } from "./index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getClassNames,
  getCurrentType,
} from "../../../../../../helpers/format";
import { disabledDateFuture } from "../../../../../../helpers/date";
import { radio, upload } from "../../../../../../components/Module";
import {
  dataTaxpayerQuestion,
  columns,
  dataTabel,
  DATA_KEY,
  radioButtons,
} from "./index.constants";
import { DEFAULT_DATE_FORMAT } from "../../../../../../constants/format";
// import { ReactComponent as Attach } from "./../../../../../assets/svgs/attach.svg";
import { ReactComponent as Calendar } from "../../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";
import { downloadFile } from "../../../../../../redux/conversationSlice";

const noop = () => {};

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = (
    <Input
      defaultValue={record.federal.toString()}
      type={"number"}
      placeholder="3,500"
    />
  );

  if (inputType === "state") {
    inputNode = (
      <Input
        defaultValue={record.state.toString()}
        type={"number"}
        placeholder="3,500"
      />
    );
  }

  if (inputType === "datePaid") {
    inputNode = (
      <DatePicker
        suffixIcon={<Calendar />}
        placeholder="MM/DD/YYYY"
        defaultValue={
          record.datePaid === ""
            ? undefined
            : moment(
                moment(record.datePaid).format(DEFAULT_DATE_FORMAT).toString(),
                DEFAULT_DATE_FORMAT,
              )
        }
        disabledDate={disabledDateFuture}
        format={DEFAULT_DATE_FORMAT}
      />
    );
  }

  if (inputType == "attachement") {
    console.log("attachement success");

    inputNode = (
      <Upload
        accept={
          "image/png,image/jpeg,image/jpg,application/pdf,application/doc,application/xlsx,application/docx"
        }
        showUploadList={false}
      >
        <Button type="ghost" />
      </Upload>
    );
  }
  interface ValidationRule {
    required?: boolean;
    message: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
  }

  const rules: ValidationRule[] = [];
  if (title == "Federal") {
    rules.push({ required: true, message: `Enter Federal Estimate Payment` });
  } else if (title == "State") {
    rules.push({ required: true, message: `Enter State Estimate Payment` });
  } else if (title == "Date Paid") {
    rules.push({ required: true, message: `Enter ${title}` });
  } else {
    rules.push({ required: true, message: `Enter ${title}` });
  }

  if (inputType != "datePaid") {
    console.log(inputType, "inputType");

    rules.push({
      pattern: /^\d{1,11}$/,
      message: `${title} must be numeric and 11 numbers!`,
    });
    rules.push({
      min: 1,
      message: `${title} must be at least 1 character!`,
    });
    // rules.push({
    //   max: 11,
    //   message: `${title} must be at most 11 characters!`,
    // });
  }

  if (inputType === "datePaid") {
  }

  return (
    <td {...restProps}>
      {dataIndex !== "name" && record !== undefined ? (
        <Form.Item
          name={`${dataIndex}${record.key}`}
          style={{ margin: 0 }}
          rules={rules}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const OrganizerIndividualYesFlowStep4 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, prevStep = noop, goTo = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [originData, setOriginData] = useState(dataTabel);
  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );
  const [previousTaxYear, setpreviousTaxYear] = useState<any>("");
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (dataOrganizer) {
      console.log(dataOrganizer, "Data Organization");
      const questionKey = "previousTaxYear"; // The question you want to match

      // Find the object with the matching question
      const foundItem = dataOrganizer.find(
        (item: any) => item.question == questionKey,
      );
      console.log(foundItem, "Found Item");

      // Get the answer if found, otherwise default to an empty string
      setpreviousTaxYear(foundItem ? foundItem.answer : "");
      console.log(previousTaxYear, "Previous Tax Year");
    }
  }, [dataOrganizer]);
  useEffect(() => {
    if (dataOrganizer) {
      console.log();

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

      if (resultData.length >= DATA_KEY.length) {
        const tabledata = JSON.parse(stepData[1].answer);
        setData(resultData);
        form.setFieldsValue({
          didPayAnyEstimatedTaxesDuringTheYear:
            resultData[
              findIndexData("didPayAnyEstimatedTaxesDuringTheYear", resultData)
            ].answer,
        });

        let newdata = JSON.parse(tabledata.data);
        setOriginData(newdata);
        if (newdata.length > 0) {
          newdata.forEach((item: Item, i: number) => {
            console.log(item?.datePaid, "item?.datePaid");
            form.setFieldsValue({
              [`federal${item.key}`]: item?.federal || "",
              [`state${item.key}`]: item?.state || "",
              // [`datePaid${item.key}`]: item?.datePaid ? new Date(item?.datePaid) : null,
              [`datePaid${item.key}`]: item?.datePaid
                ? moment(
                    moment(item?.datePaid)
                      .format(DEFAULT_DATE_FORMAT)
                      .toString(),
                    DEFAULT_DATE_FORMAT,
                  )
                : null,
            });
          });
        }
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
  useEffect(() => {
    console.log(data, "DATAAAAAAAA");

    if (dataOrganizer && dataTabel) {
      console.log(dataOrganizer, "dataOrganizer__________");
      console.log(dataOrganizer, "Data Organization");

      const questionKey = "previousTaxYear"; // The question you want to match

      // Find the object with the matching question
      const foundItem = dataOrganizer.find(
        (item: any) => item.question === questionKey,
      );
      console.log(foundItem, "Found Item");

      // Get the answer if found, otherwise default to an empty string
      const prevTaxYear = foundItem ? foundItem.answer : "";

      // Ensure that prevTaxYear is not empty before proceeding
      if (!prevTaxYear) return;

      setpreviousTaxYear(prevTaxYear); // This is asynchronous!

      const nextYear = (parseInt(prevTaxYear, 10) + 1).toString();

      const updatedData = (dataTabel || []).map((item, index) => {
        const dates = [
          `April 15, ${prevTaxYear}`,
          `June 15, ${prevTaxYear}`,
          `Sept 15, ${prevTaxYear}`,
          `Jan 15, ${nextYear}`,
        ];
        return {
          ...item,
       
        };
      });

      setOriginData(updatedData);
    }
  }, [dataOrganizer, dataTabel]); // Dependency array ensures correct re-renders

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  const handleAddRow = () => {
    const newRow = {
      key: (originData.length + 1).toString(),
      name: "", // Add the missing `name` property
      dataKey: "", // Add the missing `dataKey` property
      federal: "",
      state: "",
      datePaid: "",
      attachement: "", // Add the missing `attachement` property
    };
    setOriginData([...originData, newRow]);
  };

  //handle delete
  const handleDeleteRow = (key: string) => {
    if (originData.length > 1) {
      const newData = originData.filter(item => item.key !== key);
      setOriginData(newData);
    } else {
      // Show a message or handle the case where at least one row is required
      console.log("At least one row is required");
    }
  };
  const restField = () => {
    console.log('restField...')
    const nextYear = (parseInt(previousTaxYear, 10) + 1).toString();

    const updatedData = [
      {
        key: "1",
        name: t("organizer.individual.yes_flow.step4.question1"),
        dataKey: "firstQuarter",
        federal: "",
        state: "",
        datePaid: "",
        attachement: "",
      },
      {
        key: "2",
        name: t("organizer.individual.yes_flow.step4.question2"),
        dataKey: "secondeQuarter",
        federal: "",
        state: "",
        datePaid: "",
        attachement: "",
      },
      {
        key: "3",
        name: t("organizer.individual.yes_flow.step4.question3"),
        dataKey: "thirdQuarter",
        federal: "",
        state: "",
        datePaid: "",
        attachement: "",
      },
      {
        key: "4",
        name: t("organizer.individual.yes_flow.step4.question4"),
        dataKey: "fourthQuarter",
        federal: "",
        state: "",
        datePaid: "",
        attachement: "",
      },
    ].map((item, index) => {
      const dates = [
        `April 15, ${previousTaxYear}`,
        `June 15, ${previousTaxYear}`,
        `Sept 15, ${previousTaxYear}`,
        `Jan 15, ${nextYear}`,
      ];
      return {
        ...item,
        name: `${item.name} (${dates[index] || ""})`, // Avoid out-of-bounds errors
      };
    });
    setOriginData(updatedData);

    form.resetFields(["estimatedTaxesPaidTableInfo",'doYouHaveOnlinePaymentConfirmation','onlinePaymentConfirmationAttachment']);
  };

  const onFinish = async (values: any) => {
    try {
      const newData = [...data];
      newData[1].answer = JSON.stringify({
        data: JSON.stringify(originData),
        columns: JSON.stringify(columns),
      });
      setData(newData);
      onStepSubmit(newData);
      await dispatch(setIndividualOrganizer(newData));
      goTo(9);
    } catch (e: any) {
      // ToDO: error modal
    }
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    if (name === "didPayAnyEstimatedTaxesDuringTheYear") {
      console.log('didPayAnyEstimatedTaxesDuringTheYear ',value)
      const newData = [...data];
      newData[0].answer = value[name];
      setData(newData);
      if(!newData[0].answer){
        data[findIndexData("doYouHaveOnlinePaymentConfirmation", data)].answer=null
        data[findIndexData("onlinePaymentConfirmationAttachment", data)].answer=null
        data[findIndexData("onlinePaymentConfirmationAttachment", data)].files=null


        restField()
      }
      return;
    }

    const columnIndex = +name[name.length - 1] - 1;
    const filedName = name.replace(/.$/, "");

    if(isNaN(columnIndex)) return
    const newOriginData = [...originData];
    newOriginData[columnIndex] = {
      ...newOriginData[columnIndex],
      [filedName]: value[name],
    };

    setOriginData(newOriginData);
  };

  const questionContainer = (dataQuestion: any) => {
    const { key, question, children, required } = dataQuestion;
    const index: number = +findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        data={data[index]}
        question={question}
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
  const handleFileUpload = (file: File) => {
    const newData = [...data];
    const fileIndex = findIndexData("onlinePaymentConfirmationAttachment", data);

    if (fileIndex !== undefined) {
      const newFileList = newData[fileIndex].files ? [...newData[fileIndex].files, file] : [file];
      newData[fileIndex].files = newFileList;
      newData[fileIndex].answer = newFileList;

      setData(newData);
    }
  };
  const handleFileRemove = (index: number) => {
    const newData = [...data];
    const fileIndex = findIndexData("onlinePaymentConfirmationAttachment", data);

    if (fileIndex !== undefined && newData[fileIndex]?.files) {
      const newFileList = [
        ...newData[fileIndex].files.slice(0, index),
        ...newData[fileIndex].files.slice(index + 1),
      ];
      newData[fileIndex].files = newFileList;
      setData(newData);
    }
  };
  return (
    <Form form={form} onValuesChange={onValuesChange} onFinish={onFinish} onError={(e)=>console.log("erwerewrw",e)}>
      <div>
        <p className={styles.text}>
          {
            <Trans
              i18nKey="organizer.individual.yes_flow.step4.description"
              values={{ note: "Note -" }}
              components={[<span className={styles.notesTitle}>text</span>]}
            />
          }
        </p>
        <p className={styles.text}>
          {
            <Trans
              i18nKey="organizer.individual.yes_flow.step4.description2"
              values={{ note: "⚠ Important: -" }}
              components={[<span className={styles.notesTitle}>text</span>]}
            />
          }
        </p>
        {questionContainer({
          key: "didPayAnyEstimatedTaxesDuringTheYear",
          question: t("organizer.individual.yes_flow.step4.radio_question1"),
          required: true,
          children: radio({
            name: "didPayAnyEstimatedTaxesDuringTheYear",
            radioButtons: radioButtons,
            required: true,
            message: "Select Yes/No",
            value:
              data[findIndexData("didPayAnyEstimatedTaxesDuringTheYear", data)]
                ?.answer === "true",
            onChange: ({ target: { value } }) => {
              const newData = [...data];
              newData[findIndexData("didPayAnyEstimatedTaxesDuringTheYear", data)].answer = value;
              setData(newData);
            },
          }),
        })}
        {data[findIndexData("didPayAnyEstimatedTaxesDuringTheYear", data)]
          .answer &&
          questionContainer({
            key: "doYouHaveOnlinePaymentConfirmation",
            question: t("organizer.individual.yes_flow.step4.radio_question2"),
            required: true,
            children: radio({
              name: "doYouHaveOnlinePaymentConfirmation",
              radioButtons: radioButtons,
              required: true,
              message: "Select Yes/No",
              value:
                data[findIndexData("doYouHaveOnlinePaymentConfirmation", data)]
                  ?.answer === "true",
              onChange: ({ target: { value } }) => {
                const newData = [...data];
                newData[findIndexData("doYouHaveOnlinePaymentConfirmation", data)].answer = value;
                setData(newData);
              },
            }),
          })}
        {data[findIndexData("doYouHaveOnlinePaymentConfirmation", data)]
          .answer &&
          questionContainer({
            key: "onlinePaymentConfirmationAttachment",
            question: t(
              "organizer.individual.yes_flow.step4.radio_question3",
            ),
            required: true,
            children: upload({
              key: "onlinePaymentConfirmationAttachment",
              data: data,
              required: true,
              allowedFileTypes: ["application/pdf", "image/jpeg"],
              buttonText: t("organizer.individual.yes_flow.step3.attach"),
              dispatch: dispatch,
              minCount: 1,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[
                      findIndexData("onlinePaymentConfirmationAttachment", data)
                    ].files[index].id,
                    data[
                      findIndexData("onlinePaymentConfirmationAttachment", data)
                    ].files[index].name,
                  ),
                );
              },
              onRemove: handleFileRemove,
              onChange: (info: any) => {
                if (info.file.status === 'done') {
                  handleFileUpload(info.file.originFileObj);
                }
              },
              maxCount: 2,
            }),
          })}
      </div>
      {!data[findIndexData("doYouHaveOnlinePaymentConfirmation", data)]
        .answer === true && data[findIndexData("didPayAnyEstimatedTaxesDuringTheYear", data)]
        .answer === true &&
        questionContainer({
          key: "estimatedTaxesPaidTableInfo",
          children: (
            <><Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={originData}
              columns={mergedColumns}
              pagination={false}
              scroll={{ x: 1070 }}
              style={{ width: "50vw" }} /><Button onClick={handleAddRow} style={{ marginTop: 16 }}>
                Add Row
              </Button></>
          ),
        })}
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default OrganizerIndividualYesFlowStep4;
