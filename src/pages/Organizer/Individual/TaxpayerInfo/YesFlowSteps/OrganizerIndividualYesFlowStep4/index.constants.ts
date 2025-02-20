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
    question: "doYouHaveOnlinePaymentConfirmation",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.estimatedTaxesPaid,
    forSpouse: false,
    question: "onlinePaymentConfirmationAttachment",
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
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
    datePaid: "",
    paytype:"",
    paytype_amount:"",
  }
];

export const columns = [
  {
    title: i18n.t("organizer.individual.yes_flow.step4.select_option"),
    dataIndex: "paytype",
    editable: true,
  },
  {
    title: i18n.t("organizer.individual.yes_flow.step4.amount"),
    dataIndex: "paytype_amount",
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
  "doYouHaveOnlinePaymentConfirmation",
  "onlinePaymentConfirmationAttachment",
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
