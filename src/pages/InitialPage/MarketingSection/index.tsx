import { useNavigate } from "react-router";

import Wrapper from "../../../components/Wrapper";
import { SIGN_IN_PAGE } from "../../../constants/routes";

import { ReactComponent as ArrowRight } from "../../../assets/svgs/arrow-right-filled.svg";
import Dots from "../../../assets/svgs/dots-group5.svg";
import styles from "./index.module.css";
import { setLandingUserType } from "../../../helpers/storage";
import { useTranslation } from "react-i18next";

const MarketingSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.title}>
          What are you waiting for ?
          <br />
          Sign up now for a stress-free tax transaction!
        </h1>

        <div className={styles.buttonContainer}>
          <div
            className={styles.button}
            onClick={() => {
              setLandingUserType("expert");
              navigate(SIGN_IN_PAGE);
            }}
          >
            <div>
              <h4>I am a TAX PRO</h4>
              <p>Let's scale my practice</p>
            </div>
            <ArrowRight className={styles.icon} />
          </div>

          <div
            className={styles.button}
            onClick={() => {
              setLandingUserType("taxpayer");
              navigate(SIGN_IN_PAGE);
            }}
          >
            <div>
              <h4>I am a TAX CLIENT</h4>
              <p>I want to save money</p>
            </div>
            <ArrowRight className={styles.icon} />
          </div>
        </div>
      </Wrapper>
      <img src={Dots} className={styles.dots} alt="Dots" />
    </section>
  );
};

export default MarketingSection;
