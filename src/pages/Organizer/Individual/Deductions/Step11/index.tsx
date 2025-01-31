import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../helpers/format";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IQuestionContainer } from "./index.props";
import { radio } from "../../../../../components/Module";
import { setIndividualOrganizer } from "../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step11 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const [showSpouse, setShowSpouse] = useState(false);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
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

      resultData.length >= DATA_KEY.length && setData(resultData);
    }
  }, [dataOrganizer]);

  const onFinish = async () => {
    try {
      await dispatch(setIndividualOrganizer(data));
      onStepSubmit(data);
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
      files: newData[index].isFile ? value[name] : null,
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
      <div>
        {questionContainer({
          key: "taxPayerMonthlyMortgagePayments",
          question: t("organizer.deductions.step11.question1"),
          children: radio({
            name: "taxPayerMonthlyMortgagePayments",
            radioButtons: radioButtons,
          }),
        })}
      </div>
      <div>
        <Checkbox
          className={styles.marginBottom}
          onChange={() => {
            setShowSpouse(!showSpouse);
          }}
        >
          {showSpouse
            ? t("organizer.deductions.step11.remove_spouse")
            : t("organizer.deductions.step11.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {questionContainer({
              key: "spouseMonthlyMortgagePayments",
              question: t("organizer.deductions.step11.question1"),
              children: radio({
                name: "spouseMonthlyMortgagePayments",
                radioButtons: radioButtons,
              }),
            })}
          </div>
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
