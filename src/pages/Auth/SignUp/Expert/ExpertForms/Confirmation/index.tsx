import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { EXPERT_PROFILE_PAGE } from "../../../../../../constants/routes";

import Success from "../../../../../../assets/svgs/success.svg";
import styles from "./index.module.css";

const Confirmation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img src={Success} alt={"Success"} className={styles.img} />
      <div className={styles.textContainer}>
        <h4 className={styles.title}>{t("individual.confirm.expert_title")}</h4>
      </div>
      <Link to={EXPERT_PROFILE_PAGE} className={styles.link}>
        {t("individual.confirm.go_to_home")}
      </Link>
    </div>
  );
};

export default Confirmation;
