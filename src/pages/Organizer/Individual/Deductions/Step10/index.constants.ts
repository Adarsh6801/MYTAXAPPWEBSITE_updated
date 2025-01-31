import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.foreignAccounts,
    forSpouse: false,
    question: "taxPayer_ForeignAccounts_HasForeignBankAccounts",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.foreignAccounts,
    forSpouse: false,
    question: "taxPayer_ForeignAccounts_UploadForeignBankStatementDocument",
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },

  {
    categoryId: ORGANIZER_CATEGORY_ID.foreignAccounts,
    forSpouse: true,
    question: "spouse_ForeignAccounts_HasForeignBankAccounts",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.foreignAccounts,
    forSpouse: true,
    question: "spouse_ForeignAccounts_UploadForeignBankStatementDocument",
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
    label: i18n.t("organizer.deductions.step5.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step5.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "taxPayer_ForeignAccounts_HasForeignBankAccounts",
  "taxPayer_ForeignAccounts_UploadForeignBankStatementDocument",
  "spouse_ForeignAccounts_HasForeignBankAccounts",
  "spouse_ForeignAccounts_UploadForeignBankStatementDocument",
];
