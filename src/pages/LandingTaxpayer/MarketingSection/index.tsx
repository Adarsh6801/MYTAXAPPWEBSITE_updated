import { useRef, useState } from "react";
import { Input, InputRef, message } from "antd";
import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";
import { isEmail } from "../../../utils/validation";
import Button from "../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createEmailSubscription } from "../../../redux/emailSubscriptionSlice";

import Dots from "../../../assets/svgs/dots-group5.svg";
import styles from "./index.module.css";

const MarketingSection = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.emailSubscription);
  const [email, setEmail] = useState("");

  const onSubscribe = async () => {
    if (email && isEmail(email)) {
      await dispatch(createEmailSubscription(email));
      message.success("Email has been successfully subscribed!");
      setEmail("");
    } else {
      message.error("You have entered an invalid email address!");
    }
  };

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3uPbcfM0faw?si=egZ0mFg0j6T_Hzmh"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className={styles.video}
          allowFullScreen
        />

        <h1 className={styles.title}>{t("landing.marketing.title")}</h1>
        <div className={styles.buttonContainer}>
          <Input
            placeholder={t("landing.marketing.email_address")}
            disabled={loading}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="primary"
            text={t("landing.marketing.subscribe")}
            onClick={onSubscribe}
            loading={loading}
            disabled={loading}
          />
        </div>
      </Wrapper>
      <img src={Dots} className={styles.dots} alt="Dots" />
    </section>
  );
};

export default MarketingSection;
