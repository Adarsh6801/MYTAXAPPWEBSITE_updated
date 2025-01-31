import i18n from "../../../../../i18n";
import { QUESTION_TYPE_ANSWER } from "../../../../../constants/organizer";
import { ORGANIZER_CATEGORY_ID } from "../../../../../constants/organizer";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.medicalExpenses,
    forSpouse: false,
    question: "taxPayer_MedicalExpenses_InsurancePremiums_2ndPage",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.medicalExpenses,
    forSpouse: true,
    question: "spouse_MedicalExpenses_InsurancePremiums_2ndPage",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.deductions.step6.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step6.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "taxPayer_MedicalExpenses_InsurancePremiums_2ndPage",
  "spouse_MedicalExpenses_InsurancePremiums_2ndPage",
];
