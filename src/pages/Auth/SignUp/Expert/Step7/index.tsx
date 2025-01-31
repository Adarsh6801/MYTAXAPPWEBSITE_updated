import { useTranslation } from "react-i18next";
import { Input, Rate, Tooltip } from "antd";

import CircularDirection from "../../../../../components/CircularDirection";
import { IExpertStepsProps } from "../index.props";
import { GET_REVIEWS_LINK } from "../../../../../constants/settings";

import Copy from "../../../../../assets/svgs/copy.svg";
import Avatar from "../../../../../assets/svgs/avatar.svg";
import styles from "./index.module.css";

const noop = () => {};

const Step7 = (props: IExpertStepsProps) => {
  const { t } = useTranslation();
  const { nextStep = noop, prevStep, state } = props;

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h4 className={styles.title}>{t("expert.set_up_profile")}</h4>
        <p className={styles.description}>{t("expert.info")}</p>
      </div>
      <h2 className={styles.question}>{t("expert.step7.question")}</h2>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarRating}>
          <img src={Avatar} />
          <Rate disabled />
        </div>
        <p className={styles.description}>{t("expert.step7.description")}</p>
      </div>

      <Input
        value={GET_REVIEWS_LINK}
        suffix={
          <Tooltip title="Copy">
            <img
              src={Copy}
              onClick={e => {
                navigator.clipboard.writeText(GET_REVIEWS_LINK);
              }}
            />
          </Tooltip>
        }
        className={styles.input}
      />
      <CircularDirection
        rightButton={{
          htmlType: "submit",
        }}
        onClickRight={nextStep}
        onClickLeft={prevStep}
      />
    </div>
  );
};

export default Step7;
