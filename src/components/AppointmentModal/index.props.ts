import { ICreateAppointmentPayload } from "../../redux/appointmentSlice/index.props";

export interface IAppointmentModalProps {
  isOpened: boolean;
  availableHours: number[];
  quoteId: number;
  onSubmit?: (values: ICreateAppointmentPayload) => void;
  onClose?: () => void;
  onDateChange?: (date: string | Date) => void;
}

export interface IAppointmentModalInitialValue {
  appointmentTypeId: number;
  date: string | null;
  additionalComments: string;
  time: string;
}
