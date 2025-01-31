import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Checkbox, Divider } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import { radio, upload } from "../../../../../components/Module";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../helpers/format";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import { downloadFile } from "../../../../../redux/conversationSlice";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step9 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const [showSpouse, setShowSpouse] = useState(false);
  const [data, setData] = useState<IOrganizerStepProps[]>(
    addQuoteIdOrganizer(initialData, Number(quoteId)),
  );

  const dataOrgnaizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrgnaizer) {
      const stepData = dataOrgnaizer.filter((el: any, i: number) => {
        return (
          !!DATA_KEY.find(item => {
            return el.question.includes(item);
          }) &&
          dataOrgnaizer.filter(
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
  }, [dataOrgnaizer]);

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

  const formInfo = (keys: IFormInfo) => {
    return (
      <div>
        {questionContainer({
          key: keys.healthSavingsAccount.key,
          question: t("organizer.deductions.step9.question1"),
          children: radio({
            name: keys.healthSavingsAccount.key,
            radioButtons: radioButtons,
          }),
        })}

        {data[findIndexData(keys.healthSavingsAccount.key, data)]?.answer &&
          questionContainer({
            key: keys.upload1098E.key,
            children: upload({
              key: keys.upload1098E.key,
              label: t("organizer.deductions.step9.label1"),
              data: data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData(keys.upload1098E.key, data)].files[index]
                      .id,
                    data[findIndexData(keys.upload1098E.key, data)].files[index]
                      .name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[
                    findIndexData(keys.upload1098E.key, data)
                  ].files.slice(0, index),
                  ...data[
                    findIndexData(keys.upload1098E.key, data)
                  ].files.slice(index + 1),
                ];
                newData[findIndexData(keys.upload1098E.key, data)].files =
                  newFileList;

                setData([...newData]);
              },
            }),
          })}
        <Divider />
        {questionContainer({
          key: keys.educationExpenses.key,
          question: t("organizer.deductions.step9.question2"),
          children: radio({
            name: keys.educationExpenses.key,
            radioButtons: radioButtons,
          }),
        })}
        {data[findIndexData(keys.educationExpenses.key)]?.answer &&
          questionContainer({
            key: keys.upload1098T.key,
            children: upload({
              key: keys.upload1098T.key,
              label: t("organizer.deductions.step9.label2"),
              data: data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData(keys.upload1098E.key, data)].files[index]
                      .id,
                    data[findIndexData(keys.upload1098E.key, data)].files[index]
                      .name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[
                    findIndexData(keys.upload1098E.key, data)
                  ].files.slice(0, index),
                  ...data[
                    findIndexData(keys.upload1098E.key, data)
                  ].files.slice(index + 1),
                ];
                newData[findIndexData(keys.upload1098E.key, data)].files =
                  newFileList;

                setData([...newData]);
              },
            }),
          })}
      </div>
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
      files: newData[index].isFile ? value[name].fileList : null,
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
        {formInfo({
          healthSavingsAccount: {
            key: "taxPayer_EducationalExpenses_HasStudentLoanInterestPayments",
            index: 0,
          },
          upload1098E: {
            key: "taxPayer_EducationalExpenses_UploadForm1098E",
            index: 1,
          },
          educationExpenses: {
            key: "taxPayer_EducationalExpenses_HasQualifiedEducationExpenses",
            index: 2,
          },
          upload1098T: {
            key: "taxPayer_EducationalExpenses_UploadForm1098T",
            index: 3,
          },
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
            ? t("organizer.deductions.step8.remove_spouse")
            : t("organizer.deductions.step8.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {formInfo({
              healthSavingsAccount: {
                key: "spouse_EducationalExpenses_HasStudentLoanInterestPayments",
                index: 4,
              },
              upload1098E: {
                key: "spouse_EducationalExpenses_UploadForm1098E",
                index: 5,
              },
              educationExpenses: {
                key: "spouse_EducationalExpenses_HasQualifiedEducationExpenses",
                index: 6,
              },
              upload1098T: {
                key: "spouse_EducationalExpenses_UploadForm1098T",
                index: 7,
              },
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

export default Step9;
