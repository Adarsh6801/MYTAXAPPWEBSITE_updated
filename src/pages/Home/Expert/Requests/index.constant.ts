import { t } from "i18next";
import { IRadioGroupItem } from "../../../../components/RadioGroup/index.props";
import {
  INCOME_TYPES,
  LAST_YEAR_PREPARATION_COSTS,
} from "../../../../constants/initialQuestions";
import { IIncomeTypesData } from "../../TaxPayer/Quotes/InitialQuestions/Individual/Step2/index.props";

export const answerQuestion1 = [
  { label: t("individual.step6.question1.answer1"), value: 1 },
  { label: t("individual.step6.question1.answer2"), value: 2 },
  { label: t("individual.step6.question1.answer3"), value: 3 },
  { label: t("individual.step6.question1.answer4"), value: 4 },
  { label: t("individual.step6.question1.answer5"), value: 5 },
  { label: t("individual.step6.question1.answer6"), value: 6 },
];

export const answerQuestion2 = [
  { label: t("individual.step6.question2.answer1"), value: 1 },
  { label: t("individual.step6.question2.answer2"), value: 2 },
  { label: t("individual.step6.question2.answer3"), value: 3 },
  { label: t("individual.step6.question2.answer4"), value: 4 },
  { label: t("individual.step6.question2.answer5"), value: 5 },
  { label: t("individual.step6.question2.answer6"), value: 6 },
];

export const data: IIncomeTypesData[] = [
  {
    label: t("individual.step2.answer1"),
    value: INCOME_TYPES.FORM_W2,
  },
  {
    label: t("individual.step2.answer2"),
    value: INCOME_TYPES.FORM_1099NEC_1099K,
  },
  {
    label: t("individual.step2.answer3"),
    value: INCOME_TYPES.FORM_K1,
  },
  {
    label: t("individual.step2.answer4"),
    value: INCOME_TYPES.FORM_1099B_1099INT_1099DIV,
  },
  {
    label: t("individual.step2.answer5"),
    value: INCOME_TYPES.RENTAL_PROPERTIES,
  },
  {
    label: t("individual.step2.answer6"),
    value: INCOME_TYPES.FORM_SSA_1099R,
  },
  {
    label: t("individual.step2.answer7"),
    value: INCOME_TYPES.FORM_OTHER,
  },
];

export const radioButtons: IRadioGroupItem[] = [
  {
    label: t("individual.step7.answer1"),
    value: LAST_YEAR_PREPARATION_COSTS.UP_TO_250,
  },
  {
    label: t("individual.step7.answer2"),
    value: LAST_YEAR_PREPARATION_COSTS.UP_TO_500,
  },
  {
    label: t("individual.step7.answer3"),
    value: LAST_YEAR_PREPARATION_COSTS.UP_TO_750,
  },
  {
    label: t("individual.step7.answer4"),
    value: LAST_YEAR_PREPARATION_COSTS.OVER_750,
  },
  {
    label: t("individual.step7.answer5"),
    value: LAST_YEAR_PREPARATION_COSTS.NOT_REMEMBER,
  },
];
