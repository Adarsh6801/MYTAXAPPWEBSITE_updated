import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import LandingNavbar from "../../components/LandingNavbar";
import Wrapper from "../../components/Wrapper";
import Button from "../../components/Button";
import { getClassNames } from "../../helpers/format";
import { CONTACT_US_PAGE, SIGN_UP_EXPERT_PAGE } from "../../constants/routes";
import ProfileFooter from "../../components/ProfileFooter";

import Scissors from "../../assets/svgs/scissors-mask3.svg";
import styles from "./index.module.css";
import { Space } from "antd";

const LandingExpert = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <LandingNavbar />
        <section className={styles.section}>
          <Wrapper className={styles.container}>
            <div className={styles.subContainer}>
              <div className={styles.textContainer}>
                <h3 className={styles.title}>{t("landing_expert.title")}</h3>
                <h4>{t("landing_expert.subtitle")}</h4>

                <p className={styles.description}>
                  {t("landing_expert.description1")}
                </p>
                <br />
                <p className={styles.description}>
                  {t("landing_expert.description2")}
                </p>

                <Space size={15} wrap className={styles.space}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate(CONTACT_US_PAGE)}
                    text={t("landing_expert.book_demo")}
                    className={styles.get_start_btn}
                    style={{ maxWidth: 150 }}
                  />

                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate(SIGN_UP_EXPERT_PAGE)}
                    text={t("landing_expert.get_started")}
                    className={styles.get_start_btn}
                  />
                </Space>
              </div>
              <img
                src={require("../../assets/images/accountant-header.png")}
                className={getClassNames(styles.img, styles.fullSize)}
                alt="TaxPayer 1"
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                {t("landing_expert.why_tax_app")}
              </h3>
              <h4 className={styles.subtitle}>
                {t("landing_expert.for_tax_pro")}
              </h4>

              {Array(7)
                .fill("")
                .map((x, i) => {
                  const index = i + 1;
                  const title = t(`landing_expert.sub_title_${index}`);
                  const description = t(
                    `landing_expert.sub_description_${index}`,
                  );
                  const img = require(`../../assets/images/step${index}.jpg`);

                  return (
                    <div
                      className={styles.mainContainerStep}
                      key={`step_${index}`}
                    >
                      <img
                        src={img}
                        className={styles.img}
                        alt="Tax Pro step"
                      />
                      <div>
                        <h4 className={styles.infoMainTitle}>
                          {index.toString().padStart(2, "0")}
                        </h4>
                        <h4 className={styles.infoMainTitle}>{title}</h4>
                        <p className={styles.infoDescription}>{description}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Wrapper>

          <div className={styles.background}>
            <img src={Scissors} className={styles.mask} alt={"Scissors"} />
            <h3 className={styles.videoTitle}>
              {t("landing_expert.video_sub_title")}
            </h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/aYez8ICoGlw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className={styles.video}
            />

            <Button
              type="default"
              onClick={() => navigate(SIGN_UP_EXPERT_PAGE)}
              text={t("landing_expert.get_started")}
            />
          </div>
        </section>
        <ProfileFooter />
      </div>
    </>
  );
};

export default LandingExpert;
