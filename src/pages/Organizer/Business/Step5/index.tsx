import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Input, Table } from "antd";
import _ from "lodash";

import CircularDirection from "../../../../components/CircularDirection";
import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import Button from "../../../../components/Button";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../helpers/format";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { radio, upload } from "../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../redux/conversationSlice";
import {
  data as dataQuestion,
  radioButtons,
  questionData,
  DATA_KEY,
} from "./index.constants";

import styles from "./index.module.css";

const noop = () => {};

const Step5 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { onStepSubmit = noop, nextStep = noop, prevStep = noop } = props;

  const [tableCount, setTableCount] = useState<number>(1);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataQuestion, Number(quoteId)),
  );
  const [tableData, setTableData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(questionData, Number(quoteId)),
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
      if (resultData.length >= DATA_KEY.length) {
        const tableData: any = JSON.parse(
          stepData[findIndexData("pincipalShareholders", resultData)].answer,
        );

        resultData.length >= DATA_KEY.length &&
          JSON.parse(tableData.data).forEach((item: any) => {
            form.setFieldsValue({
              [`name${item.key}`]: item["name"],
              [`taxIDNumber${item.key}`]: item["taxIDNumber"],
              [`address${item.key}`]: item["address"],
              [`ownership${item.key}`]: item["ownership"],
            });
          });

        setTableCount(
          JSON.parse(tableData.data).length === 0
            ? 1
            : JSON.parse(tableData.data).length,
        );
        setData(JSON.parse(tableData.data));
        setTableData(resultData);
      }
    }
  }, [dataOrganizer]);

  const columnsTable1 = [
    {
      title: t("organizer.business.step5.label1"),
      dataIndex: "name",
      width: "35%",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`name${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.name} />
          </Form.Item>
        );
      },
    },
    {
      title: t("organizer.business.step5.label2"),
      dataIndex: "taxIDNumber",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`taxIDNumber${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.taxIDNumber} />
          </Form.Item>
        );
      },
    },
    {
      title: t("organizer.business.step5.label3"),
      dataIndex: "address",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`address${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.address} />
          </Form.Item>
        );
      },
    },
    {
      title: t("organizer.business.step5.label4"),
      dataIndex: "ownership",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`ownership${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.ownership} />
          </Form.Item>
        );
      },
    },
  ];

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteid: Number(quoteId),
      }),
    );
  };

  const onFinish = async () => {
    try {
      const newData = [...tableData];
      newData[0].answer = JSON.stringify({
        data: JSON.stringify(data),
        columns: JSON.stringify(columnsTable1),
      });
      onStepSubmit(newData);
      await dispatch(setIndividualOrganizer(newData));

      nextStep();
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const handleRemove = () => {
    const newData = [...data];
    newData.splice(-1);
    setData(newData);
    setTableCount(tableCount - 1);
  };

  const handleAdd = () => {
    const newData: any = [...data];
    newData.push(
      ...[
        {
          quoteId: Number(quoteId),
          key: tableCount + 1,
          name: "",
          taxIDNumber: "",
          address: "",
          ownership: "",
        },
      ],
    );

    setData([...newData]);
    setTableCount(tableCount + 1);
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    if (
      name === "pincipalShareholders" ||
      name === "pincipalShareholders_ProvideDetailsFile" ||
      name ===
        "pincipalShareholders_HasPercentageOfOwnershipChangedWithinTheTaxYear"
    ) {
      const index: number = findIndexData(name, tableData);
      const newData = [...tableData];
      newData[index] = {
        ...tableData[index],
        question: tableData[index].question,
        answer: value[name],
        files: newData[index].isFile ? value[name].fileList : null,
      };

      setTableData(newData);
    } else {
      const newData = [...data];
      const columnIndex = +name[name.length - 1] - 1;
      const filedName = name.replace(/.$/, "");
      newData[columnIndex] = {
        ...newData[columnIndex],
        [filedName]: value[name],
      };

      setData(newData);
    }
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
        subClass={styles.subContainer}
        className={styles.questionContainer}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={onValuesChange}
        requiredMark={false}
        layout="vertical"
      >
        {questionContainer({
          key: "pincipalShareholders",
          children: (
            <Table
              bordered
              dataSource={data}
              columns={columnsTable1}
              pagination={false}
              scroll={{ x: 1000 }}
              style={{ width: "50vw", marginBottom: 30 }}
              footer={() => {
                return (
                  <>
                    {" "}
                    <Button
                      type={"link"}
                      text={t("organizer.business.step5.add_row")}
                      onClick={handleAdd}
                    />
                    {tableCount > 2 && (
                      <Button
                        type={"link"}
                        text={t("organizer.business.step5.remove_row")}
                        onClick={handleRemove}
                      />
                    )}
                  </>
                );
              }}
            />
          ),
        })}
        {questionContainer({
          key: "pincipalShareholders_HasPercentageOfOwnershipChangedWithinTheTaxYear",
          question: t("organizer.business.step5.question1"),
          children: radio({
            name: "pincipalShareholders_HasPercentageOfOwnershipChangedWithinTheTaxYear",
            radioButtons: radioButtons,
          }),
        })}
        {questionContainer({
          key: "pincipalShareholders_ProvideDetailsFile",
          question: t("organizer.business.step5.question2"),
          children: upload({
            key: "pincipalShareholders_ProvideDetailsFile",
            data: tableData,
            dispatch: dispatch,
            onClick: (index = 0) => {
              dispatch(
                downloadFile(
                  tableData[
                    findIndexData(
                      "pincipalShareholders_ProvideDetailsFile",
                      tableData,
                    )
                  ].files[index].id,
                  tableData[
                    findIndexData(
                      "pincipalShareholders_ProvideDetailsFile",
                      tableData,
                    )
                  ].files[index].name,
                ),
              );
            },
            onRemove: (index = 0) => {
              const newData = [...tableData];
              const newFileList = [
                ...tableData[
                  findIndexData(
                    "pincipalShareholders_ProvideDetailsFile",
                    tableData,
                  )
                ].files.slice(0, index),
                ...tableData[
                  findIndexData(
                    "pincipalShareholders_ProvideDetailsFile",
                    tableData,
                  )
                ].files.slice(index + 1),
              ];
              newData[
                findIndexData(
                  "pincipalShareholders_ProvideDetailsFile",
                  tableData,
                )
              ].files = newFileList;

              setData([...newData]);
            },
          }),
        })}

        <CircularDirection
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default Step5;
