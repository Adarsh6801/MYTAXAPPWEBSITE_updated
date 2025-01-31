export type DataOfKey =
  | "hasFiledTaxReturnPreviously"
  | "hasDigitalCopyInPdfFormat"
  | "canRequestPdfCopyForPreviousPreparer"
  | "previousTaxReturnFileUpload"
  | "hasHardCopyOfTaxReturn"
  | "canScanTaxReturnIntoPdfFormat";

export interface IQuestionContainer {
  question: string;
  key: string;
  children: React.ReactNode;
  required?: boolean;
}
