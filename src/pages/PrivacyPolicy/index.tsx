import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import _ from "lodash";

import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import Wrapper from "../../components/Wrapper";
import ProfileNavbar from "../../components/ProfileNavbar";
import { USER_ROLES } from "../../constants/users";
import { useAppSelector } from "../../redux/hooks";

import styles from "./index.module.css";

const PrivacyPolicy = () => {
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
          <h1 className={styles.title}>{t("terms.title")}</h1>
          {_.times(2, (index: number) => (
            <p className={styles.description} key={index}>
              {t(`terms.paragraph${index}`)}
            </p>
          ))}
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_1"
                values={{ info: "1. Key Terms." }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <table>
            {_.times(5, (index: number) => (
              <tr key={`value_table_1_${index}`} className={styles.trContainer}>
                <td className={styles.td}>{t(`terms.key_table_1_${index}`)}</td>
                <td className={styles.td}>
                  {t(`terms.value_table_1_${index}`)}
                </td>
              </tr>
            ))}
          </table>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_2"
                values={{
                  info: "2. Personal Information We Collect About You.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <table>
            <tr className={styles.trContainer}>
              <th>Categories of Personal Information</th>
              <th>Specific Types of Personal Information Collected</th>
            </tr>
            {_.times(5, (index: number) => (
              <tr key={`key_table_2_${index}`} className={styles.trContainer}>
                <td className={styles.tdContainer}>
                  {t(`terms.key_table_2_${index}`)}
                </td>
                <td className={styles.tdContainer}>
                  {t(`terms.value_table_2_${index}`)}
                </td>
              </tr>
            ))}
          </table>
          <p>{t(`terms.decription_table_2`)}</p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_3"
                values={{
                  info: "3. How Your Personal Information is Collected.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(4, (index: number) => (
              <li key={`ul_terms_3_${index}`}>
                {t(`terms.ul_terms_3_${index}`)}
              </li>
            ))}
            <li>
              {t(`terms.ul_terms_3_4`)}
              <ul className={styles.ulNoStyle}>
                <li> {t(`terms.ul_terms_3_5`)}</li>
              </ul>
            </li>
          </ul>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_4"
                values={{
                  info: "4. How and Why We Use Your Personal Information.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(4, (index: number) => (
              <li key={`ul_terms_4_${index}`}>
                {t(`terms.ul_terms_4_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.key_terms_decription")}</p>
          <table>
            <tr className={styles.trContainer}>
              <th>What we use your personal information for</th>
              <th>Our reasons</th>
            </tr>
            {_.times(14, (index: number) => (
              <tr key={`key_table_3_${index}`} className={styles.trContainer}>
                <td className={styles.tdContainer}>
                  {t(`terms.key_table_3_${index}`)}
                </td>
                <td className={styles.tdContainer}>
                  {t(`terms.value_table_3_${index}`)}
                </td>
              </tr>
            ))}
          </table>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_5"
                values={{
                  info: "5. Promotional Communications.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <p>{t("terms.terms_5_decription_1")}</p>
          <ul>
            {_.times(3, (index: number) => (
              <li key={`ul_terms_5_${index}`}>
                {t(`terms.ul_terms_5_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.terms_5_decription_2")}</p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_6"
                values={{
                  info: "6. Who We Share Your Personal Information With.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(3, (index: number) => (
              <li key={`ul_terms_6_${index}`}>
                {t(`terms.ul_terms_6_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.terms_6_decription_1")}</p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_7"
                values={{
                  info: "7. Personal Information We Sold or Disclosed for a Business Purpose.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <p>{t("terms.terms_7_decription")}</p>
          <ul>
            {_.times(5, (index: number) => (
              <li key={`ul_terms_7_${index}`}>
                {t(`terms.ul_terms_7_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.terms_6_decription_1")}</p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_7"
                values={{
                  info: "7. Personal Information We Sold or Disclosed for a Business Purpose.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <p>{t("terms.terms_7_decription")}</p>
          <ul className={styles.ulNoStyle}>
            {_.times(5, (index: number) => (
              <li key={`ul_terms_7_1${index}`}>
                {t(`terms.ul_terms_7_${index}`)}
              </li>
            ))}
          </ul>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_8"
                values={{
                  info: "8. Where Your Personal Information is Held.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <p>{t("terms.terms_8_decription")}</p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_9"
                values={{
                  info: "9. How Long Your Personal Information Will Be Kept.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(3, (index: number) => (
              <li key={`ul_terms_9_${index}`}>
                {t(`terms.ul_terms_9_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.terms_9_decription")}</p>

          <p>
            {
              <Trans
                i18nKey="terms.key_terms_10"
                values={{
                  info: "10. Transferring Your Personal Information Out of the EEA.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(4, (index: number) => (
              <li key={`ul_terms_10_${index}`}>
                {t(`terms.ul_terms_10_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.terms_10_decription")}</p>

          <p className={styles.boldText}>{t("terms.key_terms_11")}</p>
          <ul>
            {_.times(7, (index: number) => (
              <tr key={`key_table_4_${index}`} className={styles.trContainer}>
                <td className={styles.tdContainer}>
                  {t(`terms.key_table_4_${index}`)}
                </td>
                <td className={styles.tdContainer}>
                  {t(`terms.value_table_4_${index}`)}
                </td>
              </tr>
            ))}
          </ul>
          <p>{t("terms.terms_11_decription")}</p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_12"
                values={{
                  info: "12. Your Rights Under the CCPA.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(6, (index: number) => (
              <tr key={`key_table_5_${index}`} className={styles.trContainer}>
                <td className={styles.tdContainer}>
                  {t(`terms.key_table_5_${index}`)}
                </td>
                <td className={styles.tdContainer}>
                  {t(`terms.value_table_5_${index}`)}
                </td>
              </tr>
            ))}
          </ul>

          <p>
            {
              <Trans
                i18nKey="terms.key_terms_13"
                values={{
                  info: "13. Keeping Your Personal Information Secure.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_14"
                values={{
                  info: "14. How to Exercise Your Rights.",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <ul>
            {_.times(2, (index: number) => (
              <li key={`ul_terms_14_${index}`}>
                {t(`terms.ul_terms_14_${index}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.key_terms_14_decription")}</p>
          <ul>
            {_.times(4, (index: number) => (
              <li key={`ul_terms_14_${index + 3}`}>
                {t(`terms.ul_terms_14_${index + 3}`)}
              </li>
            ))}
          </ul>
          <p>{t("terms.key_terms_14_decription_2")}</p>
          <ul>
            {_.times(3, (index: number) => (
              <tr key={`key_table_6_${index}`} className={styles.trContainer}>
                <td className={styles.tdContainer}>
                  {t(`terms.key_table_6_${index}`)}
                </td>
                <td className={styles.tdContainer}>
                  {t(`terms.value_table_6_${index}`)}
                </td>
              </tr>
            ))}
          </ul>
          <p>
            {
              <Trans
                i18nKey="terms.key_terms_16"
                values={{
                  info: "18. Do You Need Extra Help?",
                }}
                components={[<span className={styles.boldText}>text</span>]}
              />
            }
          </p>
          <p>
            By using <span className={styles.boldText}>MyTaxApp</span>, you
            agree that any information received from Google APIs will be
            processed in accordance with the Google API Services User Data
            Policy, including the Limited Use requirements. To learn more about
            how we handle user data, please refer to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
            >
              Google API Services User Data Policy accessible through this link
            </a>
            .
          </p>
        </Wrapper>
      </section>
      <LandingFooter />
    </>
  );
};

export default PrivacyPolicy;
