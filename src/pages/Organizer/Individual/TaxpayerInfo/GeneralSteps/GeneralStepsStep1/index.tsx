import { useState } from "react";
import { useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Form } from "antd";

import RadioGroup from "../../../../../../components/RadioGroup";
import OrganizerQuestionCard from "../../../../../../components/OrganizerQuestionCard";
import CircularDirection from "../../../../../../components/CircularDirection";
import { findIndexData } from "../../../../../../helpers/format";
import { IRadioGroupItem } from "../../../../../../components/RadioGroup/index.props";
import {
  IOrganizerStepProps,
  ITaxPayerInfoStepsProps,
} from "../../../index.props";
import { setIndividualOrganizer } from "../../../../../../redux/individualOrganizerSlice";

import styles from "./index.module.css";

const noop = () => {};

const GeneralStepsStep1 = (props: ITaxPayerInfoStepsProps) => {
  const { nextStep = noop, onStepSubmit = noop, prevStep = noop } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "hasSignatureOrIsACoOwnerBankAccountInForeignCountry",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "receivedInheritanceFromSomeoneInForeignCountry",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "hasForeignBankAccount",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "receivedDistributionFromForeignTrust",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "holdInterestInForeignFinancialAsset",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "receive_Sell_Exchang_FinancialInterestInVirtualCurrency",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "investInQualifiedOpportunityFund",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "beenDeniedEarnedIncomeCreditByTheIRS",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question:
        "beenRecertifiedForEarned_Income_ChildTax_AmericanOpportunityCredit",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "bought_Sold_GiftedRealEstateIn",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "madeGiftOfMoneyOrPropertyToAnyIndividual",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "employHouseholdWorkers",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "sellPreciousMetalsDuringTheYear",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
    {
      categoryId: 0, // Change  id when this screen is necessary
      forSpouse: false,
      question: "wishToContributeToThePresidentialCampaignFund",
      value: null,
      comment: "",
      reminder: false,
      isFile: false,
      file: null,
    },
  ]);

  const radioButtons: IRadioGroupItem[] = [
    {
      label: t("organizer.individual.no_flow.step1.yes"),
      value: true,
    },
    {
      label: t("organizer.individual.no_flow.step1.no"),
      value: false,
    },
  ];

  const onFinish = async (value: any) => {
    onStepSubmit(data);
    await dispatch(setIndividualOrganizer(data));
    nextStep();
  };

  const initialValues = {
    hasSignatureOrIsACoOwnerBankAccountInForeignCountry: null,
    receivedInheritanceFromSomeoneInForeignCountry: null,
    hasForeignBankAccount: null,
    receivedDistributionFromForeignTrust: null,
    receive_Sell_Exchang_FinancialInterestInVirtualCurrency: null,
    investInQualifiedOpportunityFund: null,
    beenDeniedEarnedIncomeCreditByTheIRS: null,
    beenRecertifiedForEarned_Income_ChildTax_AmericanOpportunityCredit: null,
    bought_Sold_GiftedRealEstateIn: null,
    madeGiftOfMoneyOrPropertyToAnyIndividual: null,
    employHouseholdWorkers: null,
    sellPreciousMetalsDuringTheYear: null,
    wishToContributeToThePresidentialCampaignFund: null,
  };

  const radioContainer = (item: any, indexKey: number) => {
    const index: number = +findIndexData(item.key, data);

    return (
      <OrganizerQuestionCard
        key={indexKey}
        question={item.title}
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
        className={styles.questionCardContainer}
        subClass={styles.maxWidthGrid}
        questionClassName={styles.maxWidthText}
      >
        <Form.Item
          name={item.key}
          rules={[
            {
              required: false,
              message: t("validations.required"),
            },
          ]}
        >
          <RadioGroup size={45} data={radioButtons} direction="horizontal" />
        </Form.Item>
      </OrganizerQuestionCard>
    );
  };
  const dataKey = [
    {
      key: "hasSignatureOrIsACoOwnerBankAccountInForeignCountry",
      title: t("organizer.individual.general_steps.step1.question_1"),
    },
    {
      key: "receivedInheritanceFromSomeoneInForeignCountry",
      title: t("organizer.individual.general_steps.step1.question_2"),
    },
    {
      key: "hasForeignBankAccount",
      title: t("organizer.individual.general_steps.step1.question_3"),
    },
    {
      key: "receivedDistributionFromForeignTrust",
      title: t("organizer.individual.general_steps.step1.question_4"),
    },
    {
      key: "holdInterestInForeignFinancialAsset",
      title: t("organizer.individual.general_steps.step1.question_5"),
    },
    {
      key: "receive_Sell_Exchang_FinancialInterestInVirtualCurrency",
      title: t("organizer.individual.general_steps.step1.question_6"),
    },
    {
      key: "investInQualifiedOpportunityFund",
      title: t("organizer.individual.general_steps.step1.question_7"),
    },
    {
      key: "beenDeniedEarnedIncomeCreditByTheIRS",
      title: t("organizer.individual.general_steps.step1.question_8"),
    },
    {
      key: "beenRecertifiedForEarned_Income_ChildTax_AmericanOpportunityCredit",
      title: t("organizer.individual.general_steps.step1.question_9"),
    },
    {
      key: "bought_Sold_GiftedRealEstateIn",
      title: t("organizer.individual.general_steps.step1.question_10"),
    },
    {
      key: "madeGiftOfMoneyOrPropertyToAnyIndividual",
      title: t("organizer.individual.general_steps.step1.question_11"),
    },
    {
      key: "employHouseholdWorkers",
      title: t("organizer.individual.general_steps.step1.question_12"),
    },
    {
      key: "sellPreciousMetalsDuringTheYear",
      title: t("organizer.individual.general_steps.step1.question_13"),
    },
    {
      key: "wishToContributeToThePresidentialCampaignFund",
      title: t("organizer.individual.general_steps.step1.question_14"),
    },
  ];

  return (
    <div>
      <p className={styles.description}>
        <Trans
          i18nKey="organizer.individual.general_steps.step1.description"
          values={{ note: "CAUTION -" }}
          components={[<span className={styles.notesTitle}>text</span>]}
        />
      </p>
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        requiredMark={false}
        layout="vertical"
      >
        {dataKey.map((el, index) => radioContainer(el, index))}
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

export default GeneralStepsStep1;
