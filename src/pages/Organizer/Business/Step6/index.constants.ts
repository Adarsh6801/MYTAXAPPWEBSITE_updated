import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_IncomeStatementForTheYear",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_If1099NECProvideFormW9AndAmounts",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_IfWithdrawalsProvideDetails",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_AreAnyOfThePartnersResidentsOfDifferentState",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.additionalInformation,
    forSpouse: false,
    question: "additionalInfo_PartnersResidentsOfDifferentStateDetails",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.business.step5.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step5.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "additionalInfo_IsTheFirstYearOfTheEntitysExistence",
  "additionalInfo_IncomeStatementForTheYear",
  "additionalInfo_IfHasEmployeeProvideForms941AndW2s",
  "additionalInfo_If1099NECProvideFormW9AndAmounts",
  "additionalInfo_IfWithdrawalsProvideDetails",
  "additionalInfo_AreAnyOfThePartnersResidentsOfDifferentState",
  "additionalInfo_PartnersResidentsOfDifferentStateDetails",
];
