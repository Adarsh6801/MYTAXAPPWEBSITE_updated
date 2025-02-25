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
    question: "taxesPaid_RealEstateType1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_VehicleLicenseFees_Amount1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_VehicleLicenseFees_Date1",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_PersonalPropertyType1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_PersonalProperty_Amount1",
    answerTypeId: QUESTION_TYPE_ANSWER.string,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxesPaid,
    forSpouse: false,
    question: "taxesPaid_PersonalProperty_Date1",
    answerTypeId: QUESTION_TYPE_ANSWER.date,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
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
  "taxesPaid_RealEstatePrimaryResidence_Amount",
  "taxesPaid_RealEstatePrimaryResidence_Date",
  "taxesPaid_RealEstate2ndHome_Amount",
  "taxesPaid_RealEstate2ndHome_Date",
  "taxesPaid_RealEstateInvestmentProperty_Amount",
  "taxesPaid_RealEstateInvestmentProperty_Date",
  "taxesPaid_PersonalPropertyTax_Amount",
  "taxesPaid_PersonalPropertyTax_Date",
  "taxesPaid_SalesTaxReceipted_Amount",
  "taxesPaid_SalesTaxReceipted_Date",
  "taxesPaid_SalesTaxCarsBoatsHome_Amount",
  "taxesPaid_SalesTaxCarsBoatsHome_Date",
  "taxesPaid_VehicleLicenseFees_Amount",
  "taxesPaid_VehicleLicenseFees_Date",
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
