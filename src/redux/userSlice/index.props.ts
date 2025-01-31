export interface IUserData {
  id: number;
  roleId: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  mayCallDirectly: boolean;
  hasSubscription: boolean;
  hasSyncedCalendar: boolean;
  avatar: string;
  twoFactorAuthIsActive: boolean;
}

export interface IUserState {
  user?: IUserData;
  loading: boolean;
  error?: Error;
}
