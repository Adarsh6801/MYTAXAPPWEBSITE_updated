import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.bankReconcilation,
    forSpouse: false,
    question: "bankReconcilation_BalanceAtTheBeginingOfTheTaxYear",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.bankReconcilation,
    forSpouse: false,
    question: "bankReconcilation_BalanceAtTheEndOfTheTaxYear",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
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
  "bankReconcilation_BalanceAtTheBeginingOfTheTaxYear",
  "bankReconcilation_BalanceAtTheEndOfTheTaxYear",
];
