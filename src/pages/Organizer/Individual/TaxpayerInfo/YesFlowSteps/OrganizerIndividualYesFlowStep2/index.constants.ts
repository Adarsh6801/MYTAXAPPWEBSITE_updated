import i18n from "../../../../../../i18n";
import { IRadioGroupItem } from "../../../../../../components/RadioGroup/index.props";
import { ORGANIZER_CATEGORY_ID } from "../../../../../../constants/organizer";
import states from "../../../../../../assets/json/states.json";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "hasMovedFromTheAddressOnThePriorYear",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "currentStreet",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "currentUnitNo",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "currentZipCode",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "currentState",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "currentCity",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.addressChanges,
    forSpouse: false,
    question: "currentHomePhoneNumber",
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    file: null,
  },
];

export const radioButtons: IRadioGroupItem[] = [
  {
    label: i18n.t("organizer.individual.yes_flow.step2.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.individual.yes_flow.step2.no"),
    value: false,
  },
];

export const DATA_KEY = [
  "hasMovedFromTheAddressOnThePriorYear",
  "currentStreet",
  "currentUnitNo",
  "currentZipCode",
  "currentState",
  "currentCity",
  "currentHomePhoneNumber",
];

export const dataState = states.map(state => ({
  label: state.name,
  value: state.name,
}));
