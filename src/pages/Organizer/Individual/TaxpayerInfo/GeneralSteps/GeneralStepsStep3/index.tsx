import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import _ from "lodash";

import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import RadioGroup from "../../../../../../components/RadioGroup";
import Button from "../../../../../../components/Button";
import { IRadioGroupItem } from "../../../../../../components/RadioGroup/index.props";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";

import { getClassNames, findIndexData } from "../../../../../../helpers/format";
import {
  formInfoTaxPayerKeysStep3,
  formInfoSpouseKeysStep3,
} from "../../../../../../constants/organizer";
import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep3 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, prevStep = noop, onStepSubmit = noop } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [spouse, setSpouse] = useState(false);
  const [countTaxPayer, setCountTaxPayer] = useState(1);
  const [countSpouse, setCountSpouse] = useState(1);
  const [data, setData] = useState<any[]>([
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "bankName",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "bankRoutingNumber",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "accountNumber",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseBankName",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseBankRoutingNumber",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseAccountNumber",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
  ]);
  const [taxPayerAccountType, setTaxPayerAccountType] = useState<any[]>([
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "accountType1",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "accountAllocation1",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
  ]);

  const [spouseAccountType, setSpouseAccountType] = useState<any[]>([
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseAccountType1",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: true,
      question: "spouseAccountAllocation1",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
  ]);

  const onFinish = (values: any) => {
    data.push(...taxPayerAccountType);
    data.push(...spouseAccountType);

    onStepSubmit(values);
    nextStep();
  };

  const changeDataValue = (
    index: number,
    name: string,
    value: string,
    data: IOrganizerStepProps[],
    setDataType: Function,
  ) => {
    const newData: any = [...data];

    newData[index] = {
      categoryId: data[index].categoryId,
      forSpouse: data[index].forSpouse,
      question: data[index].question,
      value: value,
      //   comment: data[index].comment,
      reminder: data[index].reminder,
      isFile: data[index].isFile,
      // files: data[index].files,
    };
    setDataType(newData);
  };

  const onValuesChange = (value: any) => {
    const [name] = Object.keys(value);

    if (
      name.slice(0, -1) === "accountType" ||
      name.slice(0, -1) === "accountAllocation"
    ) {
      const index: number = findIndexData(name, taxPayerAccountType);

      changeDataValue(
        index,
        name,
        value[name],
        taxPayerAccountType,
        setTaxPayerAccountType,
      );
      return;
    }
    if (
      name.slice(0, -1) === "spouseAccountType" ||
      name.slice(0, -1) === "spouseAccountAllocation"
    ) {
      const index: number = findIndexData(name, spouseAccountType);
      changeDataValue(
        index,
        name,
        value[name],
        spouseAccountType,
        setSpouseAccountType,
      );
      return;
    }

    const index: number = findIndexData(name, data);
    changeDataValue(index, name, value[name], data, setData);
  };

  const dataState: IRadioGroupItem[] = [
    { label: t("organizer.individual.general_steps.step3.checking"), value: 1 },
    { label: t("organizer.individual.general_steps.step3.savings"), value: 2 },
  ];

  const initialValues = {
    accountType: [""],
    bankName: null,
    aptUnitNo: null,
    zipCode: null,
    accountNumber: null,
    city: null,
    alternateHomePhoneNumber: null,
  };

  const addSpouse = () => {
    const newData = [...spouseAccountType];
    newData.push(
      ...[
        {
          categoryId: 0, // Change  id when this screen is necessary
          forSpouse: true,
          question: `spouseAccountType${countSpouse + 1}`,
          value: null,
          comment: "",
          reminder: false,
          isFile: false,
          file: null,
        },
        {
          categoryId: 0, // Change  id when this screen is necessary
          forSpouse: true,
          question: `spouseAccountAllocation${countSpouse + 1}`,
          value: null,
          comment: "",
          reminder: false,
          isFile: false,
          file: null,
        },
      ],
    );
    setSpouseAccountType(newData);
    setCountSpouse(countSpouse + 1);
  };

  const add = () => {
    const newData = [...taxPayerAccountType];
    newData.push(
      ...[
        {
          categoryId: 0, // Change  id when this screen is necessary
          forSpouse: false,
          question: `accountType${countTaxPayer + 1}`,
          value: null,
          comment: "",
          reminder: false,
          isFile: false,
          file: null,
        },
        {
          categoryId: 0, // Change  id when this screen is necessary
          forSpouse: false,
          question: `accountAllocation${countTaxPayer + 1}`,
          value: null,
          comment: "",
          reminder: false,
          isFile: false,
          file: null,
        },
      ],
    );
    setTaxPayerAccountType(newData);
    setCountTaxPayer(countTaxPayer + 1);
  };

  const remove = (dataTax: IOrganizerStepProps[], name: string) => {
    const indexData =
      name === "taxPayerAccountType" ? countTaxPayer : countSpouse;
    const nameData =
      name === "taxPayerAccountType" ? "accountType" : "spouseAccountType";
    const removeStart: number = findIndexData(
      `${nameData}${indexData}`,
      dataTax,
    );
    const newData = dataTax.filter((item, index) => removeStart > index);

    if (name === "taxPayerAccountType") {
      setTaxPayerAccountType(newData);
      setCountTaxPayer(countTaxPayer - 1);
    } else {
      setSpouseAccountType(newData);
      setCountSpouse(countSpouse - 1);
    }
  };

  const input = (
    name: string,
    label: string,
    text?: string,
    isRequired = true,
  ) => (
    <>
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: isRequired,
            message: t("validations.required"),
          },
        ]}
        className={styles.marginBottom}
      >
        <Input />
      </Form.Item>
      <p className={styles.promptText}>{text}</p>
    </>
  );

  const radioAccountType = (
    name: string[],
    label: string,
    index: number,
    isTaxPayer: boolean,
  ) => {
    const [radioName, inputName] = name;

    return (
      <OrganizerQuestionCard
        data={
          isTaxPayer ? taxPayerAccountType[index] : spouseAccountType[index]
        }
        onAlert={() => {
          const newData = isTaxPayer
            ? [...taxPayerAccountType]
            : [...spouseAccountType];
          newData[index] = { ...data[index], reminder: !data[index].reminder };
          isTaxPayer
            ? setTaxPayerAccountType(newData)
            : setSpouseAccountType(newData);
        }}
        onMessage={(comment: string) => {
          const newData = isTaxPayer
            ? [...taxPayerAccountType]
            : [...spouseAccountType];
          newData[index] = { ...data[index], comment: comment };
          isTaxPayer
            ? setTaxPayerAccountType(newData)
            : setSpouseAccountType(newData);
        }}
        className={getClassNames(styles.questionContainer)}
      >
        <Form.Item
          label={`${label} #${index}`}
          name={`${radioName}${index}`}
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup data={dataState} />
        </Form.Item>
        <Form.Item
          name={`${inputName}${index}`}
          label={
            <label className={styles.label}>
              {t("organizer.individual.general_steps.step3.label1")}
            </label>
          }
          rules={[
            {
              required: true,
              message: t("validations.required"),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </OrganizerQuestionCard>
    );
  };

  const InputQuestion = (key: string, children: JSX.Element) => {
    const index: number = +findIndexData(key, data);
    return (
      <OrganizerQuestionCard
        data={data[index]}
        onAlert={() => {
          const newData = [...data];
          newData[index] = { ...data[index], reminder: !data[index].reminder };
          setData(newData);
        }}
        onMessage={(comment: string) => {
          const newData = [...data];
          newData[index] = { ...data[index], comment: comment };
          setData(newData);
        }}
        className={getClassNames(styles.questionContainer)}
      >
        {children}
      </OrganizerQuestionCard>
    );
  };

  const formInfo = (names: string[], style: boolean, isTaxPayer: boolean) => {
    const [
      bankName,
      bankRoutingNumber,
      accountNumber,
      accountType,
      accountAllocation,
    ] = names;

    return (
      <div className={getClassNames(style && styles.marginTop)}>
        {InputQuestion(
          bankName,
          input(
            bankName,
            t("organizer.individual.general_steps.step3.bank_name"),
          ),
        )}
        {InputQuestion(
          bankRoutingNumber,
          input(
            bankRoutingNumber,
            t("organizer.individual.general_steps.step3.include_hyphens"),
          ),
        )}
        {InputQuestion(
          accountNumber,
          input(
            accountNumber,
            t("organizer.individual.general_steps.step3.account_number"),
            t("organizer.individual.general_steps.step3.include_hyphens"),
          ),
        )}
        {isTaxPayer
          ? _.times(countTaxPayer, (index: number) => (
              <div key={index}>
                {radioAccountType(
                  [accountType, accountAllocation],
                  t("organizer.individual.general_steps.step3.account_type"),
                  index + 1,
                  isTaxPayer,
                )}
                {countTaxPayer === index + 1 && countTaxPayer > 1 && (
                  <Button
                    text={t(
                      "organizer.individual.general_steps.step2.remove_dependent",
                    )}
                    type="link"
                    onClick={() => {
                      remove(taxPayerAccountType, "taxPayerAccountType");
                    }}
                  />
                )}
              </div>
            ))
          : _.times(countSpouse, (index: number) => (
              <div key={index}>
                {radioAccountType(
                  [accountType, accountAllocation],
                  t("organizer.individual.general_steps.step3.account_type"),
                  index + 1,
                  isTaxPayer,
                )}
                {countSpouse === index + 1 && countSpouse > 1 && (
                  <Button
                    text={t(
                      "organizer.individual.general_steps.step2.remove_dependent",
                    )}
                    type="link"
                    onClick={() => {
                      remove(spouseAccountType, "spouseAccountType");
                    }}
                  />
                )}
              </div>
            ))}
        {isTaxPayer ? (
          <Button
            text={t("organizer.individual.general_steps.step3.add_dependent")}
            type="link"
            onClick={() => add()}
          />
        ) : (
          <Button
            text={t("organizer.individual.general_steps.step3.add_dependent")}
            type="link"
            onClick={() => addSpouse()}
          />
        )}
        <p>{t("organizer.individual.general_steps.step3.description")}</p>
      </div>
    );
  };
  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div className={styles.container}>
        {formInfo(formInfoTaxPayerKeysStep3, spouse, true)}
        <div>
          <Button
            type="link"
            text={
              spouse
                ? t("organizer.individual.general_steps.step3.remove_spouse")
                : t("organizer.individual.general_steps.step3.add_spouse")
            }
            onClick={() => {
              setSpouse(!spouse);
            }}
          />
          {spouse && formInfo(formInfoSpouseKeysStep3, false, false)}
        </div>
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

export default GeneralStepsStep3;
