import i18n from "../../../../../../i18n";
import { IRadioGroupItem } from "../../../../../../components/RadioGroup/index.props";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";

export const SOCIAL_SECURITY = "XXX-XX-XXXX";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "hasDependants",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantFullName",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  /*  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantFirstName",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantMName",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantLastName",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  }, */
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantBirthday1",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantSocialSecurityNo1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantRelation1",
    answerTypeId: QUESTION_TYPE_ANSWER.number,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantMonthsInHome1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "isDependantOverTheAgeOfEighteen1",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "isDependantStudent1",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.dependents,
    forSpouse: false,
    question: "dependantIncome1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const radioButtons: IRadioGroupItem[] = [
  {
    label: i18n.t("organizer.individual.general_steps.step2.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.individual.general_steps.step2.no"),
    value: false,
  },
];

export const dataRelation: IRadioGroupItem[] = [
  {
    label: "Son",
    value: 1,
  },
  {
    label: "Daughter",
    value: 2,
  },
  {
    label: "Father",
    value: 3,
  },
  {
    label: "Mother",
    value: 4,
  },
  {
    label: "Grandchild",
    value: 5,
  },
  {
    label: "HOH",
    value: 6,
  },
  {
    label: "Other",
    value: 6,
  },
];

export const DATA_KEY = [
  "hasDependants",
  // "dependantFullName",
  "dependantFirstName",
  "dependantMName",
  "dependantLastName",
  "dependantBirthday",
  "dependantSocialSecurityNo",
  "dependantRelation",
  "dependantMonthsInHome",
  "isDependantOverTheAgeOfEighteen",
  "isDependantStudent",
  "dependantIncome",
];

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
}
