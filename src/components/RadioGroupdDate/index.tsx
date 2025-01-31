import { Radio, Space } from "antd";

import DatePicker from "../DatePicker";
import { IRadioGroupProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import Calendar from "../../assets/svgs/calendar.svg";
import styles from "./index.module.css";

const noop = () => {};

const RadioGroupDate = (props: IRadioGroupProps) => {
  const {
    className,
    contentClassName,
    direction = "vertical",
    size,
    data = [],
    value,
    disabledDate,
    onChange,
    onChangeDate = noop,
  } = props;

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      className={getClassNames(styles.container, className)}
    >
      <Space
        size={size}
        direction={direction}
        className={getClassNames(contentClassName)}
      >
        {data.map((item, index) => (
          <div key={`radioButton_${index}`} className={styles.radioContainer}>
            <Radio value={item.value} className={styles.hide} />
            <div
              className={getClassNames(
                styles.checker,
                value === item.value && styles.checked,
              )}
            />
            <p
              className={getClassNames(
                styles.text,
                value === item.value && styles.textActive,
                !item.hasDate && styles.padding,
              )}
            >
              {item.label}
            </p>
            {item.hasDate && value === item.value && (
              <DatePicker
                icon={Calendar}
                className={styles.dataPicker}
                datePicker={{
                  onChange: onChangeDate,
                  disabledDate: disabledDate,
                }}
              />
            )}
          </div>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default RadioGroupDate;
