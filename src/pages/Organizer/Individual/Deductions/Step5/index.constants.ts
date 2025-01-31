import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.healthCoverage,
    forSpouse: false,
    question: "taxPayer_HealthCoverege_HasHealthCoverege",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    comment: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.healthCoverage,
    forSpouse: false,
    question: "taxPayer_HealthCoverege_UploadForm1095ABC",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    comment: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.healthCoverage,
    forSpouse: true,
    question: "spouse_HealthCoverege_HasHealthCoverege",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    comment: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.healthCoverage,
    forSpouse: true,
    question: "spouse_HealthCoverege_UploadForm1095ABC",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    comment: "",
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
  "taxPayer_HealthCoverege_HasHealthCoverege",
  "taxPayer_HealthCoverege_UploadForm1095ABC",
  "spouse_HealthCoverege_HasHealthCoverege",
  "spouse_HealthCoverege_UploadForm1095ABC",
];
