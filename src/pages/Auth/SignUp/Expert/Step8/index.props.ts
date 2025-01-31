export interface IEducation {
  institution: string;
  degree: string;
  yearOfGraduation: string;
}

export interface IExpertStep8FormData {
  accountantEducationList: IEducation[];
  hasPricingSystem: boolean;
  pricingSystemAttachment: string;
}
