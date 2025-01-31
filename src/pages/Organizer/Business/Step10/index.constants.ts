import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem,
    forSpouse: false,
    question: "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem,
    forSpouse: false,
    question: "automatedBookkeeping_HaveAccountantOrNeedArefferal",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem,
    forSpouse: false,
    question: "automatedBookkeeping_CanProvideReportsInPdf",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem,
    forSpouse: false,
    question: "automatedBookkeeping_IncomeStatementFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem,
    forSpouse: false,
    question: "automatedBookkeeping_BalanceSheetFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem,
    forSpouse: false,
    question: "automatedBookkeeping_GeneralLedgerFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
];

export const radioYesNoButtons = [
  {
    label: i18n.t("organizer.business.step10.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step10.no"),
    value: false,
  },
];

export const answersData = [
  {
    label: i18n.t("organizer.business.step10.label1"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step10.label2"),
    value: false,
  },
];

export const DATA_KEY = [
  "automatedBookkeeping_HaveAccountingBooksClosedCurrentTaxPeriod",
  "automatedBookkeeping_HaveAccountantOrNeedArefferal",
  "automatedBookkeeping_CanProvideReportsInPdf",
  "automatedBookkeeping_IncomeStatementFile",
  "automatedBookkeeping_BalanceSheetFile",
  "automatedBookkeeping_GeneralLedgerFile",
];
