import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

import LandingNavbar from "../../components/LandingNavbar";
import ProfileFooter from "../../components/ProfileFooter";
import { getLandingUserType } from "../../helpers/storage";

import styles from "./index.module.css";

const { Panel } = Collapse;

const FAQ = () => {
  const { t } = useTranslation();
  const landingUserType = getLandingUserType();
  const taxpayerList = [
    {
      title: "How does the platform work?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "How do I sign up as a tax professional on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "Can I leave reviews or feedback for tax professionals?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: " How are tax professionals vetted on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "Can I choose my preferred tax professional?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "Is my personal and financial information secure on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "How do I search for tax professionals on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
  ];
  const expertList = [
    {
      title: "How does the platform work?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "How do I sign up as a tax professional on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "Can I leave reviews or feedback for tax professionals?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: " How are tax professionals vetted on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "Can I choose my preferred tax professional?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "Is my personal and financial information secure on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
    {
      title: "How do I search for tax professionals on the platform?",
      text: "Our platform connects individuals and businesses with expert tax professionals. Clients can seek tax professional services, while tax professionals can offer their expertise to clients through our platform.",
    },
  ];
  const items = landingUserType === "taxpayer" ? taxpayerList : expertList;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LandingNavbar />

        <div className={styles.wrapper}>
          <h3>{t("contact_us.contact_information")}</h3>

          <Collapse
            defaultActiveKey={["0"]}
            expandIconPosition="right"
            accordion
            ghost
          >
            {items.map((x, i) => (
              <Panel
                header={x.title}
                key={i.toString()}
                className={styles.panel}
              >
                <p>{x.text}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>

      <ProfileFooter />
    </div>
  );
};

export default FAQ;
