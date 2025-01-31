import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Wrapper from "../../../components/Wrapper";
import HowItWorksCard from "../../../components/HowItWorksCard";
import { SIGN_IN_PAGE } from "../../../constants/routes";
import Button from "../../../components/Button";

import Dots from "../../../assets/svgs/dots-group2.svg";
import styles from "./index.module.css";

const HowItWorkSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = [
    {
      title: t("landing.how_it_works.steps.step1.title"),
      description: t("landing.how_it_works.steps.step1.description"),
    },
    {
      title: t("landing.how_it_works.steps.step2.title"),
      description: t("landing.how_it_works.steps.step2.description"),
    },
    {
      title: t("landing.how_it_works.steps.step3.title"),
      description: t("landing.how_it_works.steps.step3.description"),
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.background}>
        <Wrapper>
          <div className={styles.inner}>
            <h1 className={styles.title}>{t("landing.how_it_works.title")}</h1>

            {data.map((item, index) => (
              <HowItWorksCard
                key={`howItWorksCard_${index}`}
                id={`0${index + 1}`}
                title={item.title}
                description={item.description}
                className={styles.card}
              />
            ))}

            <Button
              type="default"
              text={t("landing.how_it_works.button")}
              className={styles.btn}
              onClick={() => navigate(SIGN_IN_PAGE)}
            />
          </div>
          <img src={Dots} className={styles.img} alt="Dots" />
        </Wrapper>
      </div>
    </section>
  );
};

export default HowItWorkSection;
