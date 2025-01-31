import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Wrapper from "../../../components/Wrapper";
import GiftCard from "../../../components/GiftCard";
import LandingNavbar from "../../../components/LandingNavbar";
import { SIGN_IN_PAGE } from "../../../constants/routes";
import Button from "../../../components/Button";

import Scissors from "../../../assets/svgs/scissors-mask1.svg";
import styles from "./index.module.css";

const HeaderSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <LandingNavbar />
      <header className={styles.container}>
        <Wrapper>
          <div className={styles.grid}>
            <h1 className={styles.title}>{t("landing.header.title")}</h1>
            <h5 className={styles.subtitle}>{t("landing.header.subtitle")}</h5>
            <div className={styles.descriptionWrapper}>
              <p className={styles.description}>
                {t("landing.header.description")}
              </p>
              <Button
                type="default"
                text={t("landing.how_it_works.button")}
                className={styles.btn}
                onClick={() => navigate(SIGN_IN_PAGE)}
              />
            </div>

            <div className={styles.rightContainer}>
              <img
                src={require("../../../assets/images/landing-header.png")}
                className={styles.img}
                alt="Taxpayer"
              />
              <GiftCard
                text={t("landing.header.surprise")}
                className={styles.giftCard}
              />
            </div>
          </div>
        </Wrapper>
        <img src={Scissors} className={styles.mask} alt="Scissors" />
      </header>
    </>
  );
};

export default HeaderSection;
