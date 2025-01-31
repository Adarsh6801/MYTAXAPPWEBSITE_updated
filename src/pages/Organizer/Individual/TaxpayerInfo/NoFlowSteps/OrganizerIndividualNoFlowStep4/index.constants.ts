import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";
import states from "../../../../../../assets/json/states.json";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "streetAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "unitNoAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "zipCodeAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "stateAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.number,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "cityAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.number,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "homePhoneNumberAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: false,
    question: "addSeparatelyForSpouse",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: true,
    question: "spouseStreetAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: true,
    question: "spouseUnitNoAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: true,
    question: "spouseZipCodeAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: true,
    question: "spouseStateAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.number,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: true,
    question: "spouseCityAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    forSpouse: true,
    question: "spouseHomePhoneNumberAsOf31Dec",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const DATA_KEY = [
  "streetAsOf31Dec",
  "unitNoAsOf31Dec",
  "zipCodeAsOf31Dec",
  "stateAsOf31Dec",
  "cityAsOf31Dec",
  "homePhoneNumberAsOf31Dec",
  "addSeparatelyForSpouse",
  "spouseStreetAsOf31Dec",
  "spouseUnitNoAsOf31Dec",
  "spouseZipCodeAsOf31Dec",
  "spouseStateAsOf31Dec",
  "spouseCityAsOf31Dec",
  "spouseHomePhoneNumberAsOf31Dec",
];

export const SPOUSE_NAMES_AS_DES_31: any = [
  "spouseStreetAsOf31Dec",
  "spouseUnitNoAsOf31Dec",
  "spouseZipCodeAsOf31Dec",
  "spouseStateAsOf31Dec",
  "spouseCityAsOf31Dec",
  "spouseHomePhoneNumberAsOf31Dec",
];

export const TAX_PAYER_NAMES_AS_DES_31: any[] = [
  "streetAsOf31Dec",
  "unitNoAsOf31Dec",
  "zipCodeAsOf31Dec",
  "stateAsOf31Dec",
  "cityAsOf31Dec",
  "homePhoneNumberAsOf31Dec",
];

export const dataState = states.map(state => ({
  label: state.name,
  value: state.name,
}));
