import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Divider, Form } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import Button from "../../../../components/Button";
import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
  getDynamicDataCount,
} from "../../../../helpers/format";
import { ORGANIZER_CATEGORY_ID } from "../../../../constants/organizer";
import { data as initialData, DATA_KEY } from "./index.constants";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IQuestionContainer } from "./index.props";
import { input } from "../../../../components/Module";

import styles from "./index.module.css";

const noop = () => {};

const Step13 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [countIncome, setCountIncome] = useState(1);
  const [countCostSold, setCountCostSold] = useState(1);
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
        setCountIncome(getDynamicDataCount("income_Description", resultData));
      resultData.length >= DATA_KEY.length &&
        setCountCostSold(
          getDynamicDataCount("costOfGoodsSold_Description", resultData),
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
      files: newData[index].isFile ? value[name] : null,
    };

    setData([...newData]);
  };

  const add = (
    isIncome: boolean,
    keyDescription: string,
    keyAmount: string,
  ) => {
    const count = isIncome ? countIncome : countCostSold;
    const newData = [
      ...data,
      ...[
        {
          categoryId: ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold,
          question: `${keyDescription}${count + 1}`,
          answer: null,
          mwssage: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          categoryId: ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold,
          question: `${keyAmount}${count + 1}`,
          answer: null,
          mwssage: "",
          reminder: false,
          isFile: false,
          files: null,
        },
      ],
    ];
    setData(addQuoteIdOrganizer(newData, Number(quoteId)));

    isIncome ? setCountIncome(count + 1) : setCountCostSold(count + 1);
  };

  const remove = (isIncome: boolean, key: string) => {
    const count = isIncome ? countIncome : countCostSold;
    const removeStart: number = findIndexData(`${key}${count}`, data);

    const newData = data.filter((item, index) => removeStart > index);
    setData(newData);
    isIncome ? setCountIncome(count - 1) : setCountCostSold(count - 1);
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
        <p className={styles.title}>
          {t("organizer.business.step13.sub_title1")}
        </p>
        <Divider />
        {questionContainer({
          key: "income_GrossReceiptsAndSales",
          children: input({
            name: "income_GrossReceiptsAndSales",
            label: t("organizer.business.step13.label1"),
            defaultValue:
              data[findIndexData("income_GrossReceiptsAndSales", data)]
                .answer ?? "0",
          }),
        })}
        {questionContainer({
          key: "income_ReturnsAndAllowances",
          children: input({
            name: "income_ReturnsAndAllowances",
            label: t("organizer.business.step13.label2"),
            defaultValue:
              data[findIndexData("income_ReturnsAndAllowances", data)].answer ??
              "0",
          }),
        })}
        {questionContainer({
          key: "income_CostOfGoodsSold",
          children: input({
            name: "income_CostOfGoodsSold",
            label: t("organizer.business.step13.label3"),
            defaultValue:
              data[findIndexData("income_CostOfGoodsSold", data)].answer ?? "0",
          }),
        })}
        {questionContainer({
          key: "income_GrossProfit",
          children: input({
            name: "income_GrossProfit",
            label: t("organizer.business.step13.label4"),
            defaultValue:
              data[findIndexData("income_GrossProfit", data)].answer ?? "0",
          }),
        })}

        {_.times(countIncome, index => {
          return (
            <div key={`income${index + 1}`}>
              {questionContainer({
                key: `income_Description${index + 1}`,
                children: input({
                  name: `income_Description${index + 1}`,
                  label: t("organizer.business.step13.label9"),
                  defaultValue:
                    data[findIndexData(`income_Description${index + 1}`, data)]
                      .answer ?? "0",
                }),
              })}
              {questionContainer({
                key: `income_Amount${index + 1}`,
                children: input({
                  name: `income_Amount${index + 1}`,
                  label: t("organizer.business.step13.label10"),
                  defaultValue: data[
                    findIndexData(`income_Amount${index + 1}`, data)
                  ].answer
                    ? data[findIndexData(`income_Amount${index + 1}`, data)]
                        .answer
                    : "0",
                }),
              })}

              {countIncome === index + 1 && countIncome > 1 && (
                <Button
                  key={`button${index}`}
                  text={t(
                    "organizer.individual.general_steps.step2.remove_dependent",
                  )}
                  type="link"
                  onClick={() => remove(true, "income_Description")}
                />
              )}
            </div>
          );
        })}
        <Button
          text={t("organizer.business.step13.add_income")}
          type="link"
          onClick={() => add(true, "income_Description", "income_Amount")}
        />
        <p className={styles.title}>
          {t("organizer.business.step13.sub_title2")}
        </p>
        <Divider />
        {questionContainer({
          key: "costOfGoodsSold_InventoryAtBeginingOfYear",
          children: input({
            name: "costOfGoodsSold_InventoryAtBeginingOfYear",
            label: t("organizer.business.step13.label5"),
          }),
        })}

        {questionContainer({
          key: "costOfGoodsSold_Purchases",
          children: input({
            name: "costOfGoodsSold_Purchases",
            label: t("organizer.business.step13.label6"),
          }),
        })}

        {questionContainer({
          key: "costOfGoodsSold_CostOfLabor",
          children: input({
            name: "costOfGoodsSold_CostOfLabor",
            label: t("organizer.business.step13.label7"),
          }),
        })}

        {_.times(countCostSold, index => {
          return (
            <div key={`cost${index}`}>
              {questionContainer({
                key: `costOfGoodsSold_Description${index + 1}`,
                children: input({
                  name: `costOfGoodsSold_Description${index + 1}`,
                  label: t("organizer.business.step13.label9"),
                }),
              })}
              {questionContainer({
                key: `costOfGoodsSold_Amount${index + 1}`,
                children: input({
                  name: `costOfGoodsSold_Amount${index + 1}`,
                  label: t("organizer.business.step13.label10"),
                }),
              })}
              {countCostSold === index + 1 && countCostSold > 1 && (
                <Button
                  key={`button${index}`}
                  text={t(
                    "organizer.individual.general_steps.step2.remove_dependent",
                  )}
                  type="link"
                  onClick={() => remove(false, "costOfGoodsSold_Description")}
                />
              )}
            </div>
          );
        })}
        <Button
          text={t("organizer.business.step13.add_costs")}
          type="link"
          onClick={() =>
            add(false, "costOfGoodsSold_Description", "costOfGoodsSold_Amount")
          }
        />
        {questionContainer({
          key: "costOfGoodsSold_InventoryAtTheEndOfTheYear",
          children: input({
            name: "costOfGoodsSold_InventoryAtTheEndOfTheYear",
            label: t("organizer.business.step13.label8"),
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

export default Step13;
