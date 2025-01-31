import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const questionData = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.principalShareholders,
    forSpouse: false,
    question: "pincipalShareholders",
    answerTypeId: QUESTION_TYPE_ANSWER.json,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.principalShareholders,
    forSpouse: false,
    question: "pincipalShareholders_ProvideDetailsFile",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.principalShareholders,
    forSpouse: false,
    question:
      "pincipalShareholders_HasPercentageOfOwnershipChangedWithinTheTaxYear",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const data = [
  {
    key: "1",
    name: "",
    taxIDNumber: "",
    address: "",
    ownership: "",
  },
];

export const businessMiles = [
  {
    key: 1,
    name: i18n.t("organizer.income.step5.label1"),
    dataKey: "name",
    value: "",
  },
  {
    key: 2,
    name: i18n.t("organizer.income.step5.label2"),
    dataKey: "taxIDNumber",
    value: "",
  },
  {
    key: 3,
    name: i18n.t("organizer.income.step5.label3"),
    dataKey: "address",
    value: "",
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
  "pincipalShareholders",
  "pincipalShareholders_ProvideDetailsFile",
  "pincipalShareholders_HasPercentageOfOwnershipChangedWithinTheTaxYear",
];
