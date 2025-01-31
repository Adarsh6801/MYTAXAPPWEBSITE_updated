import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Input, Table, DatePicker } from "antd";
import moment from "moment";
import _ from "lodash";

import CircularDirection from "../../../../components/CircularDirection";
import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import Button from "../../../../components/Button";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../helpers/format";
import { disabledDateFuture } from "../../../../helpers/date";
import { ITaxPayerInfoStepsProps } from "../index.props";
import { IOrganizerStepTestProps } from "../../Individual/index.props";
import { Item } from "./index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import { ORGANIZER_CATEGORY_ID } from "../../../../constants/organizer";
import { dataTaxpayerQuestion, tableData, DATA_KEY } from "./index.constants";

import { ReactComponent as Calendar } from "../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const Step12 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [tableCount, setTableCount] = useState<number>(3);
  const [originData, setOriginData] = useState<Item[]>(tableData);
  const [data, setData] = useState<IOrganizerStepTestProps[]>(
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
        const tableData: any = JSON.parse(
          stepData[
            findIndexData("businessAssetSalesAndDisposition", resultData)
          ].answer,
        );

        JSON.parse(tableData.data).forEach((item: any) => {
          form.setFieldsValue({
            [`description${item.key}`]: item["description"],
            [`datePurchased${item.key}`]:
              item["datePurchased"] === null || item["datePurchased"] === ""
                ? null
                : moment(item["datePurchased"]),
            [`cost${item.key}`]: item["cost"],
          });
        });

        setOriginData(JSON.parse(tableData.data));
        setTableCount(tableData.length);
        setData(resultData);
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
      title: t("organizer.business.step12.filed_name1"),
      dataIndex: "description",
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Form.Item name={`description${record.key}`} style={{ margin: 0 }}>
            <Input defaultValue={record.description.toString()} />
          </Form.Item>
        );
      },
    },
    {
      title: t("organizer.business.step12.filed_name2"),
      editable: true,
      dataIndex: "datePurchased",
      render: (_: any, record: any) => (
        <Form.Item name={`datePurchased${record.key}`} style={{ margin: 0 }}>
          <DatePicker
            suffixIcon={<Calendar />}
            placeholder="Date"
            value={record.datePurchased ? moment(record.datePurchased) : null}
            disabledDate={disabledDateFuture}
          />
        </Form.Item>
      ),
    },
    {
      title: t("organizer.business.step12.filed_name3"),
      editable: true,
      dataIndex: "cost",
      render: (_: any, record: any) => (
        <Form.Item name={`cost${record.key}`} style={{ margin: 0 }}>
          <Input defaultValue={record.cost.toString()} />
        </Form.Item>
      ),
    },
  ];

  const onFinish = async () => {
    onStepSubmit([...data]);

    const newValue = [
      {
        ...data[0],
        answer: JSON.stringify({
          data: JSON.stringify(originData),
          columns: JSON.stringify(columns),
        }),
      },
    ];

    await dispatch(setIndividualOrganizer(newValue));
    nextStep();
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    if (name === "businessAssetSalesAndDisposition") {
      const newData = [...data];
      const index: number = findIndexData(name, newData);
      newData[index] = {
        ...data[index],
        question: data[index].question,
        answer: value[name],
        file: newData[index].isFile ? value[name] : null,
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
    const originalData = [...data];
    const newData = [...originData];
    newData.splice(-1);
    originalData.splice(-1);
    setOriginData([...newData]);
    setData(originalData);
    setTableCount(tableCount - 1);
  };

  const handleAdd = () => {
    const newData = [...originData];
    newData.push({
      key: `${tableCount + 1}`,
      description: "",
      datePurchased: "",
      cost: "",
    });

    const addItemElement = [
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `description${tableCount + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        file: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `datePurchased${tableCount + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        file: null,
      },
      {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
        forSpouse: false,
        question: `cost${tableCount + 1}`,
        answer: null,
        message: "",
        reminder: false,
        isFile: false,
        file: null,
      },
    ];

    setData([...data, ...addItemElement]);
    setOriginData([...newData]);
    setTableCount(tableCount + 1);
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
    >
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
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default Step12;
