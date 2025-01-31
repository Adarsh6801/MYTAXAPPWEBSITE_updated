import { t } from "i18next";
import i18n from "../../../../i18n";
import { ICategorizedFilter } from "./index.props";
import { ORGANIZER_CATEGORY_ID } from "../../../../constants/organizer";
import states from "../../../../assets/json/states.json";

import Document from "../../../../assets/svgs/document.svg";
import TaxPayerInformation from "../../../../assets/svgs/taxpayer_Information.svg";
import OrganizerIcon2 from "../../../../assets/svgs/organizer-icon-2.svg";
import OrganizerAddress from "../../../../assets/svgs/orgnaizer-address-location.svg";
import OrganizerHome from "../../../../assets/svgs/orgnaizer-home.svg";
import OrganizerDiplomat from "../../../../assets/svgs/orgnaizer-diplomat.svg";
import OrganizerVehicle from "../../../../assets/svgs/orgnaizer-vehicle.svg";
import OrganizerLocation from "../../../../assets/svgs/organizer-location.svg";
import OrganizerHands from "../../../../assets/svgs/organizer-hands.svg";
import OrganizerDocument from "../../../../assets/svgs/organizer-document.svg";
import OrganizerBag from "../../../../assets/svgs/organizer-bag.svg";
import OrganizerEducation from "../../../../assets/svgs/organizer-education.svg";
import OrganizerHealth from "../../../../assets/svgs/organizer-health.svg";
import OrganizerBuilder from "../../../../assets/svgs/organizer-builder.svg";
import OrganizerMoney from "../../../../assets/svgs/organizer-money.svg";
import OrganizerHeart from "../../../../assets/svgs/organizer-heart.svg";
import OrganizerMoneyBag from "../../../../assets/svgs/organizer-money-bag.svg";

import OrganizerBusinessBuilder from "../../../../assets/svgs/Orgnizer-business-build.svg";
import OrganizerBusinessShareholders from "../../../../assets/svgs/principal-shareholders.svg";
import OrgnaizerAddionalInformaion from "../../../../assets/svgs/additional-information.svg";
import OrganizerBusinessBooking from "../../../../assets/svgs/automated-booking.svg";
import OrganizerRelated from "../../../../assets/svgs/questions-related.svg";
import OrganizerRelatedCoraporation from "../../../../assets/svgs/questions-related-corporate.svg";
import OrganizerBusinessAsset from "../../../../assets/svgs/business-asset.svg";
import OrganizerIncomeAndCost from "../../../../assets/svgs/income-and-cost.svg";
import OrganizerBankReconcilation from "../../../../assets/svgs/bank-reconcilation.svg";
import OrganizerExpenses from "../../../../assets/svgs/expenses.svg";
export const dataState = states.map(state => ({
  label: state.name,
  value: state.name,
}));

export const radioButtons = [
  {
    label: i18n.t("organizer.business.step7.yes"),
    value: true,
  },
  {
    label: i18n.t("organizer.business.step7.no"),
    value: false,
  },
];

export const TYPE_DATE = {
  radio: "radio",
  upload: "upload",
  input: "input",
  checkbox: "checkbox",
  date: "date",
  select: "select",
};

export const INITIAL_DATA: any = {
  [ORGANIZER_CATEGORY_ID.businessEntityTaxReturn]: [],
  [ORGANIZER_CATEGORY_ID.principalShareholders]: [],
  [ORGANIZER_CATEGORY_ID.additionalInformation]: [],
  [ORGANIZER_CATEGORY_ID.questionsRelatedToAllCorporations]: [],
  [ORGANIZER_CATEGORY_ID.questionsRelatedToPartnerships]: [],
  [ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem]: [],
  [ORGANIZER_CATEGORY_ID.businessAssetSalesAndDisposition]: [],
  [ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold]: [],
  [ORGANIZER_CATEGORY_ID.bankReconcilation]: [],
  [ORGANIZER_CATEGORY_ID.expenses]: [],
  [ORGANIZER_CATEGORY_ID.taxpayerInformation1]: [],
  [ORGANIZER_CATEGORY_ID.priorYearReturnCopy]: [],
  [ORGANIZER_CATEGORY_ID.addressAsOfDec31]: [],
  [ORGANIZER_CATEGORY_ID.addressChanges]: [],
  [ORGANIZER_CATEGORY_ID.filingStatusChanges]: [],
  [ORGANIZER_CATEGORY_ID.estimatedTaxesPaid]: [],
  [ORGANIZER_CATEGORY_ID.dependents]: [],
  [ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses]: [],
  [ORGANIZER_CATEGORY_ID.w2Form]: [],
  [ORGANIZER_CATEGORY_ID.selfEmployer]: [],
  [ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses]: [],
  [ORGANIZER_CATEGORY_ID.realEstateRental]: [],
  [ORGANIZER_CATEGORY_ID.educationExpenses]: [],
  [ORGANIZER_CATEGORY_ID.income]: [],
  [ORGANIZER_CATEGORY_ID.home]: [],
  [ORGANIZER_CATEGORY_ID.homeMortgageINterest]: [],
  [ORGANIZER_CATEGORY_ID.taxesPaid]: [],
  [ORGANIZER_CATEGORY_ID.cashCharitableContributions]: [],
  [ORGANIZER_CATEGORY_ID.healthCoverage]: [],
  [ORGANIZER_CATEGORY_ID.medicalExpenses]: [],
  [ORGANIZER_CATEGORY_ID.hSADistributions]: [],
  [ORGANIZER_CATEGORY_ID.educationalExpenses]: [],
  [ORGANIZER_CATEGORY_ID.foreignAccounts]: [],
};

export const CATEGORY_ID_FILTER: ICategorizedFilter = {
  taxPayer: JSON.stringify([
    ORGANIZER_CATEGORY_ID.priorYearReturnCopy,
    ORGANIZER_CATEGORY_ID.taxpayerInformation1,
    ORGANIZER_CATEGORY_ID.taxpayerInformation2,
    ORGANIZER_CATEGORY_ID.addressAsOfDec31,
    ORGANIZER_CATEGORY_ID.addressChanges,
    ORGANIZER_CATEGORY_ID.filingStatusChanges,
    ORGANIZER_CATEGORY_ID.dependents,
    ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses,
    ORGANIZER_CATEGORY_ID.estimatedTaxesPaid,
  ]),
  income: JSON.stringify([
    ORGANIZER_CATEGORY_ID.w2Form,
    ORGANIZER_CATEGORY_ID.selfEmployer,
    ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses,
    ORGANIZER_CATEGORY_ID.realEstateRental,
    ORGANIZER_CATEGORY_ID.homeOfficeExpenses,
    ORGANIZER_CATEGORY_ID.realEstateRental,
    ORGANIZER_CATEGORY_ID.income,
    ORGANIZER_CATEGORY_ID.educationExpenses,
  ]),
  deducation: JSON.stringify([
    ORGANIZER_CATEGORY_ID.home,
    ORGANIZER_CATEGORY_ID.homeMortgageINterest,
    ORGANIZER_CATEGORY_ID.taxesPaid,
    ORGANIZER_CATEGORY_ID.cashCharitableContributions,
    ORGANIZER_CATEGORY_ID.healthCoverage,
    ORGANIZER_CATEGORY_ID.medicalExpenses,
    ORGANIZER_CATEGORY_ID.hSADistributions,
    ORGANIZER_CATEGORY_ID.educationalExpenses,
    ORGANIZER_CATEGORY_ID.foreignAccounts,
  ]),
};

export const selectData = [
  { label: "Taxpayer info", value: CATEGORY_ID_FILTER.taxPayer },
  { label: "Income", value: CATEGORY_ID_FILTER.income },
  { label: "Deductions", value: CATEGORY_ID_FILTER.deducation },
];

export const CATEGORY_ID_TITLE = {
  // Business
  [ORGANIZER_CATEGORY_ID.businessEntityTaxReturn]: {
    title: "Business Entity Tax Return",
    icon: OrganizerBusinessBuilder,
  },
  [ORGANIZER_CATEGORY_ID.principalShareholders]: {
    title: "Principal Shareholders",
    icon: OrganizerBusinessShareholders,
  },
  [ORGANIZER_CATEGORY_ID.additionalInformation]: {
    title: "Additional Information",
    icon: OrgnaizerAddionalInformaion,
  },
  [ORGANIZER_CATEGORY_ID.questionsRelatedToAllCorporations]: {
    title: "Questions Related To All Corporations",
    icon: OrganizerRelatedCoraporation,
  },
  [ORGANIZER_CATEGORY_ID.questionsRelatedToPartnerships]: {
    title: "Questions Related To Partnerships Or Partnerships Filing As An LLC",
    icon: OrganizerRelated,
  },
  [ORGANIZER_CATEGORY_ID.automatedBookkeepingSystem]: {
    title: "Automated Bookkeeping System",
    icon: OrganizerBusinessBooking,
  },
  [ORGANIZER_CATEGORY_ID.businessAssetSalesAndDisposition]: {
    title: "Business Asset Sales And Disposition",
    icon: OrganizerBusinessAsset,
  },
  [ORGANIZER_CATEGORY_ID.incomeAndCostOfGoodsSold]: {
    title: "Income & Cost Of Goods Sold",
    icon: OrganizerIncomeAndCost,
  },
  [ORGANIZER_CATEGORY_ID.bankReconcilation]: {
    title: "Bank Reconcilation",
    icon: OrganizerBankReconcilation,
  },
  [ORGANIZER_CATEGORY_ID.expenses]: {
    title: "Expenses",
    icon: OrganizerExpenses,
  },
  // TaxPayer
  [ORGANIZER_CATEGORY_ID.priorYearReturnCopy]: {
    title: "Prior year return copy",
    icon: Document,
  },
  [ORGANIZER_CATEGORY_ID.taxpayerInformation1]: {
    title: "Taxpayer information",
    icon: TaxPayerInformation,
  },
  [ORGANIZER_CATEGORY_ID.taxpayerInformation2]: {
    title: "Taxpayer information",
    icon: OrganizerIcon2,
  },
  [ORGANIZER_CATEGORY_ID.addressAsOfDec31]: {
    title: "Address (as of Dec 31)",
    icon: OrganizerLocation,
  },
  [ORGANIZER_CATEGORY_ID.addressChanges]: {
    title: "Address Change",
    icon: OrganizerAddress,
  },
  [ORGANIZER_CATEGORY_ID.dependents]: {
    title: "Dependents",
    icon: OrganizerHands,
  },
  [ORGANIZER_CATEGORY_ID.childOrDependentCareExpenses]: {
    title: "Child or Dependent Care Expenses",
    icon: OrganizerDiplomat,
  },
  [ORGANIZER_CATEGORY_ID.estimatedTaxesPaid]: { title: "Estimated Taxes Paid" },
  [ORGANIZER_CATEGORY_ID.educationExpenses]: {
    title: "Education Expenses",
    icon: OrganizerEducation,
  },
  [ORGANIZER_CATEGORY_ID.filingStatusChanges]: {
    title: "Filing Status Changes For 2021",
  },
  // Income
  [ORGANIZER_CATEGORY_ID.w2Form]: {
    title: "W-2 Form",
    icon: OrganizerDocument,
  },
  [ORGANIZER_CATEGORY_ID.selfEmployer]: {
    title: "Self Employed",
    icon: OrganizerBag,
  },
  [ORGANIZER_CATEGORY_ID.vehicleOperatingExpenses]: {
    title: "Vehic Operating Expenses",
    icon: OrganizerVehicle,
  },
  [ORGANIZER_CATEGORY_ID.realEstateRental]: {
    title: "Real Estate Rental",
    icon: OrganizerBuilder,
  },
  [ORGANIZER_CATEGORY_ID.homeOfficeExpenses]: {
    title: "Home Office Expenses",
    icon: OrganizerHome,
  },
  [ORGANIZER_CATEGORY_ID.income]: { title: "Income", icon: OrganizerMoney },

  //Deduction
  [ORGANIZER_CATEGORY_ID.home]: { title: "Home", icon: OrganizerHome },
  [ORGANIZER_CATEGORY_ID.homeMortgageINterest]: {
    title: "Home Mortgage Interest",
    icon: OrganizerHome,
  },
  [ORGANIZER_CATEGORY_ID.taxesPaid]: {
    title: "Taxes Paid",
    icon: OrganizerMoneyBag,
  },
  [ORGANIZER_CATEGORY_ID.cashCharitableContributions]: {
    title: "Cash Charitable Contributions",
    icon: OrganizerHeart,
  },
  [ORGANIZER_CATEGORY_ID.healthCoverage]: {
    title: "Health Coverege",
    icon: OrganizerHeart,
  },
  [ORGANIZER_CATEGORY_ID.medicalExpenses]: {
    title: "Medical Expenses",
    icon: OrganizerHeart,
  },
  [ORGANIZER_CATEGORY_ID.hSADistributions]: {
    title: "HSA Distributions",
    icon: OrganizerHealth,
  },
  [ORGANIZER_CATEGORY_ID.educationalExpenses]: {
    title: "Educational Expenses",
    icon: OrganizerEducation,
  },
  [ORGANIZER_CATEGORY_ID.foreignAccounts]: {
    title: "Foreign Accounts",
    icon: OrganizerBuilder,
  },
};

export const DATA_BY_KEY: any = {
  hasFiledTaxReturnPreviously: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  hasDigitalCopyInPdfFormat: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  canRequestPdfCopyForPreviousPreparer: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  businessEntity_CkeckOne_Corporation: [
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
  ],
  hasHardCopyOfTaxReturn: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  canScanTaxReturnIntoPdfFormat: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  hasMovedFromTheAddressOnThePriorYear: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  businessEntity_HavePreviouslyFiledEntityTaxReturn: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  businessEntity_SCorporationElectionLetterFile: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  didPayAnyEstimatedTaxesDuringTheYear: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  wereYouLegallyMarriedLastDayOfTheYear: [
    {
      label: i18n.t("organizer.individual.yes_flow.step1.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.yes_flow.step1.no"),
      value: false,
    },
  ],
  filingStatus: [
    {
      label: i18n.t("organizer.individual.no_flow.step1.single"),
      value: 1,
    },
    {
      label: i18n.t("organizer.individual.no_flow.step1.joint"),
      value: 2,
    },
  ],
  didTaxPayerEarnIncomeAsASelfEmployedOrSMLLC: [
    {
      label: i18n.t("organizer.individual.income.step2.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step2.no"),
      value: false,
    },
  ],
  didTaxPayerReceive_1099NEC_Misc_KForms: [
    {
      label: i18n.t("organizer.individual.income.step2.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step2.no"),
      value: false,
    },
  ],
  didTaxPayerReceiveAdditionalIncomeYouDidNotReceive_1099NEC: [
    {
      label: i18n.t("organizer.individual.income.step2.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step2.no"),
      value: false,
    },
  ],
  didSpouseEarnIncomeAsASelfEmployedOrSMLLC: [
    {
      label: i18n.t("organizer.individual.income.step2.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step2.no"),
      value: false,
    },
  ],
  didSpouseReceive_1099NEC_Misc_KForms: [
    {
      label: i18n.t("organizer.individual.income.step2.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step2.no"),
      value: false,
    },
  ],
  didSpouseReceiveAdditionalIncomeYouDidNotReceive_1099NEC: [
    {
      label: i18n.t("organizer.individual.income.step2.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step2.no"),
      value: false,
    },
  ],
  taxPayer_HaveVehicleExpensesFromBusinessOrRealEstate: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_TotalMilesDrivenThisYear: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_HaveHomeOfficeExpenses: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_HaveHomeOfficeExpenses: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayerRealEstate_OwnAnyMoreRealEstate: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouseRealEstate_OwnAnyMoreRealEstate: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_1099INTOrDIVFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_1099BFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_HaveVirtualOrCryptoCurrencyTransactions: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_1099RFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_1099SSAFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_1099GFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_ScheduleK1FormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_1099SFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_ReceiveAnyOtherTypeOfIncome: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_W2GFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_1099INTOrDIVFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_1099BFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_HaveVirtualOrCryptoCurrencyTransactions: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_1099RFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_1099SSAFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_1099GFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_ScheduleK1FormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_1099SFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_ReceiveAnyOtherTypeOfIncome: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_W2GFormDocument: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  hasDependants: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  hasEducationExpensesForYouOrDependents: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  hasForm1098TFromTheEducationInstitution: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  hasChildOrDependentCareExpenses: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_HasOwnHome: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_HasOwnHome: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_PayHomeMortgageinterest: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_Reseive1098Form: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_CashCharitableContributions_HasAnyWhereNoServicesWereReceived: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_CashCharitableContributions_ReceivedThankYouLetterOrReceipt: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_CashCharitableContributions_ReceivedThankYouLetterOrReceipt: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_CashCharitableContributions_HasAnyWhereNoServicesWereReceived: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_HealthCoverege_HasHealthCoverege: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_MedicalExpenses_InsurancePremiums_2ndPage: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_HSADistributions_ReceiveAnyHealthSavings: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_EductaxPayer_EducationalExpenses_HasQualifiedEducationExpenses: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_EducationalExpenses_HasStudentLoanInterestPayments: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouse_EducationalExpenses_HasQualifiedEducationExpenses: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayer_ForeignAccounts_HasForeignBankAccounts: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  taxPayerMonthlyMortgagePayments: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  spouseMonthlyMortgagePayments: [
    {
      label: i18n.t("organizer.individual.income.step5.yes"),
      value: true,
    },
    {
      label: i18n.t("organizer.individual.income.step5.no"),
      value: false,
    },
  ],
  haveMarriageStatusChangedSinceLastFiledReturn: [
    {
      label: t("organizer.individual.yes_flow.step3.no_change_last_year"),
      value: 0,
      hasDate: false,
    },
    {
      label: t("organizer.individual.yes_flow.step3.married"),
      value: 1,
      hasDate: true,
    },
    {
      label: t("organizer.individual.yes_flow.step3.separated"),
      value: 2,
      hasDate: true,
    },
    {
      label: t("organizer.individual.yes_flow.step3.divorced"),
      value: 3,
      hasDate: true,
    },
  ],
  taxPayer_MedicalExpenses: [
    {
      label: "INSURANCE PREMIUMS for Medical, Dental, Vision & Hospital ",
      value: 0,
    },
    {
      label: "Medicare Insurance Premiums (Not payroll tax)",
      value: 1,
    },
    {
      label: "Long-Term Care Insurance",
      value: 2,
    },
    {
      label:
        "Hospitals, Doctors, Dentists,  Chiropractors, eye exams, therapy and special needs services and other medical professionals and co payments",
      value: 3,
    },
    {
      label: "Prescription Drugs, medical supplies, including PPE. ",
      value: 4,
    },
    {
      label:
        "Transportation services, air fare and lodging  (for medical treatment) to and from treatment centers.",
      value: 5,
    },
    {
      label:
        "Rentals (crutches, wheelchair, walker, oxygen equipment, medical required home improvements and placards for the Disabled.etc.)",
      value: 6,
    },
  ],
  spouse_MedicalExpenses: [
    {
      label: "INSURANCE PREMIUMS for Medical, Dental, Vision & Hospital ",
      value: 0,
    },
    {
      label: "Medicare Insurance Premiums (Not payroll tax)",
      value: 1,
    },
    {
      label: "Long-Term Care Insurance",
      value: 2,
    },
    {
      label:
        "Hospitals, Doctors, Dentists,  Chiropractors, eye exams, therapy and special needs services and other medical professionals and co payments",
      value: 3,
    },
    {
      label: "Prescription Drugs, medical supplies, including PPE. ",
      value: 4,
    },
    {
      label:
        "Transportation services, air fare and lodging  (for medical treatment) to and from treatment centers.",
      value: 5,
    },
    {
      label:
        "Rentals (crutches, wheelchair, walker, oxygen equipment, medical required home improvements and placards for the Disabled.etc.)",
      value: 6,
    },
  ],
};
