export interface ITaxpayerUpdateProfilePayload {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar?: File;
  birthDate?: Date;
}

export interface ITaxpayerState {
  loading: boolean;
  error?: Error;
}
