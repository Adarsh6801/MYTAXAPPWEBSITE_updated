import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";
import TrustedExpertCard from "../../../components/TrustedExpertCard";

import Scissors from "../../../assets/svgs/scissors-mask2.svg";
import styles from "./index.module.css";

const FindProfessionalSection = () => {
  const { t } = useTranslation();
  const data = [
    {
      name: "Vanessa Laird",
      avatar: require("../../../assets/images/expert-1.png"),
      position: "Programmer",
      rating: 5,
    },
    {
      name: "James Gordon",
      avatar: require("../../../assets/images/expert-2.png"),
      position: "CPA",
      rating: 5,
    },
    {
      name: "Jeremy Scott",
      avatar: require("../../../assets/images/expert-3.png"),
      position: "CPA",
      rating: 5,
    },
  ];

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.title}>
          {t("landing.find_professionals.title")}
        </h1>
        <div className={styles.content}>
          {data.map((item, index) => (
            <TrustedExpertCard
              key={`expert_${index}`}
              className={styles.card}
              name={item.name}
              avatar={item.avatar}
              position={item.position}
              rating={item.rating}
            />
          ))}
        </div>
      </Wrapper>
      <img src={Scissors} className={styles.mask} alt="MyTaxApp" />
    </section>
  );
};

export default FindProfessionalSection;
