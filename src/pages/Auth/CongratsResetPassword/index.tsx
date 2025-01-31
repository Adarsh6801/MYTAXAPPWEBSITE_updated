import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";
import { INITIAL_PAGE } from "../../../constants/routes";

import Scissors from "../../../assets/svgs/scissors-mask4.svg";
import Dots from "../../../assets/svgs/dots-group2.svg";
import Congrats from "../../../assets/svgs/congrats.svg";
import Logo from "../../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const CongratsResetPassword = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <Link to={INITIAL_PAGE} className={styles.logo}>
          <img src={Logo} alt="MyTaxApp logo" />
        </Link>

        <div className={styles.formContainer}>
          <div className={styles.iconContainer}>
            <img src={Congrats} alt="Congrats" />
          </div>
          <h1 className={styles.title}>{t("congrats_reset_password.title")}</h1>
          <p className={styles.description}>
            {t("congrats_reset_password.description")}
          </p>
        </div>
        <img src={Dots} className={styles.dots} alt="Tax App dots" />
      </Wrapper>
      <img src={Scissors} className={styles.mask} alt="MyTaxApp" />
    </section>
  );
};

export default CongratsResetPassword;
