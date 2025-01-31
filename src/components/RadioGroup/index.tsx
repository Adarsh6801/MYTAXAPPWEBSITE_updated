import { Radio, Space } from "antd";

import { IRadioGroupProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import styles from "./index.module.css";

const RadioGroup = (props: IRadioGroupProps) => {
  const {
    className,
    contentClassName,
    direction = "vertical",
    size,
    data = [],
    value,
    defaultValue,
    disabled = false,
    onChange,
  } = props;

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      className={getClassNames(styles.container, className)}
      disabled={disabled}
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
              )}
            >
              {item.label}
            </p>
          </div>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default RadioGroup;
