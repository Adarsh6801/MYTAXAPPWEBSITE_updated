import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Form, Checkbox } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../components/CircularDirection";
import {
  findIndexData,
  addQuoteIdOrganizer,
  getCurrentType,
  getClassNames,
} from "../../../../../helpers/format";
import { data as initialData, DATA_KEY, radioButtons } from "./index.constants";
import {
  ITaxPayerInfoStepsProps,
  IOrganizerStepProps,
} from "../../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import { radio } from "../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step1 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const {
    nextStep = noop,
    prevStep = noop,
    onStepSubmit = noop,
    goTo = noop,
  } = props;
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
      if (!data[0].answer) {
        goTo(25);
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
      question: data[index].question,
      answer: value[name],
      files: newData[index].isFile ? value[name] : null,
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
        className={getClassNames(
          styles.questionContainer,
          key === "unitNoAsOfDec31" ||
            ("spouseUnitNoAsOfDec31" && styles.smallInput),
        )}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (keys: IFormInfo) => {
    const { ownHome } = keys;
    return (
      <div>
        {questionContainer({
          key: ownHome.key,
          question: t("organizer.deductions.step1.question1"),
          children: radio({ name: ownHome.key, radioButtons: radioButtons }),
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
          ownHome: { key: "taxPayer_HasOwnHome", index: 0 },
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
            ? t("organizer.deductions.step1.remove_spouse")
            : t("organizer.deductions.step1.add_spouse")}
        </Checkbox>
        {showSpouse && (
          <div>
            {formInfo({
              ownHome: { key: "spouse_HasOwnHome", index: 0 },
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

export default Step1;
