export interface IFeedbackState {
  loading: boolean;
  error?: Error;
}

export interface ISendAccountantFeedbackPayload {
  accountantId: number;
  rate: number;
  comment: string;
  isIndividual: boolean;
}
