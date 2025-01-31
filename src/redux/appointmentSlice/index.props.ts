export interface IAppointmentState {
  requestedAppointments?: IAppointmentRequest[];
  approvedAppointments?: IAppointmentApproved[];
  hours?: any;
  loading: boolean;
  error?: Error;
}

export interface IAvailableHours {
  accountantId: number;
  date: string | Date;
}

export interface ICreateAppointmentPayload {
  quoteId: number;
  appointmentTypeId: number;
  additionalComments: string;
  dateTime: string | Date | moment.Moment;
  time: number;
}

export interface IAppointmentRequest {
  id: number;
  taxpayerId: number;
  taxpayerFirstName: string;
  taxpayerLastName: string;
  appointmentTypeId: number;
  additionalComments: string;
  date: string;
  time: number;
}

export interface IAppointmentApproved {
  id: number;
  taxpayerId: number;
  taxpayerFirstName: string;
  taxpayerLastName: string;
  appointmentTypeId: number;
  additionalComments: string;
  date: string;
  time: number;
}
