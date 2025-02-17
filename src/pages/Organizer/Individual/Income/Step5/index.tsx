import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Checkbox, Form, Divider } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import Button from "../../../../../components/Button";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../helpers/format";
import { disabledDateFuture } from "../../../../../helpers/date";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../index.props";
import { IInputsName, IQuestionContainer } from "./index.props";
import { taxPayer, spouse, radioButtons, DATA_KEY } from "./index.constants";
import {
  checkbox,
  dataPicker,
  input,
  radio,
} from "../../../../../components/Module";

import { ReactComponent as Calendar } from "../../../../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const Step5 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const [showSpouse, setShowSpouse] = useState(false);
  const [taxPayerAccountType, setTaxPayerAccountType] = useState<
    IOrganizerStepProps[]
  >(addQuoteIdOrganizer(taxPayer, Number(quoteId)));

  const [spouseAccountType, setSpouseAccountType] = useState<
    IOrganizerStepProps[]
  >(addQuoteIdOrganizer(spouse, Number(quoteId)));
  const [data, setData] = useState<IOrganizerStepProps[]>([
    ...taxPayerAccountType,
    ...spouseAccountType,
  ]);

  const dataOrgnaizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  const init = async () => {
    await dispatch(
      getTaxpayerIndividualOrganizer({
        quoteId: Number(quoteId),
      }),
    );
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrgnaizer) {
      const stepData = dataOrgnaizer.filter((el: any) => {
        return !!DATA_KEY.find(item => {
          return el.question.includes(item);
        });
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
  }, [dataOrgnaizer]);

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

    const dataValues = name.includes("taxPayer")
      ? taxPayerAccountType
      : spouseAccountType;
    const index: number = findIndexData(name, dataValues);
    const newData = [...dataValues];

    newData[index] = {
      ...dataValues[index],
      question: dataValues[index].question,
      answer: value[name],
    };

    name.includes("taxPayer")
      ? setTaxPayerAccountType(newData)
      : setSpouseAccountType(newData);

    setData([
      ...newData,
      ...(name.includes("taxPayer") ? spouseAccountType : taxPayerAccountType),
    ]);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, children, subClass, required } = dataQuestion;
    const index: number = findIndexData(key, data);

    return (
      <OrganizerQuestionCard
        question={question}
        data={data[index]}
        required={required}
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
        className={styles.questionContainer}
        subClass={subClass}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  // const manyInput = (names: IInputsName[]) => {
  //   return (
  //     <>
  //       {names.map((item): any => input({ name: item.key, label: item.value }))}
  //     </>
  //   );
  // };

  const manyInput = (names: IInputsName[]) => {
    return (
      <>
        {names.map((item, index) =>
          input({
            name: item.key,
            label: item.value,
            key: index,
            pattern: item.pattern,
            required: item.required,
            placeholder: item.placeholder,
            message: item.message
          }),
        )}
      </>
    );
  };

  return (
    <div>
      <div>
        <p className={styles.description}>
          <Trans
            i18nKey="organizer.individual.income.step5.description1"
            values={{ note: "Note –" }}
            components={[<span className={styles.notesTitle}>text</span>]}
          />
        </p>
        <Button className={styles.btn} type={"ghost"} text={"IRS"} />
      </div>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={onValuesChange}
        requiredMark={false}
        layout="vertical"
      >
        <div className={styles.formContainer}>
          {questionContainer({
            key: "taxPayer_HaveHomeOfficeExpenses",
            question: t("organizer.individual.income.step5.question1"),
            required:true,
            children: radio({
              name: "taxPayer_HaveHomeOfficeExpenses",
              radioButtons: radioButtons,
            required:true,

            }),
          })}
          {(taxPayerAccountType[0].answer ||
            data[
              findIndexData(
                taxPayerAccountType[0].question,
                taxPayerAccountType,
              )
            ]?.answer) && (
            <>
              <Divider />
              {questionContainer({
                key: "taxPayerHomeOffice_HaveSelfEmployedBusiness",
                question: t("organizer.individual.income.step5.question2"),
                required: true,
                children: checkbox({
                  name: "taxPayerHomeOffice_HaveSelfEmployedBusiness",
                  value:
                    data[
                      findIndexData(
                        `taxPayerHomeOffice_HaveSelfEmployedBusiness`,
                        data,
                      )
                    ].answer,
                }),
              })}
              <Divider />
              {questionContainer({
                key: "taxPayerHomeOffice_DateOfUseBegan",
                question: t("organizer.individual.income.step5.question3"),
                required: true,
                children: dataPicker({
                  name: "taxPayerHomeOffice_DateOfUseBegan",
                  icon: <Calendar />,
                  required: true,
                  message:"Enter Date of use began",
                  disabledDate: disabledDateFuture,
                  defaultValue:
                    data[
                      findIndexData("taxPayerHomeOffice_DateOfUseBegan", data)
                    ].answer,
                }),
              })}
              <Divider />
              {questionContainer({
                key: "taxPayerHomeOffice_EntireHomeArea",
                question: t("organizer.individual.income.step5.question4"),
                subClass: styles.questionSubClass,
                children: manyInput([
                  {
                    key: "taxPayerHomeOffice_EntireHomeArea",
                    value: "Entire Home",
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,6}$/,
                      message: "Only numbers are allowed maximum length 6",
                    },
                    placeholder: "2,500",
                  },
                  {
                    key: "taxPayerHomeOffice_OfficeArea",
                    value: "Office Area",
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,6}$/,
                      message: "Only numbers are allowed maximum length 6",
                    },
                    placeholder: "1,250",
                  },
                  {
                    key: "taxPayerHomeOffice_BusinessStorage",
                    value: "BusinessStorage",
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,6}$/,
                      message: "Only numbers are allowed maximum length 6",
                    },
                    placeholder: "75",
                  },
                ]),
              })}
              <Divider />
              {questionContainer({
                key: "taxPayerHomeOfficeExpenses_TotalMaintenance",
                question: t("organizer.individual.income.step5.question6"),
                subClass: styles.questionSubClass,
                children: manyInput([
                  {
                    key: "taxPayerHomeOfficeExpenses_TotalRent",
                    value: t("organizer.individual.income.step5.label4"),
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,7}$/,
                      message: "Only numbers are allowed maximum length 7",
                    },
                    placeholder: "12,500",
                    message:" Enter Annual Insurance, 0 for none"
                  },
                  {
                    key: "taxPayerHomeOfficeExpenses_TotalInsurance",
                    value: t("organizer.individual.income.step5.label5"),
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,7}$/,
                      message: "Only numbers are allowed maximum length 7",
                    },
                    placeholder: "2,500",
                    message:"Enter Annual Insurance, 0 for none"
                  },
                  {
                    key: "taxPayerHomeOfficeExpenses_TotalMaintenance",
                    value: t("organizer.individual.income.step5.label6"),
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,7}$/,
                      message: "Only numbers are allowed maximum length 7",
                    },
                    placeholder: "2,500",
                    message:"Enter Annual Maintenance, 0 for none"
                  },
                  {
                    key: "taxPayerHomeOfficeExpenses_TotalUtilities",
                    value: t("organizer.individual.income.step5.label7"),
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,7}$/,
                      message: "Only numbers are allowed maximum length 7",
                    },
                    placeholder: "2,500",
                    message:"Enter Annual Utilities, 0 for none."
                  },
                  {
                    key: "taxPayerHomeOfficeExpenses_TotalRepairs",
                    value: t("organizer.individual.income.step5.label8"),
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,7}$/,
                      message: "Only numbers are allowed maximum length 7",
                    },
                    placeholder: "2,500",
                    message:"Enter Annual Repairs, 0 for none"
                  },
                  {
                    key: "taxPayerHomeOfficeExpenses_TotalManagment",
                    value: t("organizer.individual.income.step5.label9"),
                    required: true,
                    pattern: {
                      value: /^[0-9]{1,7}$/,
                      message: "Only numbers are allowed maximum length 7",
                    },
                    placeholder: "2,500",
                    message:"Enter Annual HOA dues, 0 for none"
                  },
                ]),
              })}
              <Divider />
            </>
          )}
        </div>
        <Checkbox
          className={styles.marginBottom}
          onChange={() => {
            setShowSpouse(!showSpouse);
          }}
        >
          {showSpouse
            ? t("organizer.individual.income.step6.remove_spouse")
            : t("organizer.individual.income.step6.add_spouse")}
        </Checkbox>

        {showSpouse && (
          <div>
            {questionContainer({
              key: "spouse_HaveHomeOfficeExpenses",
              question: t("organizer.individual.income.step5.question1"),
            required:true,

              children: radio({
                name: "spouse_HaveHomeOfficeExpenses",
                radioButtons: radioButtons,
            required:true,

              }),
            })}
            {spouseAccountType[0].answer && (
              <>
                <Divider />
                {questionContainer({
                  key: "spouseHomeOffice_HaveSelfEmployedBusiness",
                  question: t("organizer.individual.income.step5.question2"),
                  children: checkbox({
                    name: "spouseHomeOffice_HaveSelfEmployedBusiness",
                    value:
                      data[
                        findIndexData(
                          `spouseHomeOffice_HaveSelfEmployedBusiness`,
                          data,
                        )
                      ].answer,
                  }),
                })}
                <Divider />
                {questionContainer({
                  key: "spouseHomeOffice_DateOfUseBegan",
                  question: t("organizer.individual.income.step5.question3"),
                  children: dataPicker({
                    name: "spouseHomeOffice_DateOfUseBegan",
                    icon: <Calendar />,
                    disabledDate: disabledDateFuture,
                    defaultValue:
                      data[
                        findIndexData("spouseHomeOffice_DateOfUseBegan", data)
                      ].answer,
                  }),
                })}
                <Divider />
                {questionContainer({
                  key: "spouseHomeOffice_EntireHomeArea",
                  question: t("organizer.individual.income.step5.question4"),
                  subClass: styles.questionSubClass,
                  children: manyInput([
                    {
                      key: "spouseHomeOffice_EntireHomeArea",
                      value: t("organizer.individual.income.step5.label1"),
                    },
                    {
                      key: "spouseHomeOffice_OfficeArea",
                      value: t("organizer.individual.income.step5.label2"),
                    },
                    {
                      key: "spouseHomeOffice_BusinessStorage",
                      value: t("organizer.individual.income.step5.label3"),
                    },
                  ]),
                })}
                <Divider />
                {questionContainer({
                  key: "taxPayerHomeOfficeExpenses_TotalMaintenance",
                  question: t("organizer.individual.income.step5.question6"),
                  subClass: styles.questionSubClass,
                  children: manyInput([
                    {
                      key: "spouseHomeOfficeExpenses_TotalRent",
                      value: t("organizer.individual.income.step5.label4"),
                    },
                    {
                      key: "spouseHomeOfficeExpenses_TotalInsurance",
                      value: t("organizer.individual.income.step5.label5"),
                    },
                    {
                      key: "spouseHomeOfficeExpenses_TotalMaintenance",
                      value: t("organizer.individual.income.step5.label6"),
                    },
                    {
                      key: "spouseHomeOfficeExpenses_TotalUtilities",
                      value: t("organizer.individual.income.step5.label7"),
                    },
                    {
                      key: "spouseHomeOfficeExpenses_TotalRepairs",
                      value: t("organizer.individual.income.step5.label8"),
                    },
                    {
                      key: "spouseHomeOfficeExpenses_TotalManagment",
                      value: t("organizer.individual.income.step5.label9"),
                    },
                    {
                      key: "spouseHomeOfficeExpenses_AmountPaid",
                      value: t("organizer.individual.income.step5.label10"),
                    },
                  ]),
                })}
              </>
            )}
          </div>
        )}
        <div className={styles.marginTop}>
          <CircularDirection
            hasLeft
            rightButton={{
              htmlType: "submit",
            }}
            onClickLeft={prevStep}
          />
        </div>
      </Form>
    </div>
  );
};

export default Step5;
