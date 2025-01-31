import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form, Checkbox } from "antd";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import { radio, upload } from "../../../../../components/Module";
import { downloadFile } from "../../../../../redux/conversationSlice";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../../helpers/format";
import { getPdfUrl } from "../../../../../helpers/file";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
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

const Step8 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [showSpouse, setShowSpouse] = useState(false);
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
    const { healthSavingsAccount, upload1099SA } = keys;

    return (
      <div>
        {questionContainer({
          key: healthSavingsAccount.key,
          question: t("organizer.deductions.step8.question1"),
          children: radio({
            name: healthSavingsAccount.key,
            radioButtons: radioButtons,
          }),
        })}

        {data[healthSavingsAccount.index].answer &&
          questionContainer({
            key: upload1099SA.key,
            question: (
              <p>
                <Trans
                  i18nKey="organizer.deductions.step8.question2"
                  values={{ info: "1099 SA" }}
                  components={[
                    <a
                      href={getPdfUrl("assets/pdf/1099SSA.pdf")}
                      target="_blank"
                      className={styles.link}
                    >
                      text
                    </a>,
                  ]}
                />
              </p>
            ),
            children: upload({
              key: upload1099SA.key,
              data: data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData(upload1099SA.key, data)].files[index].id,
                    data[findIndexData(upload1099SA.key, data)].files[index]
                      .name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[
                    findIndexData(keys.upload1099SA.key, data)
                  ].files.slice(0, index),
                  ...data[
                    findIndexData(keys.upload1099SA.key, data)
                  ].files.slice(index + 1),
                ];
                newData[findIndexData(keys.upload1099SA.key, data)].files =
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
            key: "taxPayer_HSADistributions_ReceiveAnyHealthSavings",
            index: 0,
          },
          upload1099SA: {
            key: "taxPayer_HSADistributions_UploadForm1099SA",
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
            ? t("organizer.deductions.step8.remove_spouse")
            : t("organizer.deductions.step8.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {formInfo({
              healthSavingsAccount: {
                key: "spouse_HSADistributions_ReceiveAnyHealthSavings",
                index: 2,
              },
              upload1099SA: {
                key: "spouse_HSADistributions_UploadForm1099SA",
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

export default Step8;
