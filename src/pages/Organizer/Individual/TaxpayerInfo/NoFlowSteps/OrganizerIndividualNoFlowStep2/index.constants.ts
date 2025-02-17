import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";

export const SOCIAL_SECURITY = "XXX-XX-XXXX";
export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerFirstName",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerMiddleInitial",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerLastName",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerBirthday",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerSocialSecurityNo",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerOccupation",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "taxPayerMobileNumber",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "isTaxPayerLegallyBlind",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseFirstName_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseMiddleInitial_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseLastName_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseBirthday_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseSocialSecurityNo_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseOccupation_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "spouseMobileNumber_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: true,
    question: "isSpouseLegallyBlind_NoFlow",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const DATA_KEY = [
  "taxPayerFirstName",
  "taxPayerMiddleInitial",
  "taxPayerLastName",
  "taxPayerBirthday",
  "taxPayerSocialSecurityNo",
  "taxPayerOccupation",
  "taxPayerMobileNumber",
  "isTaxPayerLegallyBlind",
  "spouseFirstName_NoFlow",
  "spouseMiddleInitial_NoFlow",
  "spouseLastName_NoFlow",
  "spouseBirthday_NoFlow",
  "spouseSocialSecurityNo_NoFlow",
  "spouseOccupation_NoFlow",
  "spouseMobileNumber_NoFlow",
  "isSpouseLegallyBlind_NoFlow",
];

export const SPOUSE_NAMES: any[] = [
  "spouseFirstName_NoFlow",
  "spouseMiddleInitial_NoFlow",
  "spouseBirthday_NoFlow",
  "spouseSocialSecurityNo_NoFlow",
  "spouseLastName_NoFlow",
  "spouseOccupation_NoFlow",
  "spouseMobileNumber_NoFlow",
  "isSpouseLegallyBlind_NoFlow",
];
