import Wrapper from "../../../components/Wrapper";
import LandingNavbar from "../../../components/LandingNavbar";

import { ReactComponent as Calc } from "../../../assets/svgs/calc.svg";
import { ReactComponent as Dollar } from "../../../assets/svgs/dollar.svg";
import Scissors from "../../../assets/svgs/scissors-mask1.svg";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import { setLandingUserType } from "../../../helpers/storage";
import {
  LANDING_EXPERT_PAGE,
  LANDING_TAXPAYER_PAGE,
} from "../../../constants/routes";
import { useNavigate } from "react-router";

const HeaderSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <LandingNavbar />
      <header className={styles.container}>
        <Wrapper>
          <div className={styles.grid}>
            <div>
              <h1 className={styles.title}>What is MYTAXAPP?</h1>
              <p className={styles.description}>
                MYTAXAPP is the first marketplace designed for taxpayers and tax
                prepares to connect and complete secure tax services from
                anywhere in the world.
              </p>
            </div>

            <div className={styles.rightContainer}>
              <img
                src={require("../../../assets/images/header.png")}
                className={styles.img}
                alt="Taxpayer"
              />
            </div>
          </div>

          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => navigate(LANDING_EXPERT_PAGE)}
            >
              <div className={styles.icon}>
                <Calc />
              </div>
              <h2 className={styles.itemTitle}>
                {t("landing.navbar.tax_pro").toUpperCase()}
              </h2>
              <p>
                List your tax services to the world with our secure, cloud based
                platform!
              </p>
            </div>

            <div
              className={styles.item}
              onClick={() => navigate(LANDING_TAXPAYER_PAGE)}
            >
              <div className={styles.icon}>
                <Dollar />
              </div>
              <h2 className={styles.itemTitle}>
                {t("landing.navbar.tax_clients").toUpperCase()}
              </h2>
              <p>
                Get your taxes done by real people and build a lasting
                professional relationship.
              </p>
            </div>
          </div>
        </Wrapper>
        <img src={Scissors} className={styles.mask} alt="Scissors" />
      </header>
    </>
  );
};

export default HeaderSection;
