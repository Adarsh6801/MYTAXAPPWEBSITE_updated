export type DataOfKey =
  | "streetAsOfDec31"
  | "unitNoAsOfDec31"
  | "zipCodeAsOfDec31"
  | "stateAsOfDec31"
  | "cityAsOfDec31"
  | "homePhoneNumberAsOfDec31"
  | "addSeparatelyForSpouse"
  | "spouseStreetAsOfDec31"
  | "spouseUnitNoAsOfDec31"
  | "spouseZipCodeAsOfDec31"
  | "spouseStateAsOfDec31"
  | "spouseCityAsOfDec31"
  | "spouseHomePhoneNumberAsOfDec31";

export interface IQuestionContainer {
  question: string;
  key: string;
  children: React.ReactNode;
}
