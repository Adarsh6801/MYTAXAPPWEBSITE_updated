import { IHowItWorksCardProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import styles from "./index.module.css";

const HowItWorksCard = (props: IHowItWorksCardProps) => {
  const { id, title, description, className } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <span className={styles.id}>{id}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default HowItWorksCard;
