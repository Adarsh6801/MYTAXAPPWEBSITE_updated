import { useTranslation } from "react-i18next";

import Button from "../../../../../../../components/Button";

import Gift from "../../../../../../../assets/svgs/gift-open.svg";
import styles from "./index.module.css";

const StepGift = (props: any) => {
  const { t } = useTranslation();
  const { nextStep } = props;

  return (
    <div className={styles.container}>
      <img src={Gift} alt={"gift"} className={styles.img} />

      <div className={styles.textContainer}>
        <h4 className={styles.title}>{t("individual.gift.title")}</h4>
      </div>

      <Button
        text={t("individual.gift.open")}
        type={"primary"}
        onClick={() => {
          nextStep();
        }}
      />
    </div>
  );
};

export default StepGift;
