interface IUser {
  id: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  mayCallDirectly: boolean;
}

export interface ITaxPayerQuoteData {
  quoteId: number;
  taxPreparationId: number;
  accountantId: number;
  accountantFirstName: string;
  accountantLastName: string;
  createdDate: string;
  price: string;
  jobType: string;
  priceAttachment?: {
    id: number;
    createdDate: string;
    createdBy: number;
    createdSessionId: number;
    modifiedDate: string;
    modifiedBy: number;
    modifiedSessionId: number;
    name: string;
    uniqName: string;
    path: string;
  };
  actionStatusId: number;
  avatar: string;
  stars: number;
}

export interface ITaxPayerBusinessQuoteRequest {
  id: number;
  taxPreparationTypeId: number;
  fieldPreviousEntityReturnBefore: boolean;
  haveLastYearEntityReturnInPDF: boolean;
  entityMembersCount: number;
  businessTransactionAccountingSoftwareId: number;
  businessCheckingAccountsCount: number;
  businessCreditCardsCount: number;
  businessCheckingTransactionsCount: number;
  businessCreditCardTransactionsCount: number;
  haveBusinessTransactionsOnPersonalCard: number;
  haveCardTransactionsReconciledOnMonthlyBasis: number;
  transactionsReconcileHelperId: number;
  getMonthlyFinancialReportFromProvider: number;
  haveLastMonthFinancialStatement: boolean;
  closedBooksForWhichRequestingTaxService: boolean;
  sendInvoicesToGetPaid: boolean;
  thirdPartyPaymentProcessorId: number;
  createdDate: string;
  user: IUser;
}

export interface ITaxPayerBusinessQuoteRequest {
  id: number;
  taxPreparationTypeId: number;
  fieldPreviousEntityReturnBefore: boolean;
  haveLastYearEntityReturnInPDF: boolean;
  entityMembersCount: number;
  businessTransactionAccountingSoftwareId: number;
  businessCheckingAccountsCount: number;
  businessCreditCardsCount: number;
  businessCheckingTransactionsCount: number;
  businessCreditCardTransactionsCount: number;
  haveBusinessTransactionsOnPersonalCard: number;
  haveCardTransactionsReconciledOnMonthlyBasis: number;
  transactionsReconcileHelperId: number;
  getMonthlyFinancialReportFromProvider: number;
  haveLastMonthFinancialStatement: boolean;
  closedBooksForWhichRequestingTaxService: boolean;
  sendInvoicesToGetPaid: boolean;
  thirdPartyPaymentProcessorId: number;
  createdDate: string;
  user: IUser;
}

export interface ITaxPayerIndividualQuoteRequest {
  id: number;
  taxPreparationTypeId: number;
  country: string;
  state: string;
  isMarried: boolean;
  isOwnHome: boolean;
  deductionTypeId: number;
  lastYearPreparedExpertId: number;
  reasonToLookNewPreparer: string;
  factorThatHelpYouHirePreparer: string;
  fromWhereKnowMytaxapp: number;
  lastYearPreparationCostId: number;
  anythingElseForPreparer: string;
  areYouLookingServiceToDropDocuments: boolean;
  areYouAbleToDigitalizeDocuments: boolean;
  areYouOkWithVirtualMeetings: boolean;
  createdDate: string;
  user: IUser;
}

export interface ITaxPayerQuoteState {
  data?: ITaxPayerQuoteData[];
  individualQuoteRequests?: ITaxPayerIndividualQuoteRequest[];
  businessQuoteRequests?: ITaxPayerBusinessQuoteRequest[];
  loading: boolean;
  error?: Error;
}
