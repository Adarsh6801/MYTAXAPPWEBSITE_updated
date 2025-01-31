import { RcFile } from "antd/lib/upload";

export interface IExpertWorkExperience {
  title: string;
  year: number;
  rate: number;
  description: string;
}

export interface IPricingSystemFile {
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
}

export interface IExpertProfileDetails {
  taxPreparationTypeId: number;
  workingTypeIds: number[];
  accountantEducationList: IExpertProfileEducation[];
  aboutBusinessOrServiceStandOut: string;
  accountantWorkExperience: IExpertWorkExperience[];
  pricingSystemFile: IPricingSystemFile;
  website: string;
  linkedin: string;
  rateByStars: number;
  yearsOfExperience: number;
}

export interface IExpertProfileEducation {
  institution: string;
  degree: string;
  yearOfGraduation: string;
}

export interface IExpertProfileState {
  expertProfile?: IExpertProfileDetails;
  loading: boolean;
  error?: Error;
}

export interface IExpertProfileUpdate {
  firstName: string;
  lastName: string;
  avatar?: File | RcFile;
  birthDate?: Date;
  phoneNumber?: string;
  website?: string;
  linkedIn?: string;
  taxPreparationTypeId: number;
  workingTypeIds: number[];
  accountantEducationList: IExpertProfileEducation[];
  aboutBusinessOrServiceStandOut: string;
  pricingSystemFile: File | RcFile;
}
