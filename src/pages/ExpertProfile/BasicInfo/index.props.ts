import { IExpertWorkExperience } from "../../../redux/expertProfileSlice/index.props";

export interface IBasicInfo {
  isDisabled?: boolean;
  description?: string;
  accountantWorkExperience?: IExpertWorkExperience[];
}
