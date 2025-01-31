import { useTranslation } from "react-i18next";

import Wrapper from "../../../components/Wrapper";
import { getClassNames } from "../../../helpers/format";

import { ReactComponent as PigIcon } from "../../../assets/svgs/whytaxapp/pig.svg";
import { ReactComponent as ChatIcon } from "../../../assets/svgs/whytaxapp/chat.svg";
import { ReactComponent as CheckIcon } from "../../../assets/svgs/whytaxapp/check.svg";
import { ReactComponent as ClockIcon } from "../../../assets/svgs/whytaxapp/clock.svg";
import { ReactComponent as DateIcon } from "../../../assets/svgs/whytaxapp/date.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/svgs/whytaxapp/download.svg";
import { ReactComponent as ListIcon } from "../../../assets/svgs/whytaxapp/list.svg";
import styles from "./index.module.css";

const WhyTaxAppSection = () => {
  const { t } = useTranslation();
  const items = [
    {
      icon: <PigIcon />,
      text: t("landing.why_tax_app.text1"),
    },
    {
      icon: <ClockIcon />,
      text: t("landing.why_tax_app.text2"),
    },
    {
      icon: <ListIcon />,
      text: t("landing.why_tax_app.text3"),
    },
    {
      icon: <DateIcon />,
      text: t("landing.why_tax_app.text4"),
    },
    {
      icon: <DownloadIcon />,
      text: t("landing.why_tax_app.text5"),
    },
    {
      icon: <ChatIcon />,
      text: t("landing.why_tax_app.text6"),
    },
    {
      icon: <CheckIcon />,
      text: t("landing.why_tax_app.text7"),
    },
  ];

  return (
    <>
      <header className={styles.container}>
        <Wrapper>
          <h1 className={styles.title}>{t("landing.why_tax_app.title")}</h1>
          <h2 className={getClassNames(styles.title, styles.subtitle)}>
            {t("landing.why_tax_app.subtitle")}
          </h2>

          <div className={styles.list}>
            {items.map((x, i) => (
              <div key={`item_${i}`} className={styles.listItem}>
                <span>{`${(i + 1).toString().padStart(2, "0")}`}</span>
                {x.icon}
                {x.text}
              </div>
            ))}
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default WhyTaxAppSection;
