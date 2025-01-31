import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Table, Input, Form } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import Button from "../../../../../../components/Button";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { IQuestionContainer, Item } from "./index.props";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../../helpers/format";
import {
  dataTaxpayerQuestion,
  tableData,
  DATA_KEY,
  radioButtons,
} from "./index.constants";
import { IRS_LINK } from "../../../../../../constants/settings";
import { ORGANIZER_CATEGORY_ID } from "../../../../../../constants/organizer";
import { checkbox, input, radio } from "../../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import { QUESTION_TYPE_ANSWER } from "../../../../../../constants/organizer";

import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep7 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, prevStep = noop, goTo = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();

  const [tableCount, setTableCount] = useState<number>(2);
  const [originData, setOriginData] = useState<Item[]>(tableData);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );
  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

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
        const tableData: any = JSON.parse(stepData[3].answer);
        setData(resultData);
        setOriginData(JSON.parse(tableData.data));
        setTableCount(JSON.parse(tableData.data).length - 1);
      }
    }
  }, [dataOrganizer]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  const columns = [
    {
      title: t("organizer.individual.general_steps.step8.paid_to"),
      dataIndex: "paidTo",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`paidTo${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.paidTo.toString()} />
          </Form.Item>
        );
      },
    },
    {
      title: t("organizer.individual.general_steps.step8.address"),
      dataIndex: "address",
      editable: true,
      render: (_: any, record: any) => (
        <Form.Item name={`address${record.key}`} style={{ margin: 0 }}>
          <Input defaultValue={record.address.toString()} />
        </Form.Item>
      ),
    },
    {
      title: t("organizer.individual.general_steps.step8.phone_number"),
      dataIndex: "phoneNumber",
      editable: true,
      render: (_: any, record: any) => (
        <Form.Item name={`phoneNumber${record.key}`} style={{ margin: 0 }}>
          <Input defaultValue={record.phoneNumber.toString()} />
        </Form.Item>
      ),
    },
    {
      title: t(
        "organizer.individual.general_steps.step8.provider_ssn_employer",
      ),
      dataIndex: "providerEmployerID",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item
            name={`providerEmployerID${record.key}`}
            style={{ margin: 0 }}
          >
            <Input defaultValue={record.providerEmployerID.toString()} />
          </Form.Item>
        );
      },
    },
    {
      title: "Payments MUST BE Allocated by:",
      children: [
        {
          title: t("organizer.individual.general_steps.step8.child_1"),
          dataIndex: "child1",
          editable: true,
          render: (_: any, record: any) => {
            return (
              <Form.Item name={`child1${record.key}`} style={{ margin: 0 }}>
                <Input defaultValue={record.child1.toString()} />
              </Form.Item>
            );
          },
        },
        {
          title: t("organizer.individual.general_steps.step8.child_2"),
          dataIndex: "child2",
          editable: true,
          render: (_: any, record: any) => {
            return (
              <Form.Item name={`child2${record.key}`} style={{ margin: 0 }}>
                <Input defaultValue={record.child2.toString()} />
              </Form.Item>
            );
          },
        },
        {
          title: t("organizer.individual.general_steps.step8.child_3"),
          dataIndex: "child3",
          editable: true,
          render: (_: any, record: any) => {
            return (
              <Form.Item name={`child3${record.key}`} style={{ margin: 0 }}>
                <Input defaultValue={record.child2.toString()} />
              </Form.Item>
            );
          },
        },
      ],
    },
  ];

  const onFinish = async (values: any) => {
    try {
      const newData = [...data];
      newData[3].answer = JSON.stringify({
        data: JSON.stringify(originData),
        columns: JSON.stringify(columns),
      });
      const filterData = newData.filter(el => !el.question.includes("table"));
      setData(newData);
      onStepSubmit(newData);
      await dispatch(setIndividualOrganizer(filterData));
      goTo(14);
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);

    if (
      name === "doesEmployerProvidesDependentCareServices" ||
      name === "hasChildOrDependentCareExpenses" ||
      name === "numberOfDependentChildrenUnderThirteen"
    ) {
      const newData = [...data];
      const index: number = findIndexData(name, newData);
      newData[index] = {
        ...data[index],
        question: data[index].question,
        answer: value[name],
        files: newData[index].isFile ? value[name] : null,
      };
      setData(newData);
    } else {
      const newData = [...originData];
      const columnIndex = +name[name.length - 1] - 1;
      const filedName = name.replace(/.$/, "");
      newData[columnIndex] = {
        ...newData[columnIndex],
        [filedName]: value[name],
      };

      setOriginData(newData);
    }
  };

  const handleRemove = () => {
    const newData = [...originData];
    newData.splice(-1);
    setOriginData([...newData]);
    setTableCount(tableCount - 1);
  };

  const handleAdd = () => {
    const newData = [...originData];
    newData.push({
      key: `${tableCount + 2}`,
      dataKey: "description",
      paidTo: "",
      address: "",
      phoneNumber: "",
      providerEmployerID: "",
      child1: "",
      child2: "",
      child3: "",
    });

    const addItemElement = [
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `paidTo${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `address${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `phoneNumber${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `providerEmployerID${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `child1${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `child2${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `child3${tableCount + 2}table`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        files: null,
      },
    ];

    setOriginData([...newData]);
    setData([...data, ...addItemElement]);
    setTableCount(tableCount + 1);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, style = false, children } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        question={question.toString()}
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
        className={styles.questionContainer}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
    >
      <div>
        <p className={styles.text}>
          {
            <Trans
              i18nKey="organizer.individual.general_steps.step8.description"
              values={{ note: "Note -" }}
              components={[<span className={styles.notesTitle}>text</span>]}
            />
          }
        </p>
        <Button
          text={t("organizer.individual.general_steps.step8.irs")}
          type={"ghost"}
          href={IRS_LINK}
          target={"_blank"}
          className={styles.btn}
        />
      </div>
      {questionContainer({
        key: "hasChildOrDependentCareExpenses",
        question: t("organizer.deductions.step9.question1"),
        children: radio({
          name: "hasChildOrDependentCareExpenses",
          radioButtons: radioButtons,
        }),
      })}
      {data[0].answer && (
        <>
          {questionContainer({
            key: "numberOfDependentChildrenUnderThirteen",
            question: t("organizer.individual.general_steps.step8.question2"),
            children: input({
              name: "numberOfDependentChildrenUnderThirteen",
              defaultValue:
                data[
                  findIndexData("numberOfDependentChildrenUnderThirteen", data)
                ].answer ?? 0,
            }),
          })}
          {questionContainer({
            key: "doesEmployerProvidesDependentCareServices",
            question: t("organizer.individual.general_steps.step8.label"),
            children: checkbox({
              name: "doesEmployerProvidesDependentCareServices",
              value:
                data[
                  findIndexData(
                    "doesEmployerProvidesDependentCareServices",
                    data,
                  )
                ].answer,
            }),
          })}
          <OrganizerQuestionCard
            data={data[0]}
            onAlert={() => {
              const newData = [...data];
              newData[0] = { ...data[0], reminder: !data[0].reminder };
              setData(newData);
            }}
            onMessage={(comment: string) => {
              const newData = [...data];
              newData[0] = { ...data[0], message: comment };
              setData(newData);
            }}
            className={styles.questionContainer}
            subClass={styles.subjectContainer}
          >
            <Table
              bordered
              dataSource={originData}
              columns={columns}
              pagination={false}
              scroll={{ x: 1070 }}
              style={{ width: "50vw" }}
              footer={() => {
                return (
                  <>
                    {" "}
                    <Button
                      type={"link"}
                      text={t("organizer.business.step12.add_row")}
                      onClick={handleAdd}
                    />
                    {tableCount > 2 && (
                      <Button
                        type={"link"}
                        text={t("organizer.business.step12.remove_row")}
                        onClick={handleRemove}
                      />
                    )}
                  </>
                );
              }}
            />
          </OrganizerQuestionCard>
        </>
      )}
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default GeneralStepsStep7;
