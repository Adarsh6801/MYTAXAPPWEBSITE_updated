import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { useParams } from "react-router-dom";
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
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";
import { downloadFile } from "../../../../../redux/conversationSlice";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";

import styles from "./index.module.css";

const noop = () => {};

const Step5 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const {
    nextStep = noop,
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
  } = props;
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
      if (data[0].answer) {
        nextStep();
        return;
      }
      goTo(30);
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
          key: keys.healthCoverage.key,
          question: t("organizer.deductions.step5.question1"),
          children: radio({
            name: keys.healthCoverage.key,
            radioButtons: radioButtons,
          }),
        })}
        {data[keys.healthCoverage.index].answer &&
          questionContainer({
            key: keys.uploadConfirmation.key,
            question: t("organizer.deductions.step5.question2"),
            children: upload({
              key: keys.uploadConfirmation.key,
              data: data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData(keys.uploadConfirmation.key, data)]
                      .files[index].id,
                    data[findIndexData(keys.uploadConfirmation.key, data)]
                      .files[index].name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[
                    findIndexData(keys.uploadConfirmation.key, data)
                  ].files.slice(0, index),
                  ...data[
                    findIndexData(keys.uploadConfirmation.key, data)
                  ].files.slice(index + 1),
                ];
                newData[
                  findIndexData(keys.uploadConfirmation.key, data)
                ].files = newFileList;

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
          healthCoverage: {
            key: "taxPayer_HealthCoverege_HasHealthCoverege",
            index: 0,
          },
          uploadConfirmation: {
            key: "taxPayer_HealthCoverege_UploadForm1095ABC",
            index: 1,
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
            ? t("organizer.deductions.step5.remove_spouse")
            : t("organizer.deductions.step5.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {formInfo({
              healthCoverage: {
                key: "spouse_HealthCoverege_HasHealthCoverege",
                index: 2,
              },
              uploadConfirmation: {
                key: "spouse_HealthCoverege_UploadForm1095ABC",
                index: 3,
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

export default Step5;
