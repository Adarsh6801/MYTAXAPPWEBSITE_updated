import { Typography } from "antd";

import { IGiftCardProps } from "./index.props";
import { getClassNames } from "../../helpers/format";

import GiftClosed from "../../assets/svgs/gift-closed.svg";
import styles from "./index.module.css";

const { Text } = Typography;

const GiftCard = (props: IGiftCardProps) => {
  const { text, className } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={styles.imgWrapper}>
        <div className={styles.imgContainer}>
          <img src={GiftClosed} className={styles.img} alt="Gift closed" />
        </div>
      </div>

      {text && <Text className={styles.text}>{text}</Text>}
    </div>
  );
};

export default GiftCard;
