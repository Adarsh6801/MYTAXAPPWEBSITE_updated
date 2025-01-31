interface IUser {
  id: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  mayCallDirectly: boolean;
}

export interface IRequestState {
  individual?: IIndividualRequestData[];
  business?: IBusinessRequestData[];
  sentQuotes?: any[];
  loading: boolean;
  error?: Error;
}

export interface IBusinessRequestData {
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
  user: IUser;
  createdDate: string;
}

export interface IIndividualRequestData {
  id: number;
  taxPreparationTypeId: number;
  country: string;
  state: string;
  isMarried: boolean;
  isOwnHome: true;
  deductionTypeId: number;
  lastYearPreparedExpertId: number;
  reasonToLookNewPreparer: string;
  factorThatHelpYouHirePreparer: string;
  fromWhereKnowMytaxapp: number;
  lastYearPreparationCostId: number;
  anythingElseForPreparer: string;
  areYouLookingServiceToDropDocuments: true;
  areYouAbleToDigitalizeDocuments: true;
  areYouOkWithVirtualMeetings: true;
  user: IUser;
  createdDate: string;
}

export interface ISendQuotePayload {
  isIndividual: boolean;
  taxPreparationId: number;
  price: string;
  priceListAttachment: any;
  attachStandardPricingList: boolean;
}

export interface ISentQuoteData {
  quoteId: number;
  taxPreparationId: number;
  taxpayerId: number;
  jobType: string;
  taxpayerFirstName: string;
  taxpayerLastName: string;
  createdDate: string;
  price: string;
  priceAttachment: {
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
  statusId: number;
  actionStatusId: number;
  individualTaxPreparationResult: IIndividualRequestData;
  businessTaxPreparationResult: IBusinessRequestData;
}
