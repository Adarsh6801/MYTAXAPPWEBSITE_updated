import { Spin } from "antd";

import { ILoadingProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import Logo from "../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const Loading = (props: ILoadingProps) => {
  const { className, type = "primary" } = props;

  if (type === "secondary") {
    return (
      <div
        className={getClassNames(
          styles.container,
          styles.transparent,
          className,
        )}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={getClassNames(styles.container, className)}>
      <img src={Logo} className={styles.logo} alt="logo" />
      <Spin size="large" />
    </div>
  );
};

export default Loading;
