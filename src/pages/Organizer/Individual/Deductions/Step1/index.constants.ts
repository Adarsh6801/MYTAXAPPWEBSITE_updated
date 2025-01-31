import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.home,
    forSpouse: false,
    question: "taxPayer_HasOwnHome",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.home,
    forSpouse: true,
    question: "spouse_HasOwnHome",
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
    label: i18n.t("organizer.deductions.step1.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step1.no"),
    value: false,
  },
];

export const DATA_KEY = ["taxPayer_HasOwnHome", "spouse_HasOwnHome"];
