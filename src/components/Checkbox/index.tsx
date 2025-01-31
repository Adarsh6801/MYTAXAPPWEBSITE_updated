import { Checkbox as Checker } from "antd";

import DatePicker from "../DatePicker";
import { getClassNames } from "../../helpers/format";
import { ICheckboxProps } from "./index.props";

import Calendar from "../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const Checkbox = (props: ICheckboxProps) => {
  const { text, className, hasDate, onChange, ...rest } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <Checker onChange={onChange} className={styles.checkbox} {...rest}>
        {text}
      </Checker>
      {hasDate && <DatePicker icon={Calendar} className={styles.dataPicker} />}
    </div>
  );
};

export default Checkbox;
