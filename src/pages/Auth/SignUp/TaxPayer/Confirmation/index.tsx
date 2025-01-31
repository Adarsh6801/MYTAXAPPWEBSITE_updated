import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { TAXPAYER_QUOTES } from "../../../../../constants/routes";

import Success from "../../../../../assets/svgs/success.svg";
import styles from "./index.module.css";

const Confirmation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img src={Success} alt={"Success"} className={styles.img} />
      <div className={styles.textContainer}>
        <h4 className={styles.title}>
          {t("individual.confirm.tax_payer_title")}
        </h4>
        <h4 className={styles.title}>
          {t("individual.confirm.tax_payer_sub_title")}
        </h4>
      </div>
      <Link to={TAXPAYER_QUOTES} className={styles.link}>
        {t("individual.confirm.go_to_home")}
      </Link>
    </div>
  );
};

export default Confirmation;
