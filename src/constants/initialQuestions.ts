// TaxPayer
export const TAX_PREPARATION_TYPES = {
  INDIVIDUAL: 1,
  BUSINESS_ENTITY: 2,
  BOTH: 3,
};

export const INCOME_TYPES = {
  FORM_W2: 1,
  FORM_1099NEC_1099K: 2,
  FORM_K1: 3,
  FORM_1099B_1099INT_1099DIV: 4,
  RENTAL_PROPERTIES: 5,
  FORM_SSA_1099R: 6,
  FORM_OTHER: 7,
};

export const DEDUCTION_TYPES = {
  ITEMIZE: 1,
  STANDARD: 2,
  IDK: 3,
};

export const LAST_YEAR_PREPARATION_TYPES = {
  SELF_PREPARED: 1,
  CPA: 2,
  ENROLLED_AGENT: 3,
  TAX_PREPARER: 4,
  OTHER: 5,
};

export const LAST_YEAR_PREPARATION_COSTS = {
  UP_TO_250: 1,
  UP_TO_500: 2,
  UP_TO_750: 3,
  OVER_750: 4,
  NOT_REMEMBER: 5,
};

export const ACCOUNTING_SOFTWARE = {
  QUICK_BOOKS: 1,
  XERO: 2,
  EXCEL: 3,
  OTHER: 4,
  IDK: 5,
};

export const PERSONAL_CARD_BUSINESS_TRANSACTIONS = {
  YES: 1,
  NO: 2,
  IDK: 3,
};

export const TRANSACTIONS_RECONCILED_MONTHLY = {
  YES: 1,
  NO: 2,
  IDK: 3,
};

export const TRANSACTIONS_RECONCILE_HELPER_TYPES = {
  BOOKKEEPER: 1,
  ACCOUNTANT: 2,
  CONSULTANT: 3,
  SOMEONE_ELSE: 4,
};

export const MONTHLY_FINANCIAL_STATEMENT_REPORT = {
  YES: 1,
  NO: 2,
  IDK: 3,
};

export const THIRD_PARTY_PAYMENT_PROCESSOR_TYPE = {
  PAYPAL: 1,
  SQUARE: 2,
  STRIPE: 3,
  ZELLE: 4,
  OTHER: 5,
};

// Expert
export const TAX_PREPARER_TYPE = {
  ATTORNEY: 1,
  CPA: 2,
  ENROLLED_AGENT: 3,
  REGISTERED_TAX_PREPARER: 4,
};
