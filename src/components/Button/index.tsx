import { Button as AntButton } from "antd";

import { IButtonProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import styles from "./index.module.css";

const Button = (props: IButtonProps) => {
  const { text, className, ...rest } = props;

  return (
    <AntButton {...rest} className={getClassNames(styles.button, className)}>
      {text}
    </AntButton>
  );
};

export default Button;
