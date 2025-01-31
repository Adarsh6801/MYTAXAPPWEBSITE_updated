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
import { input, radio } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step8 = (props: ITaxPayerInfoStepsProps) => {
  const { prevStep = noop, onStepSubmit = noop, goTo = noop } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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
    try {
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      goTo(9);
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
      onValuesChange={onValuesChange}
      requiredMark={false}
      layout="vertical"
    >
      <div className={styles.marginBottom}>
        {questionContainer({
          key: "partnership_WasAnyPartnerDisregardedEntity",
          question: t("organizer.business.step8.question1"),
          children: radio({
            name: "partnership_WasAnyPartnerDisregardedEntity",
            radioButtons: radioButtons,
          }),
        })}

        {questionContainer({
          key: "partnership_DidAnyForeignOrEntityTreatedAsAPartnership",
          question: t("organizer.business.step8.question2"),
          children: radio({
            name: "partnership_DidAnyForeignOrEntityTreatedAsAPartnership",
            radioButtons: radioButtons,
          }),
        })}

        {questionContainer({
          key: "partnership_DidOwnDirectly20OrMore",
          question: t("organizer.business.step8.question3"),
          children: radio({
            name: "partnership_DidOwnDirectly20OrMore",
            radioButtons: radioButtons,
          }),
        })}
        {questionContainer({
          key: "partnership_WasThereDistributionOfPropertyInterestBySale",
          question: t("organizer.business.step8.question4"),
          children: radio({
            name: "partnership_WasThereDistributionOfPropertyInterestBySale",
            radioButtons: radioButtons,
          }),
        })}
        {questionContainer({
          key: "partnership_IsPubliclyTradedPartnership",
          question: t("organizer.business.step8.question5"),
          children: radio({
            name: "partnership_IsPubliclyTradedPartnership",
            radioButtons: radioButtons,
          }),
        })}

        {questionContainer({
          key: "partnership_Representative_Name",
          question: t("organizer.business.step8.question5"),
          children: (
            <>
              {input({
                name: "partnership_Representative_Name",
                label: t("organizer.business.step8.label1"),
              })}
              {input({
                name: "partnership_Representative_TaxIdNumber",
                label: t("organizer.business.step8.label2"),
              })}
              {input({
                name: "partnership_Representative_Address",
                label: t("organizer.business.step8.label3"),
              })}
              {input({
                name: "partnership_Representative_Phone",
                label: t("organizer.business.step8.label4"),
              })}
            </>
          ),
        })}
        {questionContainer({
          key: "partnership_DidElectToDeferTheEmployers2020PayrollTaxTo2021And2022Years",
          question: t("organizer.business.step8.question6"),
          children: radio({
            name: "partnership_DidElectToDeferTheEmployers2020PayrollTaxTo2021And2022Years",
            radioButtons: radioButtons,
          }),
        })}
        {questionContainer({
          key: "partnership_WasTheOperationFullyOrPartiallyCurtailed",
          question: t("organizer.business.step8.question7"),
          children: radio({
            name: "partnership_WasTheOperationFullyOrPartiallyCurtailed",
            radioButtons: radioButtons,
          }),
        })}

        {questionContainer({
          key: "partnership_DidReceivePaycheckProtectionProgramLoan",
          question: t("organizer.business.step8.question8"),
          children: (
            <>
              {radio({
                name: "partnership_DidReceivePaycheckProtectionProgramLoan",
                radioButtons: radioButtons,
              })}
              <Form.Item
                name={
                  "partnership_DidReceivePaycheckProtectionProgramLoan_Details"
                }
                className={styles.marginBR}
              >
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
              </Form.Item>
            </>
          ),
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

export default Step8;
