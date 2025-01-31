import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Wrapper from "../Wrapper";
import { ILandingFooterProps } from "./index.props";
import { getClassNames } from "../../helpers/format";
import {
  ABOUT_PAGE,
  TERMS_CONDITIONS_PAGE,
  INITIAL_PAGE,
  PRIVACY_POLICY_PAGE,
  SIGN_IN_PAGE,
  CONTACT_US_PAGE,
} from "../../constants/routes";

import Logo from "../../assets/svgs/logo.svg";
import styles from "./index.module.css";

const LandingFooter = (props: ILandingFooterProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <>
      <footer className={getClassNames(styles.container, className)}>
        <Wrapper>
          <div className={styles.links}>
            <Link to={INITIAL_PAGE} className={styles.link}>
              {t("landing.footer.home")}
            </Link>
            <Link to={CONTACT_US_PAGE} className={styles.link}>
              {t("landing.footer.contact")}
            </Link>
            <img src={Logo} className={styles.logo} alt="logo" />
            <Link to={SIGN_IN_PAGE} className={styles.link}>
              {t("landing.footer.profile")}
            </Link>
            <Link to={ABOUT_PAGE} className={styles.link}>
              {t("landing.footer.about")}
            </Link>
          </div>

          <div className={styles.termsContainer}>
            <p className={styles.text}>
              <Trans
                i18nKey="landing.footer.copyright"
                values={{ year: new Date().getFullYear() }}
                components={[<>text</>]}
              />
            </p>
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
    </>
  );
};

export default LandingFooter;
