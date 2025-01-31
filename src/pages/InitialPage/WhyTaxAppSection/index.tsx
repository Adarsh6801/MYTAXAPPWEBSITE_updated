import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";

import styles from "./index.module.css";

const WhyTaxAppSection = () => {
  const { t } = useTranslation();
  const items = [
    "MYTAXAPP ensures tax prepares offer affordable pricing to everyone",
    "Real people will do everything in their power to get you the biggest return possible.",
    "Clients can ask questions through the entire process.",
    "Tax preparers are happier, creating their own schedule, working from anywhere.",
  ];

  return (
    <>
      <header className={styles.container}>
        <Wrapper>
          <h1 className={styles.title}>Why use MYTAXAPP?</h1>

          <div className={styles.list}>
            {items.map((x, i) => (
              <div key={`item_${i}`} className={styles.listItem}>
                <span>{`${(i + 1).toString().padStart(2, "0")}`}</span>
                {x}
              </div>
            ))}
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default WhyTaxAppSection;
