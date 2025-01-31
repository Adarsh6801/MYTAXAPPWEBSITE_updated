import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../../helpers/format";
import { radio } from "../../../../../../components/Module";
import {
  dataTaxpayerQuestion,
  radioButtons,
  radioButtonFillStatus,
  DATA_KEY,
} from "./index.constants";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { IQuestionContainer } from "./index.props";

import styles from "./index.module.css";

const noop = () => {};

const OrganizerIndividualNoFlowStep1 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, prevStep = noop, goTo = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();

  const [fieldName, setFiledName] = useState("");
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    fieldName == "wereYouLegallyMarriedLastDayOfTheYear" &&
      restField(fieldName);
  }, [fieldName]);

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

  const onFinish = async (value: any) => {
    try {
      onStepSubmit(value);
      await dispatch(setIndividualOrganizer(data));
      goTo(5);
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
      answer: value[name],
      message: "",
      reminder: false,
      isFile: false,
      files: null,
    };

    setData([...newData]);
    setFiledName(name);
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
        className={styles.questionCardContainer}
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
      {questionContainer({
        key: "wereYouLegallyMarriedLastDayOfTheYear",
        question: t("organizer.individual.no_flow.step1.question1"),
        children: radio({
          name: "wereYouLegallyMarriedLastDayOfTheYear",
          radioButtons: radioButtons,
          value: data[0].answer,
        }),
      })}
      {data[0].answer &&
        questionContainer({
          key: "filingStatus",
          question: t("organizer.individual.no_flow.step1.question2"),
          children: radio({
            name: "filingStatus",
            radioButtons: radioButtonFillStatus,
            value: data[1].answer,
          }),
        })}
      {data[1].answer === 3 && (
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            {t("organizer.individual.no_flow.step1.description")}
          </p>
        </div>
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

export default OrganizerIndividualNoFlowStep1;
