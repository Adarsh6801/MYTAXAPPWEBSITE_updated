import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const initialTaxPayerData = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: false,
    question: "taxPayer_CashCharitableContributions_NameOfOrganization1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: false,
    question: "taxPayer_CashCharitableContributions_Amount1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: false,
    question: "taxPayer_CashCharitableContributions_HasProofOfPayment1",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const initialSpouseData = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: true,
    question:
      "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: true,
    question:
      "spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: true,
    question:
      "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: true,
    question: "spouse_CashCharitableContributions_NameOfOrganization1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: true,
    question: "spouse_CashCharitableContributions_Amount1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    forSpouse: true,
    question: "spouse_CashCharitableContributions_HasProofOfPayment1",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.deductions.step1.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step1.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
  "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
  "taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
  "taxPayer_CashCharitableContributions_NameOfOrganization",
  "taxPayer_CashCharitableContributions_Amount",
  "taxPayer_CashCharitableContributions_HasProofOfPayment",
  "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt",
  "spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived",
  "spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceiptFile",
  "spouse_CashCharitableContributions_NameOfOrganization",
  "spouse_CashCharitableContributions_Amount",
  "spouse_CashCharitableContributions_HasProofOfPayment",
];
