import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Divider, Form } from "antd";
import _ from "lodash";

import Button from "../../../../../../components/Button";
import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import { downloadFile } from "../../../../../../redux/conversationSlice";

import {
  addQuoteIdOrganizer,
  findIndexData,
  getClassNames,
  getCurrentType,
  getDynamicDataCount,
} from "../../../../../../helpers/format";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { ORGANIZER_CATEGORY_ID } from "../../../../../../constants/organizer";
import {
  dataTaxpayerQuestion,
  radioButtons,
  dataStudentStatus,
  DATA_KEY,
} from "./index.constants";
import { QUESTION_TYPE_ANSWER } from "../../../../../../constants/organizer";
import { IRS_LINK } from "../../../../../../constants/settings";
import {
  checkbox,
  input,
  radio,
  select,
  upload,
} from "../../../../../../components/Module";
import { IQuestionContainer } from "./index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep5 = (props: ITaxPayerInfoStepsProps) => {
  const { onStepSubmit = noop, prevStep = noop, goTo = noop } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [count, setCount] = useState(1);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(dataTaxpayerQuestion, Number(quoteId)),
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
          item.question.includes("studentStatus")
            ? form.setFieldsValue({
                [item.question]: dataStudentStatus[+item.answer],
              })
            : form.setFieldsValue({
                [item.question]: item.answer,
              });
        }
      });

      resultData.length >= DATA_KEY.length && setData(resultData);
      resultData.length >= DATA_KEY.length &&
        setCount(getDynamicDataCount("studentName", resultData));
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
      goTo(16);
    } catch (e) {
      // TODO: handle catch error
    }
  };

  const add = () => {
    console.log(
      "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
    );

    const newData = [...data];
    newData.push(
      ...[
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `studentName${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `studentStatus${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `isStudentFullTime${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_PostSecondaryTuitionFirstFourYears${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_PostSecondaryTuitionAfterFourYears${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_EnrollmentFeesAndCourseMaterials${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_JobRelatedTuitionAndFees${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_JobRelatedSeminarFees${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_JobRelatedBooksAndSupplies${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_EducationPlans_TuitionK12thGrade${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_EducationPlans_TuitionPostSecondary${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_EducationPlans_BooksAndSupplies${count + 1}`,
          answerTypeId: QUESTION_TYPE_ANSWER.string,
          answer: null,
          message: "",
          reminder: false,
          isFile: false,
          files: null,
        },
        {
          quoteId: Number(quoteId),
          categoryId: ORGANIZER_CATEGORY_ID.educationExpenses,
          forSpouse: false,
          question: `student_EducationPlans_RoomAndBoard${count + 1}`,
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
  };

  const inputMany = (questions: string[]) => {
    const [question1, question2, question3] = questions;
    return (
      <>
        <div className={styles.checkbox}>
          <p>{t("organizer.individual.general_steps.step5.question9")}</p>
          {input({ name: question1,                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500" })}
        </div>
        <div className={styles.checkbox}>
          <p>{t("organizer.individual.general_steps.step5.question10")}</p>
          {input({ name: question2,                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500" })}
        </div>
        <div className={styles.checkbox}>
          <p>{t("organizer.individual.general_steps.step5.question11")}</p>
          {input({ name: question3,
                              pattern:{
                                value:/^\d{0,6}$/,
                                message:"Please enter a number (maximum 6 digits)."
                              },
                              placeholder:"4,500"
           })}
        </div>
      </>
    );
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const index: number = findIndexData(name, data);
    const newData = [...data];

    newData[index] = {
      ...data[index],
      answer: value[name],
      message: "",
      reminder: false,
      isFile: false,
      files: null,
    };
    setData([...newData]);
  };

  const remove = () => {
    const removeStart: number = findIndexData(`studentName${count}`, data);

    const newData = data.filter((item, index) => removeStart > index);
    setData(newData);
    setCount(count - 1);
  };

  const questionContainer = (dataQuestion: IQuestionContainer) => {
    const { question, key, style = false, children, required } = dataQuestion;
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
        questionClassName={getClassNames(style && styles.text)}
        className={
          style ? styles.questionContainer : styles.questionCardContainer
        }
        required={required}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (index: number) => {
    const dataIndex = findIndexData(`studentName${index}`, data);

    // Check if data at this index exists
    if (!data[dataIndex]) {
      return null; // or you could return some fallback UI or log a message
    }

    return (
      <>
        <Divider />
        {questionContainer({
          key: `studentName${index}`,
          question: (
            <Trans
              i18nKey="organizer.individual.general_steps.step5.label1"
              values={{ count: index }}
              components={[<>text</>]}
            />
          ),
          children: (
            <>
              {input({
                name: `studentName${index}`,
                label: t("organizer.individual.general_steps.step2.fullName"),
                required: true,
                placeholder:"John A Smith",
                pattern:{
                  value:/^[a-zA-Z\s.]*$/,
                  message:"Only letters are allowed."
                }
              })}
              {select({
                name: `studentStatus${index}`,
                label: "Student Status",
                data: dataStudentStatus,
                styleSelect: styles.radioContentContainer,
                required: true,
              })}
            </>
          ),
        })}

        <Divider />
        {questionContainer({
          key: `isStudentFullTime${index}`,
          question: t("organizer.individual.general_steps.step5.label2"),
          style: true,
          children: (
            <>
              <div className={styles.checkbox}>
                <p>{t("organizer.individual.general_steps.step5.question5")}</p>
                {checkbox({
                  name: `isStudentFullTime${index}`,
                  value: data[dataIndex]?.answer,
                })}
              </div>
              <div className={styles.checkbox}>
                <p>{t("organizer.individual.general_steps.step5.question6")}</p>
                {input({
                  name: `student_PostSecondaryTuitionFirstFourYears${index}`,
                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500"
                })}
              </div>
              <div className={styles.checkbox}>
                <p>{t("organizer.individual.general_steps.step5.question7")}</p>
                {input({
                  name: `student_PostSecondaryTuitionAfterFourYears${index}`,
                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500"
                })}
              </div>
              <div className={styles.checkbox}>
                <p>{t("organizer.individual.general_steps.step5.question8")}</p>
                {input({
                  name: `student_EnrollmentFeesAndCourseMaterials${index}`,
                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500"
                })}
              </div>
            </>
          ),
        })}
        <Divider />
        {questionContainer({
          key: `student_JobRelatedTuitionAndFees${index}`,
          question: t("organizer.individual.general_steps.step5.label3"),
          style: true,
          children: inputMany([
            ` ${index}`,
            `student_JobRelatedSeminarFees${index}`,
            `student_JobRelatedBooksAndSupplies${index}`,
          ]),
        })}
        <Divider />
        {questionContainer({
          key: `student_JobRelatedTuitionAndFees${index}`,
          question: t("organizer.individual.general_steps.step5.label4"),
          style: true,
          children: (
            <>
              <div className={styles.checkbox}>
                <p>
                  {t("organizer.individual.general_steps.step5.question13")}
                </p>
                {input({
                  name: `student_EducationPlans_TuitionK12thGrade${index}`,
                                    pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500"
                })}
              </div>
              <div className={styles.checkbox}>
                <p>
                  {t("organizer.individual.general_steps.step5.question12")}
                </p>
                {input({
                  name: `student_EducationPlans_TuitionPostSecondary${index}`,
                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500"
                })}
              </div>
              <div className={styles.checkbox}>
                <p>
                  {t("organizer.individual.general_steps.step5.question14")}
                </p>
                {input({
                  name: `student_EducationPlans_BooksAndSupplies${index}`,
                  pattern:{
                    value:/^\d{0,6}$/,
                    message:"Please enter a number (maximum 6 digits)."
                  },
                  placeholder:"4,500"
                })}
              </div>
              <div className={styles.checkbox}>
                <p>
                  {t("organizer.individual.general_steps.step5.question15")}
                </p>
                {input({ name: `student_EducationPlans_RoomAndBoard${index}`,
                                  pattern:{
                                    value:/^\d{0,6}$/,
                                    message:"Please enter a number (maximum 6 digits)."
                                  },
                                  placeholder:"4,500" })}
              </div>
            </>
          ),
        })}
      </>
    );
  };

  return (
    <div>
      <div>
        <p className={styles.description}>
          <Trans
            i18nKey="organizer.individual.general_steps.step5.description1"
            values={{ note: "CAUTION:" }}
            components={[<span className={styles.notesTitle}>text</span>]}
          />
        </p>
        <p>{t("organizer.individual.general_steps.step5.description2")}</p>
        <Button
          className={styles.btn}
          type={"ghost"}
          text={"IRS"}
          href={"https://www.irs.gov/help/ita/whom-may-i-claim-as-a-dependent"}
          target={"_blank"}
        />
      </div>
      <Form
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        requiredMark={false}
        form={form}
        layout="vertical"
      >
        {questionContainer({
          key: `hasEducationExpensesForYouOrDependents`,
          question: t("organizer.individual.general_steps.step5.question1"),
          required: true,
          children: radio({
            name: "hasEducationExpensesForYouOrDependents",
            radioButtons: radioButtons,
            required: true,
          }),
        })}
        <Divider />
        {data[findIndexData("hasEducationExpensesForYouOrDependents", data)]
          .answer &&
          questionContainer({
            key: `hasForm1098TFromTheEducationInstitution`,
            question: t("organizer.individual.general_steps.step5.question2"),
            required:true,
            children: radio({
              name: "hasForm1098TFromTheEducationInstitution",
              radioButtons: radioButtons,
              required:true
            }),
          })}
        {data[findIndexData("hasForm1098TFromTheEducationInstitution", data)]
          .answer && data[findIndexData("hasEducationExpensesForYouOrDependents", data)]
          .answer &&
          questionContainer({
            question: t("organizer.individual.general_steps.step5.question_2"),
            key: "1098_upload_file",
            required: true,
            children: upload({
              key: "1098_upload_file",

              buttonText: t("organizer.individual.yes_flow.step1.attach"),
              data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData("1098_upload_file", data)].files[index]
                      .id,
                    data[findIndexData("1098_upload_file", data)].files[index]
                      .name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[findIndexData("1098_upload_file", data)].files.slice(
                    0,
                    index,
                  ),
                  ...data[findIndexData("1098_upload_file", data)].files.slice(
                    index + 1,
                  ),
                ];
                newData[findIndexData("1098_upload_file", data)].files =
                  newFileList;

                setData([...newData]);
              },
              allowedFileTypes: ["application/pdf"],
              required: true,
              maxCount: 3,
            }),
          })}
        <Divider />
        {data[findIndexData("hasEducationExpensesForYouOrDependents", data)]
          .answer && questionContainer({
          key: "studentsCountToPay",
          question: t("organizer.individual.general_steps.step5.question3"),
          children: input({
            name: "studentsCountToPay",
            label: t("organizer.individual.general_steps.step5.question16"),
            placeholder: "02",
            isNumericOnly: true,
            minLength: 1,
            minLengthMessage: "Minimim 1 characters Required",
            maxLength: 2,
            maxLengthMessage: "Maximum 2 characters only allowed",
            required: true,
            message: "Enter Number of Students",
            pattern: {
              value: /^[12]$/,
              message: "Please enter a number with 1 or 2 digits.",
            },
          }),
        })}
        {data[findIndexData("hasEducationExpensesForYouOrDependents", data)]
          .answer && _.times(count, (index: number) => (
          <div key={index}>
            {formInfo(index + 1)}
            {count === index + 1 && count > 1 && (
              <Button
                text={t(
                  "organizer.individual.general_steps.step2.remove_dependent",
                )}
                type="link"
                onClick={() => {
                  remove();
                }}
              />
            )}
          </div>
        ))}

{data[findIndexData("hasEducationExpensesForYouOrDependents", data)]?.answer && (
  <Button type="link" text={"+ Add Student"} onClick={add} />
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

export default GeneralStepsStep5;
