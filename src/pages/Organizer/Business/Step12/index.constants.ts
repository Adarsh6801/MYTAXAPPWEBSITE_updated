import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../constants/organizer";
import i18n from "../../../../i18n";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.businessAssetSalesAndDisposition,
    forSpouse: false,
    question: "businessAssetSalesAndDisposition",
    answerTypeId: QUESTION_TYPE_ANSWER.json,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const columns = [
  {
    title: i18n.t("organizer.individual.general_steps.step8.paid_to"),
    editable: true,
  },
  {
    title: i18n.t("organizer.individual.general_steps.step8.address"),
    editable: true,
  },
  {
    title: i18n.t("organizer.individual.general_steps.step8.phone_number"),
    editable: true,
  },
];

export const tableData = [
  {
    key: "1",
    description: "",
    datePurchased: "",
    cost: "",
  },
  {
    key: "2",
    description: "",
    datePurchased: "",
    cost: "",
  },
  {
    key: "3",
    description: "",
    datePurchased: "",
    cost: "",
  },
];

export const DATA_KEY = ["businessAssetSalesAndDisposition"];
