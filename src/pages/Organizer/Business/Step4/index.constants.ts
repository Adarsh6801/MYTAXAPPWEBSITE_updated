import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessEntityTaxReturn,
    forSpouse: false,
    question: "businessEntity_AnyChangesCorporationInformation",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.business.step4.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step4.no"),
    value: false,
  },
];

export const DATA_KEY = ["businessEntity_AnyChangesCorporationInformation"];
