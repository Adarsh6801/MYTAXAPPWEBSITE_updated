import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
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
import { data as initialData, DATA_KEY } from "./index.constants";
import { ORGANIZER_CATEGORY_ID } from "../../../../constants/organizer";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { input } from "../../../../components/Module";
import { IQuestionContainer } from "./index.props";
import { makeTaxPreparationJobStatusInForReview } from "../../../../redux/taxPreparationSlice";
import { TAXPAYER_TAX_PREPARATION } from "../../../../constants/routes";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step15 = (props: ITaxPayerInfoStepsProps) => {
  const { prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
  );
  const [countCostSold, setCountCostSold] = useState(1);

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
      console.log(
        getDynamicDataCount("expenses_Other_Description", resultData),
        "expenses_Other_Descriptionexpenses_Other_Descriptionexpenses_Other_Descriptionexpenses_Other_Description",
      );

      resultData.length >= DATA_KEY.length &&
        setCountCostSold(
          getDynamicDataCount("expenses_Other_Description", resultData),
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
    await dispatch(
      makeTaxPreparationJobStatusInForReview({
        quoteId: Number(quoteId),
      }),
    );
    navigate(TAXPAYER_TAX_PREPARATION);
  };

  const add = (
    isIncome: boolean,
    keyDescription: string,
    keyAmount: string,
  ) => {
    const count = countCostSold;
    const newData = [
      ...data,
      ...[
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold,
          question: `${keyDescription}${count + 1}`,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          file: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold,
          question: `${keyAmount}${count + 1}`,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          file: null,
        },
      ],
    ];
    setData(addQuoteIdOrganizer(newData, Number(quoteId)));

    setCountCostSold(count + 1);
  };

  const remove = (isIncome: boolean) => {
    const count = countCostSold;
    const removeStart: number = findIndexData(
      `expenses_Other_Description${count}`,
      data,
    );

    const newData = data.filter((item, index) => removeStart > index);
    setData(newData);
    setCountCostSold(count - 1);
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
        subClass={styles.subjectContainer}
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
      <p className={styles.description}>
        <Trans
          i18nKey="organizer.business.step15.description"
          values={{ note: "NOTE:" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <div className={styles.marginBottom}>
        {questionContainer({
          key: "expenses_Advertising",
          question: t("organizer.business.step15.question1"),
          children: input({ name: "expenses_Advertising" }),
        })}
        {questionContainer({
          key: "expenses_AutomobileExpenses",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question2"
              values={{ info: "\n  List details separately" }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_AutomobileExpenses" }),
        })}
        {questionContainer({
          key: "expenses_BadDebts",
          question: t("organizer.business.step15.question3"),
          children: input({ name: "expenses_BadDebts" }),
        })}
        {questionContainer({
          key: "expenses_BusinessMeals",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question4"
              values={{ info: "\n (100%)" }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_BusinessMeals" }),
        })}
        {questionContainer({
          key: "expenses_AmountOfTotalMealsNOTProvidedByRestaurants",
          question: t("organizer.business.step15.question5"),
          children: input({
            name: "expenses_AmountOfTotalMealsNOTProvidedByRestaurants",
          }),
        })}

        {questionContainer({
          key: "expenses_CommissionsAndFees",
          question: t("organizer.business.step15.question6"),
          children: input({ name: "expenses_CommissionsAndFees" }),
        })}

        {questionContainer({
          key: "expenses_ContractLabor",
          question: t("organizer.business.step15.question7"),
          children: input({ name: "expenses_ContractLabor" }),
        })}
        {questionContainer({
          key: "expenses_DuesAndPublications",
          question: t("organizer.business.step15.question8"),
          children: input({ name: "expenses_DuesAndPublications" }),
        })}

        {questionContainer({
          key: "expenses_EmployeeBenefitPlans",
          question: t("organizer.business.step15.question9"),
          children: input({ name: "expenses_EmployeeBenefitPlans" }),
        })}
        {questionContainer({
          key: "expenses_EmployeeHealthCarePlans",
          question: t("organizer.business.step15.question10"),
          children: input({ name: "expenses_EmployeeHealthCarePlans" }),
        })}
        {questionContainer({
          key: "expenses_Entertainment",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question11"
              values={{ info: "\n Not deductible for federal (100%)" }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_Entertainment" }),
        })}

        {questionContainer({
          key: "expenses_Equipment200OrLessPerItem",
          question: t("organizer.business.step15.question12"),
          children: input({ name: "expenses_Equipment200OrLessPerItem" }),
        })}

        {questionContainer({
          key: "expenses_Freight",
          question: t("organizer.business.step15.question14"),
          children: input({ name: "expenses_Freight" }),
        })}

        {questionContainer({
          key: "expenses_EquipmentMoreThan200PerItem",
          question: t("organizer.business.step15.question13"),
          children: input({ name: "expenses_EquipmentMoreThan200PerItem" }),
        })}

        {questionContainer({
          key: "expenses_Gifts",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question15"
              values={{ info: "\n Limited to $25 per person" }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_Gifts" }),
        })}
        {questionContainer({
          key: "expenses_Insurance",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question16"
              values={{ info: "\n Provide details of type and amount" }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_Insurance" }),
        })}

        {questionContainer({
          key: "expenses_InterestMortgage",
          question: t("organizer.business.step15.question17"),
          children: input({ name: "expenses_InterestMortgage" }),
        })}
        {questionContainer({
          key: "expenses_InterestOther",
          question: t("organizer.business.step15.question18"),
          children: input({ name: "expenses_InterestOther" }),
        })}
        {questionContainer({
          key: "expenses_InternetService",
          question: t("organizer.business.step15.question19"),
          children: input({ name: "expenses_InternetService" }),
        })}
        {questionContainer({
          key: "expenses_LeaseImprovements",
          question: t("organizer.business.step15.question20"),
          children: input({ name: "expenses_LeaseImprovements" }),
        })}
        {questionContainer({
          key: "expenses_LegalProfessional",
          question: t("organizer.business.step15.question21"),
          children: input({ name: "expenses_LegalProfessional" }),
        })}
        {questionContainer({
          key: "expenses_Licenses",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question22"
              values={{
                info: "\n  List multi-year licenses & \n  permits under “other”",
              }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_Licenses" }),
        })}
        {questionContainer({
          key: "expenses_OfficeExpense",
          question: t("organizer.business.step15.question23"),
          children: input({ name: "expenses_OfficeExpense" }),
        })}
        {questionContainer({
          key: "expenses_PensionPlanFees",
          question: t("organizer.business.step15.question24"),
          children: input({ name: "expenses_PensionPlanFees" }),
        })}
        {questionContainer({
          key: "expenses_RentEquipment",
          question: t("organizer.business.step15.question25"),
          children: input({ name: "expenses_RentEquipment" }),
        })}
        {questionContainer({
          key: "expenses_RentOther",
          question: t("organizer.business.step15.question26"),
          children: input({ name: "expenses_RentOther" }),
        })}
        {questionContainer({
          key: "expenses_Repairs",
          question: t("organizer.business.step15.question27"),
          children: input({ name: "expenses_Repairs" }),
        })}
        {questionContainer({
          key: "expenses_Supplies",
          question: t("organizer.business.step15.question28"),
          children: input({ name: "expenses_Supplies" }),
        })}
        {questionContainer({
          key: "expenses_TaxesPayroll",
          question: (
            <Trans
              i18nKey="organizer.business.step15.question29"
              values={{
                info: "\n Do not include amounts \n  withheld from employees",
              }}
              components={[<span className={styles.questionInfo}>text</span>]}
            />
          ),
          children: input({ name: "expenses_TaxesPayroll" }),
        })}
        {questionContainer({
          key: "expenses_TaxesSales",
          question: t("organizer.business.step15.question30"),
          children: input({ name: "expenses_TaxesSales" }),
        })}
        {questionContainer({
          key: "expenses_TaxesProperty",
          question: t("organizer.business.step15.question31"),
          children: input({ name: "expenses_TaxesProperty" }),
        })}
        {questionContainer({
          key: "expenses_Telephone",
          question: t("organizer.business.step15.question32"),
          children: input({ name: "expenses_Telephone" }),
        })}
        {/* {questionContainer({
          key: "expenses_Utilities",
          question: t("organizer.business.step15.question33"),
          children: input({ name: "expenses_Utilities" }),
        })} */}
        {_.times(countCostSold, index => {
          return (
            <div key={index}>
              {questionContainer({
                key: `expenses_Other_Description${index + 1}`,
                question: t("organizer.business.step15.label3"),
                children: (
                  <div className={styles.addFiledContainer}>
                    {input({
                      name: `expenses_Other_Description${index + 1}`,
                      label: t("organizer.business.step15.label1"),
                    })}
                    {input({
                      name: `expenses_Other_Amount${index + 1}`,
                      label: t("organizer.business.step15.label2"),
                    })}
                  </div>
                ),
              })}
              {countCostSold === index + 1 && countCostSold > 1 && (
                <Button
                  key={`button${index}`}
                  text={t(
                    "organizer.individual.general_steps.step2.remove_dependent",
                  )}
                  type="link"
                  onClick={() => remove(false)}
                />
              )}
            </div>
          );
        })}
        <Button
          text={t("organizer.business.step15.add_filed")}
          type="link"
          onClick={() =>
            add(false, "expenses_Other_Description", "expenses_Other_Amount")
          }
        />
      </div>
      <div className={styles.btnContainer}>
        <CircularDirection hasRight={false} onClickLeft={prevStep} />
        <Button
          type="primary"
          htmlType={"submit"}
          text="Done"
          size="middle"
          className={styles.btn}
        />
      </div>
    </Form>
  );
};

export default Step15;
