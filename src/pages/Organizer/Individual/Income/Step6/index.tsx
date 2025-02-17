import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox, Form, Divider } from "antd";
import { useParams } from "react-router-dom";
import _ from "lodash";

import CircularDirection from "../../../../../components/CircularDirection";
import OrganizerQuestionCard from "../../../../../components/OrganizerQuestionCard";
import Button from "../../../../../components/Button";
import {
  addQuoteIdOrganizer,
  findIndexData,
  getCurrentType,
} from "../../../../../helpers/format";
import { ORGANIZER_CATEGORY_ID } from "../../../../../constants/organizer";
import {
  taxPayer,
  spouse,
  radioButtons,
  spouseStatic,
  spouseDynamic,
  taxPayerDynamic,
  taxPayerStatic,
  DATA_KEY,
  selectType,
} from "./index.constants";
import { QUESTION_TYPE_ANSWER } from "../../../../../constants/organizer";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../index.props";
import { IFormInfo, IQuestionContainer } from "./index.props";
import {
  checkbox,
  input,
  radio,
  select,
} from "../../../../../components/Module";
import {
  getTaxpayerIndividualOrganizer,
  setIndividualOrganizer,
} from "../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const Step6 = (props: ITaxPayerInfoStepsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const [countTaxPayer, setCountTaxPayer] = useState(1);
  const [countSpouse, setCountSpouse] = useState(1);
  const [showSpouse, setShowSpouse] = useState(false);
  const { id: quoteId } = useParams();
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

  const dataOrganizer = useSelector(
    (state: any) => state.individualOrganizer.data,
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dataOrganizer) {
      const stepData = dataOrganizer.filter((el: any) => {
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
      const data = [...taxPayerAccountType, ...spouseAccountType];
      onStepSubmit(data);
      await dispatch(setIndividualOrganizer(data));
      nextStep();
    } catch (e) {
      // TODO: handle catch error
    }
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

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);
    const dataValue = name.includes("taxPayer")
      ? taxPayerAccountType
      : spouseAccountType;
    const index: number = findIndexData(name, dataValue);
    const newData = [...dataValue];

    newData[index] = {
      ...dataValue[index],
      answer: value[name],
      answerTypeId: QUESTION_TYPE_ANSWER.boolean,
      message: "",
      reminder: false,
      isFile: newData[index].isFile,
      files: newData[index].isFile ? value[name] : null,
    };

    name.includes("taxPayer")
      ? setTaxPayerAccountType(newData)
      : setSpouseAccountType(newData);

    setData([...newData, ...spouseAccountType, ...taxPayerAccountType]);
  };

  const add = (names: string[], isTaxpayer: boolean) => {
    const newData = isTaxpayer
      ? [...taxPayerAccountType]
      : [...spouseAccountType];
    const count = isTaxpayer ? countTaxPayer : countSpouse;
    const data = names.map(item => {
      return {
        quoteId: Number(quoteId),
        categoryId: ORGANIZER_CATEGORY_ID.realEstateRental,
        forSpouse: isTaxpayer ? false : true,
        question: `${item}${count + 1}`,
        answerTypeId: QUESTION_TYPE_ANSWER.string,
        answer: null,
        message: "",
        reminder: false,
        isFile:
          item === "taxPayerRealEstate_ProvideAny1099ks" ||
          item === "spouseRealEstate_ProvideAny1099ks"
            ? true
            : false,
        files: null,
      };
    });

    newData.push(...data);

    setData(newData);
    if (isTaxpayer) {
      setTaxPayerAccountType(newData);
      setCountTaxPayer(countTaxPayer + 1);
      return;
    }

    setSpouseAccountType(newData);
    setCountSpouse(countSpouse + 1);
  };

  const remove = (name: string) => {
    const nameData = name.includes("taxPayer")
      ? taxPayerAccountType
      : spouseAccountType;
    const removeStart: number = findIndexData(name, nameData);
    const newData = nameData.filter((item, index) => removeStart > index);

    if (name.includes("taxPayer")) {
      setTaxPayerAccountType(newData);
      setCountTaxPayer(countTaxPayer - 1);
    } else {
      setSpouseAccountType(newData);
      setCountSpouse(countSpouse - 1);
    }
  };

  const propertySide = (names: string[], index: number) => {
    return (
      <>
        {questionContainer({
          key: names[0] + index,
          question: t("organizer.individual.income.step6.question2"),
          subClass: styles.questionSubClass,
          children: (
            <div>
              {input({
                name: names[0] + index,
                label: t("organizer.individual.income.step6.label1"),
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Only numbers and letters.",
                },
                placeholder: "123 Main St",
              })}
              {select({
                name: names[1] + index,
                label: t("organizer.individual.income.step6.label2"),
                data: selectType,
                required: true,
              })}
              {input({
                name: names[2] + index,
                label: t("organizer.individual.income.step6.label3"),
                required: true,
                placeholder: "28,000",
                pattern: {
                  value: /^[0-9]{1,7}$/,
                  message:
                    "Total rents received during the year max 7 digits.",
                },
              })}
              {input({
                name: names[4] + index,
                label: t("organizer.individual.income.step6.label5"),
                required: true,
                placeholder: "100%",
                pattern: {
                  value: /^(100|[0-9]{1,2})$/,
                  message: "Enter a valid percentage between 0 and 100.",
                },
              })}
            </div>
          ),
        })}
        {questionContainer({
          key: names[5] + index,
          question: t("organizer.individual.income.step6.question3"),
          subClass: styles.questionSubClass,
          required:true,
          children: (
            <div>
              {checkbox({
                name: names[5] + index,
                value: data[findIndexData(`${names[5] + index}`, data)].answer,
              })}
              {input({
                name: names[6] + index,
                label: t("organizer.individual.income.step6.label7"),
                required: true,
                pattern: {
                  value: /^[0-9]{1,3}$/,
                  message:
                    "Only numbers are allowed, with a minimum length of 1 and a maximum length of 3.",
                },
                placeholder: "365",
              })}
              {input({
                name: names[7] + index,
                label: t("organizer.individual.income.step6.label8"),
                required: true,
                pattern: {
                  value: /^[0-9]{1,3}$/,
                  message:
                    "Only numbers are allowed, with a minimum length of 1 and a maximum length of 3.",
                },
                placeholder: "365",
              })}
            </div>
          ),
        })}
      </>
    );
  };

  const formInfo = (data: IFormInfo) => {
    const { isTaxPayer, dynamicKeys, staticKeys } = data;
    const count = isTaxPayer ? countTaxPayer : countSpouse;
    return (
      <div>
        {_.times(count, (index: number) => (
          <div key={index + 1}>
            <p className={styles.subTitle}>
              {t("organizer.individual.income.step6.sub_title1", {
                count: index + 1,
              })}
            </p>
            {propertySide(dynamicKeys, index + 1)}
            {index === count - 1 && (
              <Button
                key={`buttonAdd${index}`}
                text={t("organizer.individual.income.step6.add_property")}
                type="link"
                onClick={() => {
                  add(dynamicKeys, isTaxPayer);
                }}
              />
            )}
            {count === index + 1 && count > 1 && (
              <Button
                key={`buttonRemove${index}`}
                text={t("organizer.individual.income.step6.remove_property")}
                type="link"
                onClick={() => {
                  remove(`${dynamicKeys[0]}${index}`);
                }}
              />
            )}
          </div>
        ))}
        <Divider />
        <div>
          <p className={styles.subTitle}>
            {t("organizer.individual.income.step6.sub_title2")}
          </p>
          {staticKeys.map((item, index) => {
            if (staticKeys[12] === item) {
              return 
            }
            if (staticKeys[13] === item) {
              return questionContainer({
                key: item,
                question: (
                  <div>
                    <Trans
                      i18nKey="organizer.individual.income.step6.question17"
                      values={{
                        info: "еlectric, gas, water, <br /> garbage collection, etc.",
                      }}
                      components={[
                        <span className={styles.additionalInfo}>text</span>,
                      ]}
                    />
                  </div>
                ),
                children: input({ name: item,
                  pattern:{
                    value:/^\d{0,7}$/,
                    message:" Total paid during the year max 7 digits."
                  },
                  placeholder:"2,500" 
                 }),
              });
            }
            if (staticKeys[14] === item) {
              return questionContainer({
                key: item,
                question: (
                  <div>
                    <Trans
                      i18nKey="organizer.individual.income.step6.question16"
                      values={{
                        info: `Generally the amount from <br /> line 1 of the 2019 form W-3`,
                      }}
                      components={[
                        <span className={styles.additionalInfo}>text</span>,
                      ]}
                    />
                  </div>
                ),
                children: input({ name: item,
                  pattern:{
                    value:/^\d{0,7}$/,
                    message:" Total paid during the year max 7 digits."
                  },
                  placeholder:"2,500" 
                 }),
              });
            }
            if (staticKeys[16] === item) {
              return questionContainer({
                key: item,
                question: t(
                  `organizer.individual.income.step6.question${index + 4}`,
                ),
                children: input({ name: item ,
                  pattern:{
                    value:/^\d{0,3}$/,
                    message:"Average number of days rented during the year max 3 digits."
                  },
                  placeholder:"365" 
                }),
              });
            }
            return questionContainer({
              key: item,
              question: t(
                `organizer.individual.income.step6.question${index + 4}`,
              ),
              children: input({ name: item ,
                pattern:{
                  value:/^\d{0,7}$/,
                  message:" Total paid during the year max 7 digits."
                },
                placeholder:"2,500" 
              }),
            });
          })}
        </div>
      </div>
    );
  };

  return (
    <Form
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div>
        <p className={styles.description}>
          <Trans
            i18nKey="organizer.individual.income.step6.description"
            values={{
              note: "NOTE:",
            }}
            components={[<span className={styles.notesTitle}>text</span>]}
          />
        </p>
        {questionContainer({
          key: "taxPayerRealEstate_OwnAnyMoreRealEstate",
          question: t("organizer.individual.income.step6.question1"),
          required:true,
          children: radio({
            name: "taxPayerRealEstate_OwnAnyMoreRealEstate",
            radioButtons: radioButtons,
          required:true,
          }),
        })}
        {(taxPayerAccountType[17].answer ||
          data[
            findIndexData(taxPayerAccountType[17].question, taxPayerAccountType)
          ]?.answer) && (
          <>
            <Divider />
            {formInfo({
              isTaxPayer: true,
              dynamicKeys: taxPayerDynamic,
              staticKeys: taxPayerStatic,
            })}
            <Divider />
          </>
        )}
      </div>
      <div>
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
          <>
            {questionContainer({
              key: "spouseRealEstate_OwnAnyMoreRealEstate",
              question: t("organizer.individual.income.step6.question1"),
              required:true,
              children: radio({
                name: "spouseRealEstate_OwnAnyMoreRealEstate",
                radioButtons: radioButtons,
              required:true,
              }),
            })}
            {spouseAccountType[17].answer && (
              <>
                {formInfo({
                  isTaxPayer: true,
                  dynamicKeys: spouseDynamic,
                  staticKeys: spouseStatic,
                })}
              </>
            )}
          </>
        )}
      </div>
      <CircularDirection
        hasLeft
        rightButton={{
          htmlType: "submit",
        }}
        onClickLeft={prevStep}
      />
    </Form>
  );
};

export default Step6;
