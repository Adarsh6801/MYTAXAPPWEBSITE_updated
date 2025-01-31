import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import ProfileNavbar from "../../components/ProfileNavbar";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import Wrapper from "../../components/Wrapper";
import { USER_ROLES } from "../../constants/users";
import { useAppSelector } from "../../redux/hooks";

import styles from "./index.module.css";

const Condition = () => {
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
          <p className={styles.title}>{t("condition.title")}</p>
          <p className={styles.textWhiteSpace}>{t("condition.decription_1")}</p>
          <p className={styles.textWhiteSpace}>{t("condition.decription_2")}</p>
          <ul>
            <li>{t("condition.ul_title")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(6, (index: number) => (
                <li>{t(`condition.ul_condition_1_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <p className={styles.textWhiteSpace}>{t("condition.decription_3")}</p>
          <p className={styles.textWhiteSpace}>{t("condition.decription_4")}</p>
          <p className={styles.textWhiteSpace}>{t("condition.decription_5")}</p>
          <ul>
            <li>{t("condition.ul_title_2")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(4, (index: number) => (
                <li>{t(`condition.ul_condition_2_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <p className={styles.textWhiteSpace}>{t("condition.decription_6")}</p>
          <p className={styles.textWhiteSpace}>{t("condition.decription_7")}</p>
          <ul>
            <li>{t("condition.ul_title_3")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(4, (index: number) => (
                <li>{t(`condition.ul_condition_3_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <ul>
            <li>{t("condition.ul_title_4")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(11, (index: number) => (
                <li>{t(`condition.ul_condition_4_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <ul>
            <li>{t("condition.ul_title_5")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(4, (index: number) => (
                <li>{t(`condition.ul_condition_5_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <p className={styles.textWhiteSpace}>{t("condition.decription_8")}</p>
          <p className={styles.textWhiteSpace}>{t("condition.decription_9")}</p>
          <ul>
            <li>{t("condition.ul_title_6")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(2, (index: number) => (
                <li>{t(`condition.ul_condition_6_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <p className={styles.textWhiteSpace}>
            {t("condition.decription_10")}
          </p>
          <p className={styles.textWhiteSpace}>
            {t("condition.decription_11")}
          </p>
          <ul>
            <li>{t("condition.ul_title_7")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(8, (index: number) => (
                <li>{t(`condition.ul_condition_7_${index}`)}</li>
              ))}
            </ul>
          </ul>
          <ul>
            <li>{t("condition.ul_title_8")}</li>
            <ul className={styles.ulNoStyle}>
              {_.times(6, (index: number) => (
                <li>{t(`condition.ul_condition_8_${index}`)}</li>
              ))}
            </ul>
          </ul>
        </Wrapper>
      </section>
      <LandingFooter />
    </>
  );
};

export default Condition;
