import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.foreignAccounts,
    forSpouse: false,
    question: "taxPayerMonthlyMortgagePayments",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    value: null,
    comment: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.foreignAccounts,
    forSpouse: true,
    question: "spouseMonthlyMortgagePayments",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    value: null,
    comment: "",
    reminder: false,
    isFile: false,
    file: null,
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
  "taxPayerMonthlyMortgagePayments",
  "spouseMonthlyMortgagePayments",
];
