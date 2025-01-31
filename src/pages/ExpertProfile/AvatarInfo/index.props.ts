export interface IAvatarInfo {
  src?: string;
  firstName?: string;
  lastName?: string;
  rateByStars?: number;
  yearsOfExperience?: number;
  linkedIn?: string;
  website?: string;
  hasEditMode?: boolean;
  setChangeTab: () => void;
}
