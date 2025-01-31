import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";
import TrustedExpertCard from "../../../components/TrustedExpertCard";

import { ReactComponent as TaxCase } from "../../../assets/svgs/tax-case.svg";
import { ReactComponent as Headset } from "../../../assets/svgs/headset.svg";
import { ReactComponent as People } from "../../../assets/svgs/people.svg";
import Scissors from "../../../assets/svgs/scissors-mask2.svg";
import styles from "./index.module.css";

const EveryoneWinsSection = () => {
  const { t } = useTranslation();
  const data = [
    {
      text: "Maximum tax returns",
      icon: <TaxCase />,
    },
    {
      text: "Real people in real time",
      icon: <People />,
    },
    {
      text: "Outstanding customer service",
      icon: <Headset />,
    },
  ];

  return (
    <section className={styles.container}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.title}>Everyone wins</h1>
        <div className={styles.items}>
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.itemTitle}>{item.text}</h3>
            </div>
          ))}
        </div>
      </Wrapper>
      <img src={Scissors} className={styles.mask} alt="MyTaxApp" />
    </section>
  );
};

export default EveryoneWinsSection;
