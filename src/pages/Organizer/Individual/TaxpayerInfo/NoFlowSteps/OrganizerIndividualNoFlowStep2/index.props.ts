export type DataOfKey =
  | "taxPayerFirstName"
  | "taxPayerMiddleInitial"
  | "taxPayerLastName"
  | "taxPayerBirthday"
  | "taxPayerSocialSecurityNo"
  | "taxPayerOccupation"
  | "taxPayerMobileNumber"
  | "isTaxPayerLegallyBlind"
  | "spouseFirstName"
  | "spouseMiddleInitial"
  | "spouseLastName"
  | "spouseBirthday"
  | "spouseSocialSecurityNo"
  | "spouseOccupation"
  | "spouseMobileNumber"
  | "isSpouseLegallyBlind";

export interface IQuestionContainer {
  question?: string;
  key: string;
  children: React.ReactNode;
}
