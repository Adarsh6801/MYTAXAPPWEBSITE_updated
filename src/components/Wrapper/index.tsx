import { IWrapperProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import styles from "./index.module.css";

const Wrapper = (props: IWrapperProps) => {
  const { className } = props;

  return (
    <div className={getClassNames(styles.wrapper, className)}>
      {props.children}
    </div>
  );
};

export default Wrapper;
