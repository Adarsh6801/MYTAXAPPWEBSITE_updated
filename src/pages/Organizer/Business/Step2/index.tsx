import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Input } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../helpers/format";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import { data as initialData, DATA_KEY } from "./index.constants";
import { IOrganizerStepProps, ITaxPayerInfoStepsProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { input } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step2 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
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
      file: newData[index].isFile ? value[name] : null,
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
          key: "businessEntity_NameOfBusiness",
          children: input({
            name: "businessEntity_NameOfBusiness",
            label: t("organizer.business.step2.label1"),
          }),
        })}
        {questionContainer({
          key: "businessEntity_EmployerIdNumber",
          children: input({
            name: "businessEntity_EmployerIdNumber",
            label: t("organizer.business.step2.label2"),
          }),
        })}

        <p className={styles.subTitle}>
          {t("organizer.business.step2.sub_title1")}
        </p>
        {questionContainer({
          key: "businessEntity_Street",
          children: input({
            name: "businessEntity_Street",
            label: t("organizer.business.step2.label3"),
          }),
        })}

        {questionContainer({
          key: "businessEntity_City",
          children: (
            <div className={styles.inputContainer}>
              {input({
                name: "businessEntity_City",
                label: t("organizer.business.step2.label4"),
              })}
              {input({
                name: "businessEntity_ZipCode",
                label: t("organizer.business.step2.label5"),
              })}
            </div>
          ),
        })}

        {questionContainer({
          key: "businessEntity_State",
          children: input({
            name: "businessEntity_State",
            label: t("organizer.business.step2.label6"),
          }),
        })}

        <p className={styles.subTitle}>
          {t("organizer.business.step2.sub_title2")}
        </p>
        {questionContainer({
          key: "businessEntity_FullName",
          children: input({
            name: "businessEntity_FullName",
            label: t("organizer.business.step2.label7"),
          }),
        })}

        {questionContainer({
          key: "businessEntity_Email",
          children: input({
            name: "businessEntity_Email",
            label: t("organizer.business.step2.label8"),
          }),
        })}

        {questionContainer({
          key: "businessEntity_Phone",
          children: input({
            name: "businessEntity_Phone",
            label: t("organizer.business.step2.label9"),
          }),
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

export default Step2;
