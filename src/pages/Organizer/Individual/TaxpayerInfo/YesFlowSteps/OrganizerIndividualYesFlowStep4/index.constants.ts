import i18n from "../../../../../../i18n";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.estimatedTaxesPaid,
    forSpouse: false,
    question: "didPayAnyEstimatedTaxesDuringTheYear",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.estimatedTaxesPaid,
    forSpouse: false,
    question: "estimatedTaxesPaidTableInfo",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const dataTabel = [
  {
    key: "1",
    name: i18n.t("organizer.individual.yes_flow.step4.question1"),
    dataKey: "firstQuarter",
    federal: "",
    state: "",
    datePaid: "",
  },
  {
    key: "2",
    name: i18n.t("organizer.individual.yes_flow.step4.question2"),
    dataKey: "secondeQuarter",
    federal: "",
    state: "",
    datePaid: "",
  },
  {
    key: "3",
    name: i18n.t("organizer.individual.yes_flow.step4.question3"),
    dataKey: "thirdQuarter",
    federal: "",
    state: "",
    datePaid: "",
  },
  {
    key: "4",
    name: i18n.t("organizer.individual.yes_flow.step4.question4"),
    dataKey: "fourthQuarter",
    federal: "",
    state: "",
    datePaid: "",
  },
];

export const columns = [
  {
    title: i18n.t("organizer.individual.yes_flow.step4.payment_due_date"),
    dataIndex: "name",
    width: "35%",
    editable: true,
  },
  {
    title: i18n.t("organizer.individual.yes_flow.step4.federal"),
    dataIndex: "federal",
    editable: true,
  },
  {
    title: i18n.t("organizer.individual.yes_flow.step4.state"),
    dataIndex: "state",
    editable: true,
  },
  {
    title: i18n.t("organizer.individual.yes_flow.step4.date_paid"),
    dataIndex: "datePaid",
    editable: true,
  },
];

export const DATA_KEY = [
  "didPayAnyEstimatedTaxesDuringTheYear",
  "estimatedTaxesPaidTableInfo",
];

export const radioButtons: any[] = [
  {
    label: i18n.t("organizer.individual.yes_flow.step4.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.individual.yes_flow.step4.no"),
    value: false,
  },
];
