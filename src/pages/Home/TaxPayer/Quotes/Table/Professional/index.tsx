import { Avatar, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  getBase64FormattedImage,
  getClassNames,
} from "../../../../../../helpers/format";
import { IProfessionalProps } from "./index.props";

import styles from "./index.module.css";

const Professional = (props: IProfessionalProps) => {
  const { data, className } = props;
  const { firstName, lastName, rating, img } = data;

  return (
    <div className={getClassNames(styles.container, className)}>
      <div className={styles.imageContainer}>
        <Avatar
          size="large"
          src={getBase64FormattedImage(img)}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#E9EEFF", color: "#0032DA" }}
        />
      </div>
      <div style={{ marginLeft: 9 }}>
        <p className={styles.text}>
          {firstName} {lastName}
        </p>
        <div className={styles.rateContainer}>
          <Rate value={rating} style={{ fontSize: 12 }} disabled />
          <p className={getClassNames(styles.text, styles.rateText)}>
            ({rating})
          </p>
        </div>
      </div>
    </div>
  );
};

export default Professional;
