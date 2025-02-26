import { IRadioGroupItem } from "../../../../../components/RadioGroup/index.props";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../constants/organizer";
import i18n from "../../../../../i18n";

export const data = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "doYou_pay_property_tax_directly",
    answerTypeId: QUESTION_TYPE_ANSWER.radio,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_realestateProperty",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null, // Store as string
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_personalProperty",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null, // Store as string
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  }
];

export const rentalPropertyData = [
  {
    question: "taxesPaid_VehicleLicenseFees_Type1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
  },
  {
    question: "taxesPaid_VehicleLicenseFees_Amount1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
  },
  {
    question: "taxesPaid_VehicleLicenseFees_Date1",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
  },
];


export const personalPropertData = [
  {
    question: "taxesPaid_PersonalProperty_Type1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
  },
  {
    question: "taxesPaid_PersonalProperty_Amount1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
  },
  {
    question: "taxesPaid_PersonalProperty_Date1",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
  },
];

export const radioButtons = [
  {
    label: i18n.t("organizer.deductions.step3.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.deductions.step3.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "doYou_pay_property_tax_directly",
  "taxesPaid_realestateProperty",
  "taxesPaid_personalProperty",
];

export const dataRelation: IRadioGroupItem[] = [
  {
    label: "Real Estate – Primary Residence",
    value: "Real_Estate_Primary_Residence",
  },
  {
    label: "Real Estate – 2nd Home",
    value: "Real_Estate_2nd_Home",
  },
  {
    label: "Real Estate – Investment Property (Land, etc.)",
    value: "Real_Estate_Investment_Property",
  },
];


export const personalProperyTypeOptions: IRadioGroupItem[] = [
  {
    label: "Vehicle",
    value: "vehicle",
  },
  {
    label: "Boat",
    value: "boat",
  },
  {
    label: "RV",
    value: "rv",
  },
];
