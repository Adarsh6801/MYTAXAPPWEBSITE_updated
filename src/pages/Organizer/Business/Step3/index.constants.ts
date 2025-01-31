import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_CkeckOne_Corporation",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_StateOfIncorporation",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_StateIdNumberOfIncorporation",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_DateOfIncorporation",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_DateElectionOfIncorporation",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_DateElectionOfSCorporation",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_HaveSCorporationElectionLetter",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_SCorporationElectionLetterFile",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_PrincipalBusinessActivity",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_PrincipalProductOrService",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_StartDate",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_BusinessCode",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_MethodOfAccounting",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_MethodOfAccounting_Describe",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    file: null,
  },
];

export const radioButtonsYesOrNo = [
  {
    label: i18n.t("organizer.business.step3.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step3.no"),
    value: false,
  },
];

export const methodAccounting = [
  {
    label: i18n.t("organizer.business.step3.answer9"),
    value: 9,
  },
  {
    label: i18n.t("organizer.business.step3.answer10"),
    value: 10,
  },
  {
    label: i18n.t("organizer.business.step3.answer11"),
    value: 11,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.business.step3.answer1"),
    value: 1,
  },
  {
    label: i18n.t("organizer.business.step3.answer2"),
    value: 2,
  },
  {
    label: i18n.t("organizer.business.step3.answer3"),
    value: 3,
  },
  {
    label: i18n.t("organizer.business.step3.answer4"),
    value: 4,
  },
  {
    label: i18n.t("organizer.business.step3.answer5"),
    value: 5,
  },
  {
    label: i18n.t("organizer.business.step3.answer6"),
    value: 6,
  },
  {
    label: i18n.t("organizer.business.step3.answer7"),
    value: 7,
  },
  {
    label: i18n.t("organizer.business.step3.answer8"),
    value: 8,
  },
];

export const DATA_KEY = [
  "businessEntity_CkeckOne_Corporation",
  "businessEntity_StateOfIncorporation",
  "businessEntity_StateIdNumberOfIncorporation",
  "businessEntity_DateOfIncorporation",
  "businessEntity_DateElectionOfIncorporation",
  "businessEntity_DateElectionOfSCorporation",
  "businessEntity_HaveSCorporationElectionLetter",
  "businessEntity_SCorporationElectionLetterFile",
  "businessEntity_PrincipalBusinessActivity",
  "businessEntity_PrincipalProductOrService",
  "businessEntity_StartDate",
  "businessEntity_BusinessCode",
  "businessEntity_MethodOfAccounting",
  "businessEntity_MethodOfAccounting_Describe",
];
