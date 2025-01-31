import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import { IRequestCardProps } from "./index.props";
import { getClassNames } from "../../helpers/format";
import Button from "../Button";

import { ReactComponent as DateSvg } from "../../assets/svgs/date.svg";
import styles from "./index.module.css";

const RequestCard = (props: IRequestCardProps) => {
  const { t } = useTranslation();
  const { className, title, data, date, onViewDetails } = props;

  return (
    <div className={getClassNames(styles.container, className)}>
      <h1 className={styles.title}>{title}</h1>

      <Row gutter={[0, 10]} justify="space-between">
        <Col xs={24} md={12}>
          <div className={styles.content}>
            <div className={styles.icon}>{data.icon}</div>
            <span className={styles.text}>{data.text}</span>
          </div>
        </Col>

        <Col>
          <Button
            text={t("request_card.view_details")}
            onClick={onViewDetails}
          />
        </Col>
      </Row>

      <Row gutter={[0, 10]} justify="space-between">
        <Col xs={24}>
          <div className={styles.content}>
            <div className={styles.icon}>
              <DateSvg />
            </div>
            <span className={styles.text}>{date}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RequestCard;
