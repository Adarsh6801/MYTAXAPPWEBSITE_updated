import { DatePicker as AntDatePicker } from "antd";

import { getClassNames } from "../../helpers/format";
import { IDatePickerProps } from "./index.props";
import { DEFAULT_DATE_FORMAT } from "../../constants/format";

import styles from "./index.module.css";

const DatePicker = (props: IDatePickerProps) => {
  const { icon, className, datePicker } = props;

  return (
    <AntDatePicker
      format={DEFAULT_DATE_FORMAT}
      suffixIcon={<img src={icon} alt="icon" />}
      className={getClassNames(styles.dataPicker, className)}
      {...datePicker}
    />
  );
};

export default DatePicker;
