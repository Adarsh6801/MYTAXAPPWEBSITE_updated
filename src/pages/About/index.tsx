import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import ProfileNavbar from "../../components/ProfileNavbar";
import Wrapper from "../../components/Wrapper";
import { USER_ROLES } from "../../constants/users";
import { getClassNames } from "../../helpers/format";
import { useAppSelector } from "../../redux/hooks";

import styles from "./index.module.css";

const About = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(state => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {user ? (
        <ProfileNavbar
          roleId={user?.roleId || USER_ROLES.Taxpayer}
          avatar={user?.avatar}
        />
      ) : (
        <LandingNavbar />
      )}
      <section className={styles.sectionContainer}>
        <Wrapper className={styles.container}>
          <p className={styles.title}>{t("about.title_1")}</p>
          <p className={styles.textWhiteSpace}>{t("about.description_1")}</p>
          <p className={styles.title}>{t("about.title_2")}</p>
          <p className={getClassNames(styles.subTitle, styles.aliginCenter)}>
            {t("about.title_3")}
          </p>
          <p className={styles.textWhiteSpace}>{t("about.description_2")}</p>
          <p className={getClassNames(styles.subTitle, styles.aliginCenter)}>
            {t("about.title_4")}
          </p>
          <p
            className={getClassNames(
              styles.textWhiteSpace,
              styles.textSize,
              styles.aliginCenter,
            )}
          >
            {t("about.description_3")}
          </p>
          <p className={styles.subTitle}>{t("about.title_5")}</p>
          <p className={styles.textWhiteSpace}>{t("about.description_4")}</p>
          <p className={styles.subTitle}>{t("about.title_6")}</p>
          <p className={styles.textWhiteSpace}>{t("about.description_5")}</p>
          <p className={styles.subTitle}>{t("about.title_7")}</p>
          <p className={styles.textWhiteSpace}>{t("about.description_6")}</p>
          <p className={styles.subTitle}>{t("about.title_8")}</p>
          <p className={styles.textWhiteSpace}>{t("about.description_7")}</p>
        </Wrapper>
      </section>
      <LandingFooter />
    </>
  );
};

export default About;
