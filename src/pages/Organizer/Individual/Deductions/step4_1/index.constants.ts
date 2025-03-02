import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const initialTaxPayerData = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question: "taxPayer_NonCashCharitableContributions_HasAny",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_ReceivedRecieptFromOrganisation",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_ReceivedRecieptFromOrganisationFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_ItemizedListOf_GoodsContribution",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_ItemizedListOf_GoodsContributionFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
];

export const initialSpouseData = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question: "taxPayer_NonCashCharitableContributions_Spouce_HasAny",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_Spouce_ReceivedRecieptFromOrganisation",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_Spouce_ReceivedRecieptFromOrganisationFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_Spouce_ItemizedListOf_GoodsContribution",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.nonCashCharitableContributions,
    forSpouse: false,
    question:
      "taxPayer_NonCashCharitableContributions_Spouce_ItemizedListOf_GoodsContributionFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
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
  "taxPayer_NonCashCharitableContributions_HasAny",
  "taxPayer_NonCashCharitableContributions_ReceivedRecieptFromOrganisation",
  "taxPayer_NonCashCharitableContributions_ReceivedRecieptFromOrganisationFile",
  "taxPayer_NonCashCharitableContributions_ItemizedListOf_GoodsContribution",
  "taxPayer_NonCashCharitableContributions_ItemizedListOf_GoodsContributionFile",
  "taxPayer_NonCashCharitableContributions_Spouce_HasAny",
  "taxPayer_NonCashCharitableContributions_Spouce_ReceivedRecieptFromOrganisation",
  "taxPayer_NonCashCharitableContributions_Spouce_ReceivedRecieptFromOrganisationFile",
  "taxPayer_NonCashCharitableContributions_Spouce_ItemizedListOf_GoodsContribution",
  "taxPayer_NonCashCharitableContributions_Spouce_ItemizedListOf_GoodsContributionFile",
];
