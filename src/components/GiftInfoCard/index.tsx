import { getClassNames } from "../../helpers/format";
import { IGiftInfoCardProps } from "./index.props";

import GiftClosed from "../../assets/svgs/gift-closed.svg";
import styles from "./index.module.css";

const GiftInfoCard = (props: IGiftInfoCardProps) => {
  const { img, title, description, className } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={styles.imgContainer}>
        <img src={img} className={styles.img} alt="Gift cover" />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.circleContainer}>
        <img src={GiftClosed} className={styles.giftImg} alt="Gift closed" />
      </div>
    </div>
  );
};

export default GiftInfoCard;
