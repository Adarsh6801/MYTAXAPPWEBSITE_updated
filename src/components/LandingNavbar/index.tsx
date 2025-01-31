import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Drawer } from "antd";
import { useTranslation } from "react-i18next";

import {
  ABOUT_PAGE,
  BLOGS_PAGE,
  CONTACT_US_PAGE,
  FAQ_PAGE,
  INITIAL_PAGE,
  LANDING_EXPERT_PAGE,
  LANDING_TAXPAYER_PAGE,
  PRICING_PAGE,
  SIGN_IN_PAGE,
} from "../../constants/routes";
import { ILandingNavbarProps, INavItem } from "./index.interfaces";
import { getClassNames } from "../../helpers/format";
import { getLandingUserType, setLandingUserType } from "../../helpers/storage";

import LogoName from "../../assets/svgs/logo.svg";
import WhiteLogoName from "../../assets/svgs/logo-white.svg";
import LogoNamePro from "../../assets/svgs/logo-pro.svg";
import Hamburger from "../../assets/svgs/hamburger.svg";
import styles from "./index.module.css";

const LandingNavbar = (props: ILandingNavbarProps) => {
  const { t } = useTranslation();
  const { className, light } = props;
  const [hasBackground, setHasBackground] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const landingUserType = getLandingUserType();
  const data = [
    ...(!landingUserType
      ? [
          {
            text: t("landing.navbar.tax_pro"),
            url: LANDING_EXPERT_PAGE,
            onClick: () => {
              setLandingUserType("expert");
            },
          },
          {
            text: t("landing.navbar.tax_clients"),
            url: LANDING_TAXPAYER_PAGE,
            onClick: () => {
              setLandingUserType("taxpayer");
            },
          },
        ]
      : [
          {
            text: t("landing.navbar.home"),
            url: INITIAL_PAGE,
          },
        ]),
    {
      text: t("landing.navbar.contact_us"),
      url: CONTACT_US_PAGE,
    },
    {
      text: t("landing.navbar.about"),
      url: ABOUT_PAGE,
    },
    ...(landingUserType === "expert"
      ? [
          {
            text: t("landing.navbar.pricing"),
            url: PRICING_PAGE,
          },
        ]
      : []),
    ...(landingUserType
      ? [
          {
            text: t("landing.navbar.blog"),
            url: BLOGS_PAGE,
          },
          {
            text: t("landing.navbar.faq"),
            url: FAQ_PAGE,
          },
          {
            text: t("landing.navbar.login"),
            url: SIGN_IN_PAGE,
          },
        ]
      : []),
  ];

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 80 && !hasBackground) {
      setHasBackground(true);
    } else if (document.documentElement.scrollTop <= 80 && hasBackground) {
      setHasBackground(false);
    }
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };

  const renderNavbarItems = (data: INavItem[]) =>
    data.map((item, index) => (
      <Link
        key={`nav_${index}`}
        className={getClassNames(
          styles.navItem,
          light && !hasBackground && styles.light,
        )}
        onClick={item.onClick}
        to={item.url}
      >
        {item.text}
      </Link>
    ));

  const getLogo = () => {
    if (landingUserType === "expert" && !light) return LogoNamePro;

    return light && !hasBackground ? WhiteLogoName : LogoName;
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <nav
        className={getClassNames(
          styles.container,
          hasBackground && styles.hasBackground,
          className,
        )}
      >
        <Link to={INITIAL_PAGE}>
          <img src={getLogo()} className={styles.logo} alt="Brand name" />
        </Link>

        <img
          className={styles.hamburger}
          src={Hamburger}
          alt="Menu"
          onClick={showDrawer}
        />

        <div className={styles.menuItems}>
          <Space size={40}>{renderNavbarItems(data)}</Space>
        </div>
      </nav>

      <Drawer
        title={
          <Link to={INITIAL_PAGE}>
            <img src={LogoName} className={styles.logo} alt="Brand name" />
          </Link>
        }
        width={280}
        placement="left"
        closable={false}
        onClose={onClose}
        open={isDrawerVisible}
        bodyStyle={{ textAlign: "center" }}
      >
        <Space size="middle" align="center" direction="vertical">
          {renderNavbarItems(data)}
        </Space>
      </Drawer>
    </>
  );
};

export default LandingNavbar;
