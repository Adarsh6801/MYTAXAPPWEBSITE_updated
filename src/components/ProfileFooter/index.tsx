import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Wrapper from "../Wrapper";
import { ILandingFooterProps } from "./index.props";
import { getClassNames } from "../../helpers/format";
import {
  PRIVACY_POLICY_PAGE,
  TERMS_CONDITIONS_PAGE,
} from "../../constants/routes";

import LogoName from "../../assets/svgs/logo.svg";
import Logo from "../../assets/svgs/logo-scissor.svg";
import styles from "./index.module.css";

const ProfileFooter = (props: ILandingFooterProps) => {
  const { t } = useTranslation();
  const { className } = props;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className={getClassNames(styles.container, className)}>
      <Wrapper>
        <div className={styles.termsContainer}>
          <p className={styles.text}>
            <Trans
              i18nKey="landing.footer.copyright"
              values={{ year: new Date().getFullYear() }}
              components={[<>text</>]}
            />
          </p>
          <img
            src={isSmallScreen ? Logo : LogoName}
            className={styles.logo}
            alt="logo"
          />
          <div className={styles.privacy}>
            <Link to={PRIVACY_POLICY_PAGE} className={styles.text}>
              {t("landing.footer.privacy")}
            </Link>
            <p className={styles.divider}>|</p>
            <Link to={TERMS_CONDITIONS_PAGE} className={styles.text}>
              {t("landing.footer.terms")}
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default ProfileFooter;
