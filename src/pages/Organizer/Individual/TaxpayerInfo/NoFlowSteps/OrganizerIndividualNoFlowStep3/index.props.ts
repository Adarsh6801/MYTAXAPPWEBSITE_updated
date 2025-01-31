export type DataOfKey =
  | "taxPayerImagesOfDriversLicense"
  | "taxPayerDontHaveDriversLicense"
  | "taxPayerAlternateFormOfIDVerification"
  | "taxPayerHaveDriversLicenseButCanNotProvideImage"
  | "taxPayerImagesOfDriversLicense"
  | "taxPayerState"
  | "taxPayerIssuedDate"
  | "taxPayerExpires"
  | "spouseImagesOfDriversLicense"
  | "spouseDontHaveDriversLicense"
  | "spouseAlternateFormOfIDVerification"
  | "spouseDriversLicense"
  | "spouseState"
  | "spouseIssuedDate"
  | "spouseExpires";

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
}
