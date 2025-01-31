import { getClassNames } from "../../helpers/format";
import { INoDataProps } from "./index.props";
import { isString } from "lodash";

import { ReactComponent as NoDataSvg } from "../../assets/svgs/no-data.svg";
import styles from "./index.module.css";

const NoData = (props: INoDataProps) => {
  const {
    className,
    title,
    description,
    icon = <NoDataSvg className={styles.svg} />,
  } = props;

  const renderDescription = () => {
    if (isString(description)) {
      return <p className={styles.description}>{description}</p>;
    }

    return description;
  };

  return (
    <div className={getClassNames(styles.container, className)}>
      {icon}
      <h3 className={styles.title}>{title}</h3>
      {renderDescription()}
    </div>
  );
};

export default NoData;
