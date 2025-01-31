import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: false,
    question: "taxPayer_EducationalExpenses_HasStudentLoanInterestPayments",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: false,
    question: "taxPayer_EducationalExpenses_UploadForm1098E",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: false,
    question: "taxPayer_EducationalExpenses_HasQualifiedEducationExpenses",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: false,
    question: "taxPayer_EducationalExpenses_UploadForm1098T",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: true,
    question: "spouse_EducationalExpenses_HasStudentLoanInterestPayments",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: true,
    question: "spouse_EducationalExpenses_UploadForm1098E",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: true,
    question: "spouse_EducationalExpenses_HasQualifiedEducationExpenses",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    cmessage: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.educationalExpenses,
    forSpouse: true,
    question: "spouse_EducationalExpenses_UploadForm1098T",
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
    label: i18n.t("organizer.deductions.step8.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step8.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "taxPayer_EducationalExpenses_HasStudentLoanInterestPayments",
  "taxPayer_EducationalExpenses_UploadForm1098E",
  "taxPayer_EducationalExpenses_HasQualifiedEducationExpenses",
  "taxPayer_EducationalExpenses_UploadForm1098T",
  "spouse_EducationalExpenses_HasStudentLoanInterestPayments",
  "spouse_EducationalExpenses_UploadForm1098E",
  "spouse_EducationalExpenses_HasQualifiedEducationExpenses",
  "spouse_EducationalExpenses_UploadForm1098T",
];
