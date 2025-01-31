import { UploadFile } from "antd/lib/upload/interface";

export interface ITaxpayerProfileForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthDate?: moment.Moment;
  avatar?: UploadFile[];
  twoFactorAuthIsActive?: boolean;
}
