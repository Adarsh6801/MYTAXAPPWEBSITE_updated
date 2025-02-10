import i18n from "../../../../../../i18n";
import { IRadioGroupItem } from "../../../../../../components/RadioGroup/index.props";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "hasFiledTaxReturnPreviously",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "previousTaxYear",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "hasDigitalCopyInPdfFormat",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "previousTaxReturnFileUpload",
    answer: null,
    message: "",
    reminder: false,
    isFile: true,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "canRequestPdfCopyForPreviousPreparer",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "hasHardCopyOfTaxReturn",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    forSpouse: false,
    question: "canScanTaxReturnIntoPdfFormat",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const radioButtons: IRadioGroupItem[] = [
  {
    label: i18n.t("organizer.individual.yes_flow.step1.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.individual.yes_flow.step1.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "hasFiledTaxReturnPreviously",
  "previousTaxYear",
  "hasDigitalCopyInPdfFormat",
  "previousTaxReturnFileUpload",
  "canRequestPdfCopyForPreviousPreparer",
  "hasHardCopyOfTaxReturn",
  "canScanTaxReturnIntoPdfFormat",
];
