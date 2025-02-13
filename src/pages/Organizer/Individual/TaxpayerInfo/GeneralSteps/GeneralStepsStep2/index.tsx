import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import Button from "../../../../../../components/Button";
import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import {
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
  getDynamicDataCount,
  getClassNames,
} from "../../../../../../helpers/format";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";

import {
  dataTaxpayerQuestion,
  radioButtons,
  dataRelation,
  DATA_KEY,
  SOCIAL_SECURITY,
  IQuestionContainer,
} from "./index.constants";
import { IRS_LINK } from "../../../../../../constants/settings";
import { ORGANIZER_CATEGORY_ID } from "../../../../../../constants/organizer";
import { QUESTION_TYPE_ANSWER } from "../../../../../../constants/organizer";
import {
  checkbox,
  dataPicker,
  input,
  radio,
  select,
} from "../../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep2 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { onStepSubmit = noop, prevStep = noop, goTo = noop } = props;
  const [fieldName, setFiledName] = useState("");
  const [count, setCount] = useState(1);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
  );

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    fieldName === "hasDependants" && restField(fieldName);
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
      console.log(stepData, "stepDatastepData");

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
      console.log(resultData, "resultDataaa");

      resultData.length >= DATA_KEY.length && setData(resultData);
      resultData.length >= DATA_KEY.length &&
        setCount(getDynamicDataCount("dependantFullName", resultData));
      console.log(form.getFieldsValue(), "resultData");
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
      goTo(data[findIndexData("hasDependants", data)].answer ? 11 : 14);
    } catch (e) {
      // TODO: handle catch error
    }
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

    form.resetFields(resetName);
    setData(newObject);
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
      answer: value[name],
    };

    setData([...newData]);
    setFiledName(name);
  };

  const add = () => {
    const newData = [...data];
    newData.push(
      ...[
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantFullName${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        /* {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantMName${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantLastName${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        }, */
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantBirthday${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantSocialSecurityNo${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantRelation${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantMonthsInHome${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `isDependantOverTheAgeOfEighteen${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `isDependantStudent${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.dependents,
          forSpouse: false,
          question: `dependantIncome${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
      ],
    );
    setData(newData);
    setCount(count + 1);
    console.log(form.getFieldsValue(), "resultData");
  };

  const remove = () => {
    const newdata = data.filter(item => !item.question.includes(`${count}`));
    setData(newdata);
    setCount(count - 1);
  };

  const formInfo = (index: number) => {
    const customOnChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      let value = e.target.value;
      value = value.replace(/\D/g, "");
      if (value.length > 9) {
        value = value.slice(0, 9);
      }
      if (value.length <= 3) {
        value = value.replace(/(\d{3})/, "$1");
      } else if (value.length <= 5) {
        value = value.replace(/(\d{3})(\d{2})/, "$1-$2");
      } else {
        value = value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
      }
      e.target.value = value;
      const fieldName = `dependantSocialSecurityNo${index + 1}`;
      form.setFieldsValue({
        [fieldName]: value,
      });
    };

    return (
      <div className={styles.formInfoContainer} key={index}>
        {questionContainer({
          key: `dependantFullName${index + 1}`,
          children: input({
            name: `dependantFullName${index + 1}`,
            label: t("organizer.individual.general_steps.step2.fullName"),
            required: true,
            placeholder: "Donald J Trump",
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: "Only Alphabets and Spaces are Allowed",
            },
          }),

          /*   key: `dependantFirstName${index + 1}`,
          children: input({
            name: `dependantFirstName${index + 1}`,
            label: t("organizer.individual.no_flow.step2.first_name"),
            placeholder : 'Donald',
            required : true,
            message : 'First Name is Required'
          }), */
        })}
        {/* {questionContainer({
          key: `dependantMName${index + 1}`,
          children: input({
            name: `dependantMName${index + 1}`,
            label: t("organizer.individual.no_flow.step2.middle_initial"),
            placeholder : 'J',
            required : true,
            message : 'Middle Initial is Required'
          }),
        })}
        {questionContainer({
          key: `dependantLastName${index + 1}`,
          children: input({
            name: `dependantLastName${index + 1}`,
            label: t("organizer.individual.no_flow.step2.last_name"),
            placeholder : 'Trump',
            required : true,
            message : 'Last Name is Required'
          }),
        })} */}
        {/* <div className={styles.inputContainer}>
          
          {input({
            name: `dependantMName${index + 1}`,
            label: t("organizer.individual.no_flow.step2.middle_initial"),
            placeholder : 'J'
          })}
        </div>
        <div className={styles.inputContainer}>
          {input({
            name: `dependantLastName${index + 1}`,
            label: t("organizer.individual.no_flow.step2.last_name"),
            placeholder : 'Trump',
            required : true,
            message : 'Last Name is Required'
          })}
        </div> */}
        <div className={styles.dataPickerContainer}>
          {questionContainer({
            key: `dependantBirthday${index + 1}`,
            children: dataPicker({
              name: `dependantBirthday${index + 1}`,
              label: t("organizer.individual.general_steps.step2.birthday"),
              defaultValue:
                data[findIndexData(`dependantBirthday${index + 1}`, data)]
                  .answer,
              required: true,
              message: "Birthdate is Required",
            }),
          })}
          <div className={styles.socialSecurityNo}>
            {input({
              name: `dependantSocialSecurityNo${index + 1}`,
              label: t(
                "organizer.individual.general_steps.step2.social_security_no",
              ),
              text: t(
                "organizer.individual.general_steps.step2.social_description",
              ),
              formStyles: styles.marginBottom,
              textStyle: styles.promptText,
              customOnChange: e => customOnChange(e, index),
              placeholder: SOCIAL_SECURITY,
              isNumericOnly: true,
              required: true,
              pattern:{
              value :/^\d{3}-\d{2}-\d{4}$/,
              message : 'Social Security Number is Invalid'
              },
              message: "Social Security Number is Required",
            })}
          </div>
        </div>
        {questionContainer({
          key: `dependantRelation${index + 1}`,
          children: select({
            name: `dependantRelation${index + 1}`,
            label: t("organizer.individual.general_steps.step2.relation"),
            data: dataRelation,
            required: true,
            message: "Relation Is Required",
          }),
        })}
        {questionContainer({
          key: `dependantMonthsInHome${index + 1}`,
          children: input({
            name: `dependantMonthsInHome${index + 1}`,
            label: t("organizer.individual.general_steps.step2.months_home"),
            placeholder: "09",
            isNumericOnly: true,
            minLength: 2,
            minLengthMessage: "Minimim 2 characters Required",
            maxLength: 2,
            maxLengthMessage: "Maximum 2 characters only allowed",
            required: true,
            message: "Months in Home is Required",
          }),
        })}
        {questionContainer({
          key: `isDependantOverTheAgeOfEighteen${index + 1}`,
          children: checkbox({
            name: `isDependantOverTheAgeOfEighteen${index + 1}`,
            label: t("organizer.individual.general_steps.step2.over_age"),
            value:
              data[
                findIndexData(
                  `isDependantOverTheAgeOfEighteen${index + 1}`,
                  data,
                )
              ].answer,
          }),
        })}
        {questionContainer({
          key: `isDependantStudent${index + 1}`,
          children: checkbox({
            name: `isDependantStudent${index + 1}`,
            label: t("organizer.individual.general_steps.step2.student"),
            value:
              data[findIndexData(`isDependantStudent${index + 1}`, data)]
                .answer,
          }),
        })}
        {questionContainer({
          key: `dependantIncome${index + 1}`,
          children: input({
            name: `dependantIncome${index + 1}`,
            label: t("organizer.individual.general_steps.step2.income"),
            placeholder: "3500",
            isNumericOnly: true,
            minLength: 1,
            minLengthMessage: "Maximum 10 characters only allowed",
            maxLength: 10,
            maxLengthMessage: "Maximum 10 characters only allowed",
            required: true,
            pattern:{
              value:/^\d{1,10}$/,
              message:'Minimum one character and maximum 10 characters only allowed'
            },
            message: "Income Is Required , If Not Mention As 0",
          }),
        })}
      </div>
    );
  };

  return (
    <div>
      <p className={styles.marginLeft}>
        <Trans
          i18nKey="organizer.individual.general_steps.step2.description1"
          values={{ note: "Note -" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={onValuesChange}
        requiredMark={false}
        layout="vertical"
      >
        <OrganizerQuestionCard
          question={t("organizer.individual.general_steps.step2.question")}
          data={data[findIndexData("hasDependants", data)]}
          onAlert={() => {
            const newData = [...data];
            newData[findIndexData("hasDependants", data)] = {
              ...data[findIndexData("hasDependants", data)],
              reminder: !data[findIndexData("hasDependants", data)].reminder,
            };

            setData(newData);
          }}
          onMessage={(comment: string) => {
            const newData = [...data];
            newData[findIndexData("hasDependants", data)] = {
              ...data[findIndexData("hasDependants", data)],
              message: comment,
            };

            setData(newData);
          }}
          className={styles.firstQuestionContainer}
          questionClassName={styles.questionContainer}
          childrenClassName={styles.context}
        >
          <div className={styles.marginLeft}>
            <Button
              text={t("organizer.individual.general_steps.step2.irs")}
              type={"ghost"}
              href={IRS_LINK}
              target={"_blank"}
              className={styles.btn}
            />
            {radio({
              name: "hasDependants",
              radioButtons: radioButtons,
              value: data[findIndexData("hasDependants", data)].answer,
              required: true,
            })}
          </div>
        </OrganizerQuestionCard>
        {data[0].answer && (
          <div className={styles.marginTop}>
            {_.times(count, (index: number) => (
              <div key={index}>
                {formInfo(index)}
                {count === index + 1 && count > 1 && (
                  <Button
                    key={`button${index}`}
                    text={t(
                      "organizer.individual.general_steps.step2.remove_dependent",
                    )}
                    type="link"
                    onClick={() => remove()}
                  />
                )}
              </div>
            ))}
            <Button
              text={t("organizer.individual.general_steps.step2.add_dependent")}
              type="link"
              onClick={() => add()}
            />
          </div>
        )}
        <CircularDirection
          rightButton={{
            htmlType: "submit",
          }}
          onClickLeft={prevStep}
        />
      </Form>
    </div>
  );
};

export default GeneralStepsStep2;
