import i18n from "../../../../../../i18n";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
    forSpouse: false,
    question: "hasChildOrDependentCareExpenses",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
    forSpouse: false,
    question: "numberOfDependentChildrenUnderThirteen",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
    forSpouse: false,
    question: "doesEmployerProvidesDependentCareServices",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
    forSpouse: false,
    question: "childOrDependentCareExpensesTableInfo",
    answerTypeId: QUESTION_TYPE_ANSWER.json,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const tableData = [
  {
    key: "1",
    dataKey: "firstQuarter",
    paidTo: "",
    address: "",
    phoneNumber: "",
    providerEmployerID: "",
    child1: "",
    child2: "",
    child3: "",
  },
  {
    key: "2",
    dataKey: "secondeQuarter",
    paidTo: "",
    address: "",
    phoneNumber: "",
    providerEmployerID: "",
    child1: "",
    child2: "",
    child3: "",
  },
  {
    key: "3",
    dataKey: "thirdQuarter",
    paidTo: "",
    address: "",
    phoneNumber: "",
    providerEmployerID: "",
    child1: "",
    child2: "",
    child3: "",
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
  "hasChildOrDependentCareExpenses",
  "numberOfDependentChildrenUnderThirteen",
  "doesEmployerProvidesDependentCareServices",
  "childOrDependentCareExpensesTableInfo",
];
