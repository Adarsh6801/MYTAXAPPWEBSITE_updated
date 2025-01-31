import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../components/CircularDirection";
import { downloadFile } from "../../../../redux/conversationSlice";
import {
  getClassNames,
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
} from "../../../../helpers/format";
import { data as initialData, radioButtons, DATA_KEY } from "./index.constants";
import { ITaxPayerInfoStepsProps, IOrganizerStepProps } from "../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import { radio, upload } from "../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step1 = (props: ITaxPayerInfoStepsProps) => {
  const {
    nextStep = noop,
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: quoteId } = useParams();
  const [fieldName, setFiledName] = useState("");
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
    fieldName !== "businessEntity_PreviousTaxDocument" && restField(fieldName);
  }, [fieldName]);

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

    setData(newObject);
    form.resetFields(resetName);
  };

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
        data[
          findIndexData(
            "businessEntity_HavePreviouslyFiledEntityTaxReturn",
            data,
          )
        ].answer == false
      ) {
        nextStep();
        return;
      }

      if (
        data[
          findIndexData(
            "businessEntity_HavePreviouslyFiledEntityTaxReturn",
            data,
          )
        ].answer &&
        data[findIndexData("businessEntity_HaveDigitalCopyInPdfFormat", data)]
          .answer == false
      ) {
        nextStep();
        return;
      }

      goTo(3);
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
      files: newData[index].isFile ? value[name].fileList : null,
    };

    setData([...newData]);
    setFiledName(name);
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
    const {
      filedEntityTaxReturn,
      haveDigitalCopyInPdfFormat,
      previousTaxDocumnt,
    } = keys;
    return (
      <div>
        {questionContainer({
          key: filedEntityTaxReturn.key,
          question: t("organizer.business.step1.question1"),
          children: radio({
            name: filedEntityTaxReturn.key,
            radioButtons: radioButtons,
          }),
        })}

        {data[filedEntityTaxReturn.index].answer &&
          questionContainer({
            key: haveDigitalCopyInPdfFormat.key,
            question: t("organizer.business.step1.question2"),
            children: radio({
              name: haveDigitalCopyInPdfFormat.key,
              radioButtons: radioButtons,
            }),
          })}

        {data[haveDigitalCopyInPdfFormat.index].answer &&
          data[filedEntityTaxReturn.index].answer &&
          questionContainer({
            key: previousTaxDocumnt.key,
            question: t("organizer.business.step1.question2"),
            children: upload({
              key: previousTaxDocumnt.key,
              data: data,
              dispatch: dispatch,
              onClick: (index = 0) => {
                dispatch(
                  downloadFile(
                    data[findIndexData(previousTaxDocumnt.key, data)].files[
                      index
                    ].id,
                    data[findIndexData(previousTaxDocumnt.key, data)].files[
                      index
                    ].name,
                  ),
                );
              },
              onRemove: (index = 0) => {
                const newData = [...data];
                const newFileList = [
                  ...data[
                    findIndexData(previousTaxDocumnt.key, data)
                  ].files.slice(0, index),
                  ...data[
                    findIndexData(previousTaxDocumnt.key, data)
                  ].files.slice(index + 1),
                ];
                newData[findIndexData(previousTaxDocumnt.key, data)].files =
                  newFileList;

                setData([...newData]);
              },
            }),
          })}
      </div>
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
      <div>
        {formInfo({
          filedEntityTaxReturn: {
            key: "businessEntity_HavePreviouslyFiledEntityTaxReturn",
            index: 0,
          },
          haveDigitalCopyInPdfFormat: {
            key: "businessEntity_HaveDigitalCopyInPdfFormat",
            index: 1,
          },
          previousTaxDocumnt: {
            key: "businessEntity_PreviousTaxDocument",
            index: 2,
          },
        })}
      </div>
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        hasLeft={false}
      />
    </Form>
  );
};

export default Step1;
