import { DataOfKey as DataOfKeyStep2 } from "../pages/Organizer/Individual/TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep2/index.props";
import { DataOfKey as DataOfKeyStep3 } from "../pages/Organizer/Individual/TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep3/index.props";
import { DataOfKey as DataOfKeyStep4 } from "../pages/Organizer/Individual/TaxpayerInfo/NoFlowSteps/OrganizerIndividualNoFlowStep4/index.props";

interface IPROPERTIES_NUMBER {
  [key: string]: number;
}

interface IPROPERTIES_STRING {
  [key: string]: string;
}

interface IHoursModal {
  [key: number]: {
    value: number;
    label: string;
  };
}

export const QUESTION_TYPE_ANSWER: IPROPERTIES_NUMBER = {
  notDefinded: 0,
  number: 1,
  string: 2,
  boolean: 3,
  date: 4,
  json: 5,
  file: 6,
  checkbox: 7,
  radio: 8,
};

export const HOURS_MODAL: IHoursModal = {
  0: {
    value: 0,
    label: "0:30",
  },
  1: {
    value: 1,
    label: "1:30",
  },
  2: {
    value: 2,
    label: "2:30",
  },
  3: {
    value: 3,
    label: "3:30",
  },
  4: {
    value: 4,
    label: "4:30",
  },
  5: {
    value: 5,
    label: "5:30",
  },
  6: {
    value: 6,
    label: "6:30",
  },
  7: {
    value: 7,
    label: "7:30",
  },
  8: {
    value: 8,
    label: "8:30",
  },
  9: {
    value: 9,
    label: "9:30",
  },
  10: {
    value: 10,
    label: "10:30",
  },
  11: {
    value: 11,
    label: "11:30",
  },
  12: {
    value: 12,
    label: "12:30",
  },
  13: {
    value: 13,
    label: "13:30",
  },
  14: {
    value: 14,
    label: "14:30",
  },
  15: {
    value: 15,
    label: "15:30",
  },
  16: {
    value: 16,
    label: "16:30",
  },
  17: {
    value: 17,
    label: "17:30",
  },
  18: {
    value: 18,
    label: "18:30",
  },
  19: {
    value: 19,
    label: "19:30",
  },
  20: {
    value: 20,
    label: "20:30",
  },
  21: {
    value: 21,
    label: "21:30",
  },
  22: {
    value: 22,
    label: "22:30",
  },
  23: {
    value: 23,
    label: "23:30",
  },
};

export const namesSpouseFields: IPROPERTIES_STRING = {
  businessName: "spouseBusinessName",
  employerIDNumber: "spouseBusiness_EmployerIDNumber",
  selfEmployedHealthInsuranceCost:
    "spouseBusiness_SelfEmployedHealthInsuranceCost",
  grossIncome: "spouseBusiness_GrossIncome",
  returnsAllowances: "spouseBusiness_ReturnsAndAllowances",
  beginningInventory: "spouseBusiness_BeginningInventory",
  additionsInventory: "spouseBusiness_AdditionsToInventory",
  endingInventory: "spouseBusiness_EndingInventory",
  advertising: "spouseBusinessExpense_Advertising",
  commissionsAndFees: "spouseBusinessExpense_CommissionsandFees",
  contractLabor: "spouseBusinessExpense_ContractLabor",
  duesPublications: "spouseBusinessExpense_DuesAndPublications",
  businessMeals: "spouseBusinessExpense_Meals",
  employeeBenefitPrograms: "spouseBusinessExpense_EmployeeBenefitPrograms",
  employeeHealthBenefitPlans:
    "spouseBusinessExpense_EmployeeHealthBenefitPlans",
  equipment: "spouseBusinessExpense_Equipment",
  freight: "spouseBusinessExpense_Freight",
  gifts: "spouseBusinessExpense_Gifts",
  insuranceNotHealth: "spouseBusinessExpense_InsuranceNotHealth",
  interestMortgage: "spouseBusinessExpense_InterestMortgage",
  interestOther: "spouseBusinessExpense_InterestOther",
  businessInternetService: "spouseBusinessExpense_BusinessInternetService",
  leaseImprovements: "spouseBusinessExpense_LeaseImprovements",
  legalProfessional: "spouseBusinessExpense_LegalProfessional",
  licenses: "spouseBusinessExpense_Licenses",
  officeExpense: "spouseBusinessExpense_OfficeExpense",
  pensionPlanFees: "spouseBusinessExpense_PensionPlanFees",
  rentEquipment: "spouseBusinessExpense_RentEquipment",
  rentOther: "spouseBusinessExpense_RentOther",
  repairs: "spouseBusinessExpense_Repairs",
  supplies: "spouseBusinessExpense_Supplies",
  taxesPayroll: "spouseBusinessExpense_TaxesPayroll",
  taxesSales: "spouseBusinessExpense_TaxesSales",
  taxesProperty: "spouseBusinessExpense_TaxesProperty",
  businessTelephone: "spouseBusinessExpense_BusinessTelephone",
  utilities: "spouseBusinessExpense_Utilities",
  wages: "spouseBusinessExpense_Wages",
  otherExpenses: "spouseBusinessExpense_Other",
};

export const namesTaxPayerFields: IPROPERTIES_STRING = {
  businessName: "taxPayerBusinessName",
  employerIDNumber: "taxPayerBusiness_EmployerIDNumber",
  selfEmployedHealthInsuranceCost:
    "taxPayerBusiness_SelfEmployedHealthInsuranceCost",
  grossIncome: "taxPayerBusiness_GrossIncome",
  returnsAllowances: "taxPayerBusiness_ReturnsAndAllowances",
  beginningInventory: "taxPayerBusiness_BeginningInventory",
  additionsInventory: "taxPayerBusiness_AdditionsToInventory",
  endingInventory: "taxPayerBusiness_EndingInventory",
  advertising: "taxPayerBusinessExpense_Advertising",
  commissionsAndFees: "taxPayerBusinessExpense_CommissionsandFees",
  contractLabor: "taxPayerBusinessExpense_ContractLabor",
  duesPublications: "taxPayerBusinessExpense_DuesAndPublications",
  businessMeals: "taxPayerBusinessExpense_Meals",
  employeeBenefitPrograms: "taxPayerBusinessExpense_EmployeeBenefitPrograms",
  employeeHealthBenefitPlans:
    "taxPayerBusinessExpense_EmployeeHealthBenefitPlans",
  equipment: "taxPayerBusinessExpense_Equipment",
  freight: "taxPayerBusinessExpense_Freight",
  gifts: "taxPayerBusinessExpense_Gifts",
  insuranceNotHealth: "taxPayerBusinessExpense_InsuranceNotHealth",
  interestMortgage: "taxPayerBusinessExpense_InterestMortgage",
  interestOther: "taxPayerBusinessExpense_InterestOther",
  businessInternetService: "taxPayerBusinessExpense_BusinessInternetService",
  leaseImprovements: "taxPayerBusinessExpense_LeaseImprovements",
  legalProfessional: "taxPayerBusinessExpense_LegalProfessional",
  licenses: "taxPayerBusinessExpense_Licenses",
  officeExpense: "taxPayerBusinessExpense_OfficeExpense",
  pensionPlanFees: "taxPayerBusinessExpense_PensionPlanFees",
  rentEquipment: "taxPayerBusinessExpense_RentEquipment",
  rentOther: "taxPayerBusinessExpense_RentOther",
  repairs: "taxPayerBusinessExpense_Repairs",
  supplies: "taxPayerBusinessExpense_Supplies",
  taxesPayroll: "taxPayerBusinessExpense_TaxesPayroll",
  taxesSales: "taxPayerBusinessExpense_TaxesSales",
  taxesProperty: "taxPayerBusinessExpense_TaxesProperty",
  businessTelephone: "taxPayerBusinessExpense_BusinessTelephone",
  utilities: "taxPayerBusinessExpense_Utilities",
  wages: "taxPayerBusinessExpense_Wages",
  otherExpenses: "taxPayerBusinessExpense_Other",
};

export const TAX_PAYER_NAMES: DataOfKeyStep2[] = [
  "taxPayerFirstName",
  "taxPayerMiddleInitial",
  "taxPayerBirthday",
  "taxPayerSocialSecurityNo",
  "taxPayerLastName",
  "taxPayerOccupation",
  "taxPayerMobileNumber",
  "isTaxPayerLegallyBlind",
];

export const SPOUSE_NAMES: DataOfKeyStep2[] = [
  "spouseFirstName",
  "spouseMiddleInitial",
  "spouseBirthday",
  "spouseSocialSecurityNo",
  "spouseLastName",
  "spouseOccupation",
  "spouseMobileNumber",
  "isSpouseLegallyBlind",
];

export const TAX_PAYER_NAMES_DRIVER_LICENSE: DataOfKeyStep3[] = [
  "taxPayerImagesOfDriversLicense",
  "taxPayerDontHaveDriversLicense",
  "taxPayerAlternateFormOfIDVerification",
  "taxPayerImagesOfDriversLicense",
  "taxPayerState",
  "taxPayerIssuedDate",
  "taxPayerExpires",
];

export const SPOUSE_NAMES_DRIVER_LICENSE: DataOfKeyStep3[] = [
  "spouseImagesOfDriversLicense",
  "spouseDontHaveDriversLicense",
  "spouseAlternateFormOfIDVerification",
  "spouseAlternateFormOfIDVerification",
  "spouseDriversLicense",
  "spouseState",
  "spouseIssuedDate",
  "spouseExpires",
];

export const TAX_PAYER_NAMES_AS_DES_31: DataOfKeyStep4[] = [
  "streetAsOfDec31",
  "unitNoAsOfDec31",
  "zipCodeAsOfDec31",
  "stateAsOfDec31",
  "cityAsOfDec31",
  "homePhoneNumberAsOfDec31",
];

export const SPOUSE_NAMES_AS_DES_31: DataOfKeyStep4[] = [
  "spouseStreetAsOfDec31",
  "spouseUnitNoAsOfDec31",
  "spouseZipCodeAsOfDec31",
  "spouseStateAsOfDec31",
  "spouseCityAsOfDec31",
  "spouseHomePhoneNumberAsOfDec31",
];

export const formInfoTaxPayerKeysStep3: string[] = [
  "bankName",
  "bankRoutingNumber",
  "accountNumber",
  "accountType",
  "accountAllocation",
];

export const formInfoSpouseKeysStep3: string[] = [
  "spouseBankName",
  "spouseBankRoutingNumber",
  "spouseAccountNumber",
  "spouseAccountType",
  "spouseAccountAllocation",
];

export const formInfoTaxPayerKeysStep6: string[] = [
  "taxPayerEIPAmount",
  "taxPayerIRSAmount",
  "taxPayerIRSFile",
  "taxPayerCoverdellEducationAccountFile",
  "taxPayerSec529TuitionPlan_Contribution",
  "taxPayerSec529TuitionPlan_Distribution",
  "taxPayerSec529TuitionPlan_1099_QFile",
  "taxPayerHSA_ContributionOtherThenViaEmployer",
  "taxPayerHSA_Distribution",
  "taxPayerHSA_1099_SAFile",
  "taxPayerChild_AdoptionExpenses",
  "taxPayerChild_SpecialNeedsChild",
  "taxPayerChild_EducatorExpenses",
];

export const formInfoSpouseKeysStep6: string[] = [
  "spouseEIPAmount",
  "spouseIRSAmount",
  "spouseIRSFile",
  "spouseCoverdellEducationAccountFile",
  "spouseSec529TuitionPlan_Contribution",
  "spouseSec529TuitionPlan_Distribution",
  "spouseSec529TuitionPlan_1099_QFile",
  "spouseHSA_ContributionOtherThenViaEmployer",
  "spouseHSA_Distribution",
  "spouseHSA_1099_SAFile",
  "spouseChild_AdoptionExpenses",
  "spouseChild_SpecialNeedsChild",
  "spouseChild_EducatorExpenses",
];

export const taxpayerCheckbox: string[] = [
  "checkboxEipReceived",
  "checkboxIRS",
  "checkboxCEA",
  "checkboxEipAmount",
  "checkboxHsa",
  "checkboxChild",
];

export const spouseCheckbox: string[] = [
  "spouseCheckboxEipReceived",
  "spouseCheckboxIRS",
  "spouseCheckboxCEA",
  "spouseCheckboxEipAmount",
  "spouseCheckboxHsa",
  "spouseCheckboxChild",
];

export const taxPayerDynamic: string[] = [
  "taxPayerRealEstate_AddressOrDescription",
  "taxPayerRealEstate_Type",
  "taxPayerRealEstate_RentalIncome",
  "taxPayerRealEstate_ProvideAny1099ks",
  "taxPayerRealEstate_PercentOwnership",
  "taxPayerRealEstate_IsVocationHome",
  "taxPayerRealEstate_NumberOfDaysPersonallyUsed",
  "taxPayerRealEstate_NumberOfRentalDays",
];

export const taxPayerStatic: string[] = [
  "taxPayerRealEstateExpenses_Advertising",
  "taxPayerRealEstateExpenses_CleaningAndMaintenance",
  "taxPayerRealEstateExpenses_Commissions",
  "taxPayerRealEstateExpenses_Insurance",
  "taxPayerRealEstateExpenses_Professional",
  "taxPayerRealEstateExpenses_LegalAndFees",
  "taxPayerRealEstateExpenses_ManagementFees",
  "taxPayerRealEstateExpenses_MortgageInterestPaidToBanks",
  "taxPayerRealEstateExpenses_OtherInterest",
  "taxPayerRealEstateExpenses_SuppliesHardwareEtc",
  "taxPayerRealEstateExpenses_Repairs",
  "taxPayerRealEstateExpenses_TaxesProperty",
  "taxPayerRealEstateExpenses_TaxesPayroll",
  "taxPayerRealEstateExpenses_Utilities",
  "taxPayerRealEstateExpenses_Wages",
  "taxPayerRealEstateExpenses_CondoOrHomeownerAssociationDues",
  "taxPayerRealEstateExpenses_ForShortTermRentals",
];

export const spouseDynamic: string[] = [
  "spouseRealEstate_AddressOrDescription",
  "spouseRealEstate_RentalIncome",
  "spouseRealEstate_ProvideAny1099ks",
  "spouseRealEstate_PercentOwnership",
  "spouseRealEstate_IsVocationHome",
  "spouseRealEstate_RentalIncome",
];

export const spouseStatic: string[] = [
  "spouseRealEstateExpenses_Advertising",
  "spouseRealEstateExpenses_CleaningAndMaintenance",
  "spouseRealEstateExpenses_Commissions",
  "spouseRealEstateExpenses_Insurance",
  "spouseRealEstateExpenses_Professional",
  "spouseRealEstateExpenses_LegalAndFees",
  "spouseRealEstateExpenses_ManagementFees",
  "spouseRealEstateExpenses_MortgageInterestPaidToBanks",
  "spouseRealEstateExpenses_OtherInterest",
  "spouseRealEstateExpenses_SuppliesHardwareEtc",
  "spouseRealEstateExpenses_Repairs",
  "spouseRealEstateExpenses_TaxesProperty",
  "spouseRealEstateExpenses_TaxesPayroll",
  "spouseRealEstateExpenses_Utilities",
  "spouseRealEstateExpenses_Wages",
  "spouseRealEstateExpenses_CondoOrHomeownerAssociationDues",
  "spouseRealEstateExpenses_ForShortTermRentals",
];

export const ORGANIZER_CATEGORY_ID: IPROPERTIES_NUMBER = {
  businessEntityTaxReturn: 1,
  principalShareholders: 2,
  additionalInformation: 3,
  questionsRelatedToAllCorporations: 4,
  questionsRelatedToPartnerships: 40,
  automatedBookkeepingSystem: 5,
  businessAssetSalesAndDisposition: 6,
  incomeAndCostOfGoodsSold: 7,
  bankReconcilation: 8,
  expenses: 9,

  home: 10,
  homeMortgageINterest: 11,
  taxesPaid: 12,
  cashCharitableContributions: 13,
  healthCoverage: 14,
  medicalExpenses: 15,
  hSADistributions: 16,
  educationalExpenses: 17,
  foreignAccounts: 18,
  w2Form: 19,
  selfEmployer: 20,
  vehicleOperatingExpenses: 21,
  homeOfficeExpenses: 22,
  realEstateRental: 23,
  income: 24,

  priorYearReturnCopy: 25,
  taxpayerInformation1: 26,
  taxpayerInformation2: 27,
  addressAsOfDec31: 28,
  addressChanges: 29,
  filingStatusChanges: 30,
  dependents: 31,
  childOrDependentCareExpenses: 32,
  educationExpenses: 33,
  estimatedTaxesPaid: 34,
  additionalQuestions: 35,
  refoundDirectDeposit: 36,
};
