import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Space, Switch } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";

import LandingNavbar from "../../components/LandingNavbar";
import ProfileFooter from "../../components/ProfileFooter";
import { useAppSelector } from "../../redux/hooks";
import Button from "../../components/Button";
import { getClassNames } from "../../helpers/format";
import { isTokenValid } from "../../helpers/validate";
import { getUserToken, setUrlForRedirection } from "../../helpers/storage";
import { PRICING_PAGE, SIGN_IN_PAGE } from "../../constants/routes";

import { ReactComponent as CircleCheck } from "../../assets/svgs/circle-checkmark.svg";
import styles from "./index.module.css";

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.user);
  const monthlyPackages = [
    {
      plan: "Basic",
      price: 199,
      type: "monthly",
      saving: null,
      isActive: false,
      benefits: [
        "Pro Listing",
        "Document Uploads",
        "Smart Onboarding",
        "Digital Questionnaire",
        "Appointment scheduling",
        "FAQ",
        "Tax return status updates",
      ],
      onClick: () =>
        handleOnClick(
          process.env.REACT_APP_STRIPE_BASIC_MONTHLY_SUBSCRIPTION ?? "",
        ),
    },
    {
      plan: "Standard",
      price: 349,
      type: "monthly",
      saving: null,
      isActive: true,
      benefits: [
        "Pro Listing",
        "Document Uploads",
        "Smart Onboarding",
        "Digital Questionnaire",
        "Appointment scheduling",
        "FAQ",
        "Tax return status updates",
        "Automated reminders",
        "Missing items reminders",
        "AI FAQ",
      ],
      onClick: () =>
        handleOnClick(
          process.env.REACT_APP_STRIPE_STANDARD_MONTHLY_SUBSCRIPTION ?? "",
        ),
    },
  ];
  const yearlyPackages = [
    {
      plan: "Basic",
      price: 2150,
      type: "yearly",
      saving: 10,
      isActive: false,
      benefits: [
        "Pro Listing",
        "Document Uploads",
        "Smart Onboarding",
        "Digital Questionnaire",
        "Appointment scheduling",
        "FAQ",
        "Tax return status updates",
      ],
      onClick: () =>
        handleOnClick(
          process.env.REACT_APP_STRIPE_BASIC_YEARLY_SUBSCRIPTION ?? "",
        ),
    },
    {
      plan: "Standard",
      price: 3650,
      type: "yearly",
      saving: 13,
      isActive: true,
      benefits: [
        "Pro Listing",
        "Document Uploads",
        "Smart Onboarding",
        "Digital Questionnaire",
        "Appointment scheduling",
        "FAQ",
        "Tax return status updates",
        "Automated reminders",
        "Missing items reminders",
        "AI FAQ",
      ],
      onClick: () =>
        handleOnClick(
          process.env.REACT_APP_STRIPE_STANDARD_YEARLY_SUBSCRIPTION ?? "",
        ),
    },
  ];
  const packages = isYearly ? yearlyPackages : monthlyPackages;

  const handleOnClick = (url: string) => {
    const hasValidToken = isTokenValid(getUserToken());

    if (hasValidToken && user?.email) {
      window.open(
        url +
          "?" +
          createSearchParams({
            prefilled_email: user?.email || "",
          }).toString(),
      );
    } else {
      setUrlForRedirection(PRICING_PAGE);
      navigate(SIGN_IN_PAGE);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <LandingNavbar />
        <h2 className={styles.title}>{t("pricing.title")}</h2>

        <Space size={30} className={styles.periodWrapper} align="center">
          <h4 className={styles.period}>{t("pricing.monthly")}</h4>
          <Switch checked={isYearly} onChange={value => setIsYearly(value)} />
          <h4 className={styles.period}>{t("pricing.yearly")}</h4>
        </Space>

        <div className={styles.plans}>
          {packages.map((x, i) => (
            <div
              key={`package_${i}`}
              className={getClassNames(
                styles.plan,
                x.isActive && styles.active,
              )}
            >
              {x.isActive && <div className={styles.popular}>Most Popular</div>}

              <h1 className={styles.price}>
                ${x.price}
                <span>{isYearly ? "/year**" : "/month**"}</span>
              </h1>

              {x.saving && (
                <p className={styles.saving}>{x.saving}% annual saving</p>
              )}

              <h1 className={styles.title}>{x.plan}</h1>

              <div className={styles.list}>
                {x.benefits.map((y, j) => (
                  <div key={`benefit_${j}`} className={styles.listItem}>
                    <CircleCheck />
                    <p>{y}</p>
                  </div>
                ))}
              </div>

              <Button
                block
                type={x.isActive ? "primary" : "default"}
                text={t("pricing.choose_plan")}
                onClick={x.onClick}
              />
            </div>
          ))}
        </div>

        <p className={styles.note}>* All monthly pricing subject to change.</p>
        <p className={styles.note}>
          **The initial debit transaction is scheduled to take place after the
          completion of the 30-day trial period
        </p>
      </div>
      <ProfileFooter />
    </>
  );
};

export default Pricing;
