import { Rate } from "antd";

import { ITrustedExpertCardProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import styles from "./index.module.css";

const TrustedExpertCard = (props: ITrustedExpertCardProps) => {
  const { name, position, rating, avatar, className } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <img src={avatar} className={styles.img} alt="logo" />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.position}>{position}</p>
      <Rate disabled value={rating} />
    </div>
  );
};

export default TrustedExpertCard;
