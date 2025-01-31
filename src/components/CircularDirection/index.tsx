import { Button as AntButton, Space } from "antd";

import { getClassNames } from "../../helpers/format";
import { ICircularDirectionProps } from "./index.props";

import Left from "../../assets/svgs/arrow-left.svg";
import Right from "../../assets/svgs/arrow-right.svg";
import styles from "./index.module.css";

const CircularDirection = (props: ICircularDirectionProps) => {
  const {
    className,
    diameter = 50,
    spaceSize,
    hasRight = true,
    hasLeft = true,
    disabled = false,
    onClickRight,
    onClickLeft,
    rightButton,
    leftButton,
  } = props;

  return (
    <Space size={spaceSize}>
      {hasLeft && (
        <AntButton
          {...leftButton}
          block
          type="ghost"
          shape="circle"
          disabled={disabled}
          icon={<img src={Left} alt="Left" className={styles.iconLeft} />}
          className={getClassNames(styles.button, className)}
          style={{ width: diameter, height: diameter }}
          onClick={onClickLeft}
        />
      )}
      {hasRight && (
        <AntButton
          {...rightButton}
          block
          type="ghost"
          shape="circle"
          disabled={disabled}
          icon={<img src={Right} alt="Right" className={styles.iconRight} />}
          className={getClassNames(styles.button, className)}
          style={{ width: diameter, height: diameter }}
          onClick={onClickRight}
        />
      )}
    </Space>
  );
};

export default CircularDirection;
