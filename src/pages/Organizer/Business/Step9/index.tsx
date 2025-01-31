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
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { radio } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step9 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
    onStepSubmit(data);
    await dispatch(setIndividualOrganizer(data));
    nextStep();
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
        childrenClassName={styles.context}
        className={styles.container}
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
        {DATA_KEY.map((el, index) => {
          if (
            el ===
            "corporations_DidTheBusinessReceivePaycheckProtectionProgramLoan_Details"
          )
            return;
          if (
            el ===
            "corporations_IsSubsidiaryInAffiliatedOrParentSubsidiaryControlledGroup"
          ) {
            return questionContainer({
              key: "corporations_IsSubsidiaryInAffiliatedOrParentSubsidiaryControlledGroup",
              question: t("organizer.business.step9.question4"),
              children: (
                <>
                  {radio({
                    name: "corporations_IsSubsidiaryInAffiliatedOrParentSubsidiaryControlledGroup",
                    radioButtons: radioButtons,
                  })}
                  <Form.Item
                    name={
                      "corporations_IsSubsidiaryInAffiliatedOrParentSubsidiaryControlledGroup_Details"
                    }
                    label={t("organizer.business.step9.label1")}
                    className={styles.marginBR}
                  >
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                  </Form.Item>
                </>
              ),
            });
          } else if (
            el ===
            "corporations_DidTheBusinessReceivePaycheckProtectionProgramLoan"
          ) {
            return questionContainer({
              key: "corporations_DidTheBusinessReceivePaycheckProtectionProgramLoan",
              question: t("organizer.business.step9.question19"),
              children: (
                <>
                  {radio({
                    name: "corporations_DidTheBusinessReceivePaycheckProtectionProgramLoan",
                    radioButtons: radioButtons,
                  })}
                  <Form.Item
                    name={
                      "corporations_DidTheBusinessReceivePaycheckProtectionProgramLoan_Details"
                    }
                    label={t("organizer.business.step9.label2")}
                    className={styles.marginBR}
                  >
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                  </Form.Item>
                </>
              ),
            });
          }
          return questionContainer({
            key: el,
            question: t(`organizer.business.step9.question${index + 1}`),
            children: radio({
              name: el,
              radioButtons: radioButtons,
            }),
          });
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

export default Step9;
