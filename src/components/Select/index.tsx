import { Select as AntSelect } from "antd";

import { getClassNames } from "../../helpers/format";
import { ISelectProps } from "./index.props";

import styles from "./index.module.css";

const Select = (props: ISelectProps) => {
  const { className,placeholder, data, handleChange, ...rest } = props;

  return (
    <AntSelect
      className={getClassNames(styles.container, className)}
      onChange={handleChange}
      {...rest}
      placeholder={placeholder}
    >
      {data.map((item, index) => (
        <AntSelect.Option
          key={`${item.label}_${index}`}
          className={styles.item}
          value={item.value}
        >
          {item.label}
        </AntSelect.Option>
      ))}
    </AntSelect>
  );
};

export default Select;
