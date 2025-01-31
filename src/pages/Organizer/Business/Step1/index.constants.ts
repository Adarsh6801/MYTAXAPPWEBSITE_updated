import i18n from "../../../../i18n";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_HavePreviouslyFiledEntityTaxReturn",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_HaveDigitalCopyInPdfFormat",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_PreviousTaxDocument",
    answerTypeId: QUESTION_TYPE_ANSWER.file,
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.business.step1.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step1.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "businessEntity_HavePreviouslyFiledEntityTaxReturn",
  "businessEntity_HaveDigitalCopyInPdfFormat",
  "businessEntity_PreviousTaxDocument",
];
