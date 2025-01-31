import moment from "moment";

export const disabledDateFuture = (current: any): boolean => {
  return current && current > moment().endOf("day");
};

export const disabledDatePast = (current: any) => {
  return current && current < moment().endOf("day");
};

export const utc = (date?: string, format?: string) => {
  return moment.utc(date).local().format(format);
};
