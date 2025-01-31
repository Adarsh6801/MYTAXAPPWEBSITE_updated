import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.hSADistributions,
    forSpouse: false,
    question: "taxPayer_HSADistributions_ReceiveAnyHealthSavings",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.hSADistributions,
    forSpouse: false,
    question: "taxPayer_HSADistributions_UploadForm1099SA",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.hSADistributions,
    forSpouse: true,
    question: "spouse_HSADistributions_ReceiveAnyHealthSavings",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.hSADistributions,
    forSpouse: true,
    question: "spouse_HSADistributions_UploadForm1099SA",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.deductions.step8.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step8.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "taxPayer_HSADistributions_ReceiveAnyHealthSavings",
  "taxPayer_HSADistributions_UploadForm1099SA",
  "spouse_HSADistributions_ReceiveAnyHealthSavings",
  "spouse_HSADistributions_UploadForm1099SA",
];
