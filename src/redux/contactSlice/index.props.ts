export interface IContactState {
  loading: boolean;
  error?: Error;
}

export interface IContactPayload {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  message: string;
}
