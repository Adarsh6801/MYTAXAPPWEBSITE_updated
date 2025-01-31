import i18n from "../i18n";
import { ACTION_STATUS, JOB_STATUS, QUOTE_STATUS } from "../constants/status";
import {
  ACCOUNTING_SOFTWARE,
  DEDUCTION_TYPES,
  LAST_YEAR_PREPARATION_TYPES,
  MONTHLY_FINANCIAL_STATEMENT_REPORT,
  PERSONAL_CARD_BUSINESS_TRANSACTIONS,
  THIRD_PARTY_PAYMENT_PROCESSOR_TYPE,
  TRANSACTIONS_RECONCILED_MONTHLY,
  TRANSACTIONS_RECONCILE_HELPER_TYPES,
} from "../constants/initialQuestions";

export const getActionStatus = (statusCode: number) => {
  switch (statusCode) {
    case ACTION_STATUS.CONFIRMED:
      return {
        color: "success",
        text: "Confirmed",
      };
    case ACTION_STATUS.DECLINED:
      return {
        color: "error",
        text: "Declined",
      };
    case ACTION_STATUS.CHOSEN_WAITING_FOR_INFORMATION:
      return {
        color: "warning",
        text: "Waiting for information",
      };
    default:
      return {
        color: "default",
        text: "N/A",
      };
  }
};

export const getQuoteStatus = (statusCode: number) => {
  switch (statusCode) {
    case QUOTE_STATUS.ACCEPTED:
      return {
        color: "success",
        text: "Accepted",
      };
    case QUOTE_STATUS.PENDING:
      return {
        color: "warning",
        text: "Pending",
      };
    case QUOTE_STATUS.NOT_ACCEPTED:
      return {
        color: "error",
        text: "Not accepted",
      };
    default:
      return {
        color: "default",
        text: "N/A",
      };
  }
};

export const getJobStatus = (statusCode: number) => {
  switch (statusCode) {
    case JOB_STATUS.NOT_STARTED:
      return {
        color: "error",
        text: "Not started",
      };
    case JOB_STATUS.FILLED:
      return {
        color: "success",
        text: "Filled",
      };
    case JOB_STATUS.IN_FOR_REVIEW:
      return {
        color: "purple",
        text: "In for review",
      };
    case JOB_STATUS.IN_PROCESS:
      return {
        color: "warning",
        text: "IN PROCESS",
      };
    case JOB_STATUS.WAITING_FOR_INFORMATION:
      return {
        color: "warning",
        text: "Waiting for information",
      };
    default:
      return {
        color: "default",
        text: "N/A",
      };
  }
};

export const getDeductionType = (typeId: number) => {
  switch (typeId) {
    case DEDUCTION_TYPES.ITEMIZE:
      return `Deduction: ${i18n.t("individual.step4.answer1")}`;
    case DEDUCTION_TYPES.STANDARD:
      return `Deduction: ${i18n.t("individual.step4.answer2")}`;
    case DEDUCTION_TYPES.IDK:
    default:
      return `Deduction: ${i18n.t("individual.step4.answer3")}`;
  }
};

export const getPreviousReturnPreparation = (expertId: number) => {
  switch (expertId) {
    case LAST_YEAR_PREPARATION_TYPES.SELF_PREPARED:
      return `Previous return prepared: ${i18n.t("individual.step5.answer1")}`;
    case LAST_YEAR_PREPARATION_TYPES.CPA:
      return `Previous return prepared: ${i18n.t("individual.step5.answer2")}`;
    case LAST_YEAR_PREPARATION_TYPES.ENROLLED_AGENT:
      return `Previous return prepared: ${i18n.t("individual.step5.answer3")}`;
    case LAST_YEAR_PREPARATION_TYPES.TAX_PREPARER:
      return `Previous return prepared: ${i18n.t("individual.step5.answer4")}`;
    case LAST_YEAR_PREPARATION_TYPES.OTHER:
      return `Previous return prepared: ${i18n.t("individual.step5.answer5")}`;
    default:
      return "Previous return prepared with someone else";
  }
};

export const getAccountingSoftware = (id: number) => {
  switch (id) {
    case ACCOUNTING_SOFTWARE.QUICK_BOOKS:
      return "Using accounting software (Quickbooks)";
    case ACCOUNTING_SOFTWARE.XERO:
      return "Using accounting software (XERO)";
    case ACCOUNTING_SOFTWARE.EXCEL:
      return "Using accounting software (EXCEL)";
    case ACCOUNTING_SOFTWARE.OTHER:
      return "Using accounting software (OTHER)";
    case ACCOUNTING_SOFTWARE.IDK:
      return "Using accounting software (IDK)";
    default:
      return null;
  }
};

export const getPersonalCreditCardBusinessTransactions = (id: number) => {
  switch (id) {
    case PERSONAL_CARD_BUSINESS_TRANSACTIONS.YES:
      return "Have business transactions on a personal credit card";
    case PERSONAL_CARD_BUSINESS_TRANSACTIONS.NO:
      return "Don’t have business transactions on a personal credit card";
    case PERSONAL_CARD_BUSINESS_TRANSACTIONS.IDK:
      return "Don’t know if business transactions on a personal credit card exist ";
    default:
      return null;
  }
};

export const getTransactionReconciledMonthly = (id: number) => {
  switch (id) {
    case TRANSACTIONS_RECONCILED_MONTHLY.YES:
      return "Have bank and credit card transactions reconciled on a monthly basis";
    case TRANSACTIONS_RECONCILED_MONTHLY.NO:
      return "Don’t have bank and credit card transactions reconciled on a monthly basis";
    case TRANSACTIONS_RECONCILED_MONTHLY.IDK:
      return "Don’t know if bank and credit card transactions reconciled on a monthly basis";
    default:
      return null;
  }
};

export const getTransactionsReconcileHelperType = (id: number) => {
  switch (id) {
    case TRANSACTIONS_RECONCILE_HELPER_TYPES.ACCOUNTANT:
      return "Uses accountant services to reconcile the transactions";
    case TRANSACTIONS_RECONCILE_HELPER_TYPES.BOOKKEEPER:
      return "Uses bookkeeper services to reconcile the transactions";
    case TRANSACTIONS_RECONCILE_HELPER_TYPES.CONSULTANT:
      return "Uses consultant services to reconcile the transactions";
    case TRANSACTIONS_RECONCILE_HELPER_TYPES.SOMEONE_ELSE:
      return "Uses someone’s services to reconcile the transactions";
    default:
      return null;
  }
};

export const getMonthlyFinancialStatementReport = (id: number) => {
  switch (id) {
    case MONTHLY_FINANCIAL_STATEMENT_REPORT.YES:
      return "Got a monthly financial statement report from my provider";
    case MONTHLY_FINANCIAL_STATEMENT_REPORT.NO:
      return "Didn’t get a monthly financial statement report from my provider";
    case MONTHLY_FINANCIAL_STATEMENT_REPORT.IDK:
      return "IDK if monthly financial statement report exists";
    default:
      return null;
  }
};

export const getThirdPartyPaymentProcessorType = (id: number) => {
  switch (id) {
    case THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.OTHER:
      return "Uses third party payment processor (Other)";
    case THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.PAYPAL:
      return "Uses third party payment processor (Paypal)";
    case THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.SQUARE:
      return "Uses third party payment processor (Square)";
    case THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.STRIPE:
      return "Uses third party payment processor (Stripe)";
    case THIRD_PARTY_PAYMENT_PROCESSOR_TYPE.ZELLE:
      return "Uses third party payment processor (Zelle)";
    default:
      return null;
  }
};
