import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash";

import Button from "../../../../components/Button";
import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
  getDynamicDataCount,
} from "../../../../helpers/format";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import {
  data as initialData,
  DATA_KEY,
  radioButtons,
  STATIC_DATA,
} from "./index.constants";
import { ORGANIZER_CATEGORY_ID } from "../../../../constants/organizer";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { input, radio } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step7 = (props: ITaxPayerInfoStepsProps) => {
  const {
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
    nextStep = noop,
    state,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id: quoteId } = useParams();
  const [count, setCount] = useState(1);
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
      resultData.length >= DATA_KEY.length &&
        setCount(
          getDynamicDataCount(
            "additionalInfo_ListAnyOtherBusinessCreditMayQualifyFor",
            resultData,
          ),
        );
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
      if (
        dataOrganizer[
          findIndexData("businessEntity_CkeckOne_Corporation", dataOrganizer)
        ].answer === "1" ||
        dataOrganizer[
          findIndexData("businessEntity_CkeckOne_Corporation", dataOrganizer)
        ].answer === "2"
      ) {
        goTo(8);
        return;
      }
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
      answer: value[name],
      file: newData[index].isFile ? value[name] : null,
    };

    setData([...newData]);
  };

  const add = () => {
    const newData: any = [...data];
    newData.push({
      categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
      question: `additionalInfo_ListAnyOtherBusinessCreditMayQualifyFor${
        count + 1
      }`,
      answer: null,
      message: "",
      reminder: false,
      isFile: false,
      file: null,
    });

    setData(addQuoteIdOrganizer(newData, Number(quoteId)));
    setCount(count + 1);
  };

  const remove = () => {
    const removeStart: number = findIndexData(
      `additionalInfo_ListAnyOtherBusinessCreditMayQualifyFor${count}`,
      data,
    );

    const newData = data.filter((item, index) => removeStart > index);
    setData(newData);
    setCount(count - 1);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children } = dataQuestion;
    const index: number = findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        key={index}
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
        {STATIC_DATA.map((el, index) =>
          questionContainer({
            key: el,
            question: t(`organizer.business.step7.question${index + 1}`),
            children: radio({
              name: el,
              radioButtons: radioButtons,
            }),
          }),
        )}
        {questionContainer({
          key: "additionalInfo_ListAnyOtherBusinessCreditMayQualifyFor1",
          question: t("organizer.business.step7.question23"),
          children: (
            <>
              {_.times(count, (index: number) => (
                <div key={index}>
                  {input({
                    name: `additionalInfo_ListAnyOtherBusinessCreditMayQualifyFor${
                      index + 1
                    }`,
                    label: t("organizer.business.step7.label"),
                  })}
                  {count === index + 1 && count > 1 && (
                    <Button
                      key={`button${index}`}
                      text={t("organizer.business.step7.remove")}
                      type="link"
                      onClick={() => remove()}
                    />
                  )}
                </div>
              ))}
              <Button
                text={t("organizer.business.step7.add")}
                type="link"
                onClick={() => add()}
              />
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

export default Step7;
