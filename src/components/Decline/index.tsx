import { Divider, Popover } from "antd";
import { IDeclineProps } from "./index.props";

import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";
import { ReactComponent as Info } from "../../assets/svgs/info.svg";
import styles from "./index.module.css";

const noop = () => {};

const Decline = (props: IDeclineProps) => {
  const {
    icon,
    title,
    infoNote = false,
    description,
    onClick = noop,
    children,
  } = props;

  const content = (
    <div>
      <p>{description}</p>
    </div>
  );

  return (
    <>
      <div className={styles.container} onClick={onClick}>
        <div className={styles.leftSideContainer}>
          {icon}
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.rightSideContainer}>
          {infoNote && (
            <Popover content={content}>
              <div className={styles.infoContainer}>
                <Info />
                <p className={styles.infoText}>Note</p>
              </div>
            </Popover>
          )}
        </div>
      </div>
      <div>{children}</div>
      <Divider />
    </>
  );
};

export default Decline;
