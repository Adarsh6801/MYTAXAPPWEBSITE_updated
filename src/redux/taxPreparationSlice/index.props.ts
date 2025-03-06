type JobType = "Personal" | "Business";

interface ITaxReturnFile {
  id: number;
  createdDate: string;
  createdBy: number;
  createdSessionId: number;
  modifiedDate: string;
  modifiedBy: number;
  modifiedSessionId: number;
  name: string;
  uniqName: string;
  taxPreparationYear?:string;
  path: string;
}

export interface ITaxPayerTaxPreparationData {
  quoteId: number;
  taxPreparationId: number;
  accountantId: number;
  accountantFirstName: string;
  accountantLastName: string;
  jobType: JobType;
  createdDate: string;
  taxPreparationYear?:string;
  price: string;
  jobStatusId: number;
  taxReturnFile: ITaxReturnFile;
}

export interface IAccountantTaxPreparationData {
  quoteId: number;
  taxPreparationId: number;
  taxpayerId: number;
  taxpayerFirstName: string;
  taxpayerLastName: string;
  createdDate: string;
  jobType: JobType;
  fee: string;
  jobStatusId: number;
  taxReturnFile: ITaxReturnFile;
}

export interface ITaxPreparationState {
  accountantData?: IAccountantTaxPreparationData[];
  taxpayerData?: ITaxPayerTaxPreparationData[];
  loading: boolean;
  error?: Error;
}

export interface IUploadTaxReturnFilePayload {
  quoteId: number;
  taxReturn: any;
}
