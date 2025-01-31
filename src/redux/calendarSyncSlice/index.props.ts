export interface ICalendarSyncState {
  link?: any;
  loading: boolean;
  error?: Error;
}

export interface IGoogleSyncPayload {
  code?: string;
  error?: string;
}

export interface IMicrosoftSyncPayload {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}
