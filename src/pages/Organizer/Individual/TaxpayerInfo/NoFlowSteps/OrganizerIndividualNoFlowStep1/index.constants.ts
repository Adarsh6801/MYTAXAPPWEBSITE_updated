import i18n from "../../../../../../i18n";
import { IRadioGroupItem } from "../../../../../../components/RadioGroup/index.props";
import {
  QUESTION_TYPE_ANSWER,
  ORGANIZER_CATEGORY_ID,
} from "../../../../../../constants/organizer";

export const dataTaxpayerQuestion = [
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "wereYouLegallyMarriedLastDayOfTheYear",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
  {
    categoryId: ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    forSpouse: false,
    question: "filingStatus",
    answerTypeId: QUESTION_TYPE_ANSWER.boolean,
    answer: null,
    message: "",
    reminder: false,
    isFile: false,
    files: null,
  },
];

export const radioButtons: IRadioGroupItem[] = [
  {
    label: i18n.t("organizer.individual.no_flow.step1.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.individual.no_flow.step1.no"),
    value: false,
  },
];

export const radioButtonFillStatus: IRadioGroupItem[] = [
  {
    label: i18n.t("organizer.individual.no_flow.step1.single"),
    value: 1,
  },
  {
    label: i18n.t("organizer.individual.no_flow.step1.joint"),
    value: 2,
  },
  {
    label: i18n.t("organizer.individual.no_flow.step1.idk"),
    value: 3,
  },
];

export const DATA_KEY = [
  "wereYouLegallyMarriedLastDayOfTheYear",
  "filingStatus",
];
