import { useTranslation } from "react-i18next";
import { Button, Input } from "antd";

import LandingFooter from "../../components/LandingFooter";
import Wrapper from "../../components/Wrapper";

import Scissors from "../../assets/svgs/scissors-mask3.svg";
import styles from "./index.module.css";

const Payment = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Wrapper className={styles.wrapper}>
          <div className={styles.inner}>
            <h1 className={styles.title}>{t("payment.title")}</h1>
            <h1 className={styles.subTitle}>{t("payment.sub_title")}</h1>
            <div className={styles.servicesContainer}>
              <Input />
              <Input />
              <Input />
              <Button className={styles.button} size={"large"}>
                Sumbit
              </Button>
            </div>
          </div>
        </Wrapper>
        <div className={styles.background}>
          <img src={Scissors} className={styles.mask} alt={"Scissors"} />
        </div>
      </section>
      <LandingFooter />
    </div>
  );
};

export default Payment;
