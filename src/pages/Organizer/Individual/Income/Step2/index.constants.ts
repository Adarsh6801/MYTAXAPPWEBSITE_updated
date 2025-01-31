import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const taxPayer = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: false,
    question: "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: false,
    question: "didTaxPayerReceive_1099NEC_Misc_KForms",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: false,
    question: "taxPayerSelfEmployedDocument",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: false,
    question: "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const spouse = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: true,
    question: "didSpouseEarnIncomeAsASelfEmployedOrSMLLC",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: true,
    question: "didSpouseReceive_1099NEC_Misc_KForms",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: true,
    question: "spouseSelfEmployedDocument",
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.selfEmployer,
    forSpouse: true,
    question: "didSpouseReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const dataRadio = [
  {
    label: i18n.t("organizer.individual.income.step2.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.individual.income.step2.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC",
  "didTaxPayerReceive_1099NEC_Misc_KForms",
  "taxPayerSelfEmployedDocument",
  "didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
  "didSpouseEarnIncomeAsASelfEmployedOrSMLLC",
  "didSpouseReceive_1099NEC_Misc_KForms",
  "spouseSelfEmployedDocument",
  "didSpouseReceiveAdditionalIncomeYouDidNotReceive_1099NEC",
];
