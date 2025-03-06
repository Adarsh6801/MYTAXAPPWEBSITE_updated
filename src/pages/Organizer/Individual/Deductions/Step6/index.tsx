import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Checkbox } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import RadioGroup from "../../../../../components/RadioGroup";
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
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";
import { QUESTION_TYPE_ANSWER } from "../../../../../constants/organizer";

const noop = () => {};

const Step6 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
  const [showSpouse, setShowSpouse] = useState(false);
  const [form] = Form.useForm();
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
      const stepData = dataOrganizer.filter((el: any) => {
        return !!DATA_KEY.find(item => {
          return el.question.includes(item);
        });
      });

      const currentType = stepData.map((el: any) => {
        return getCurrentType(el);
      });

      if (currentType.length > 0) {
        const resultData = addQuoteIdOrganizer(currentType, Number(quoteId));

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
      if (data[0].answer) {
        goTo(30);
        return;
      }
      goTo(31);
    } catch (e) {
      // TODO: handle catch error
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
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);
    const newData = [...data];

    newData[index] = {
      ...data[index],
      question: data[index].question,
      answer: value[name],
      answerTypeId: QUESTION_TYPE_ANSWER.boolean,
      message: "",
      reminder: false,
      isFile: false,
      files: newData[index].isFile ? value[name] : null,
    };

    setData([...newData]);
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
          key: "taxPayer_MedicalExpenses_InsurancePremiums_2ndPage",
          question: t("organizer.deductions.step6.question"),
          children: radio({
            name: "taxPayer_MedicalExpenses_InsurancePremiums_2ndPage",
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
            ? t("organizer.deductions.step6.remove_spouse")
            : t("organizer.deductions.step6.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {questionContainer({
              key: "spouse_MedicalExpenses_InsurancePremiums_2ndPage",
              question: t("organizer.deductions.step6.question"),
              children: radio({
                name: "spouse_MedicalExpenses_InsurancePremiums_2ndPage",
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

export default Step6;
