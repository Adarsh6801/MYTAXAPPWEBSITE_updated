import { Radio, Space } from "antd";

import { IRadioGroupProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import styles from "./index.module.css";

const RadioGroupCard = (props: IRadioGroupProps) => {
  const {
    data = [],
    value,
    size,
    direction = "vertical",
    contentClassName,
    className,
    onChange,
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
        className={getClassNames(styles.contentContainer, contentClassName)}
      >
        {data.map((item, index) => {
          let Icon = item.Icon;
          return (
            <div key={`radioButton_${index}`} className={styles.radioContainer}>
              <Radio value={item.value} className={styles.hide} />
              <div
                className={getClassNames(
                  styles.checker,
                  +value === +item.value && styles.checked,
                )}
              />
              <p
                className={getClassNames(
                  styles.text,
                  +value === +item.value && styles.textActive,
                )}
              >
                {item.label}
              </p>
              <div
                className={getClassNames(
                  styles.iconContainer,
                  +value === +item.value ? styles.active : styles.Inactive,
                )}
              >
                {<Icon />}
              </div>
            </div>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default RadioGroupCard;
