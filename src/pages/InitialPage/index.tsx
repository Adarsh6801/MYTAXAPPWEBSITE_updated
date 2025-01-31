import { useEffect, useState } from "react";

import HeaderSection from "./HeaderSection";
import EveryoneWinsSection from "./EveryoneWinsSection";
import MarketingSection from "./MarketingSection";
import ProfileFooter from "../../components/ProfileFooter";
import WhyTaxAppSection from "./WhyTaxAppSection";
import {
  getLandingUserType,
  removeLandingUserType,
} from "../../helpers/storage";

const InitialPage = () => {
  const [_, setUserType] = useState(getLandingUserType());

  useEffect(() => {
    window.scrollTo(0, 0);
    removeLandingUserType();
    setUserType(null);
  }, []);

  return (
    <>
      <HeaderSection />
      <WhyTaxAppSection />
      <EveryoneWinsSection />
      <MarketingSection />
      <ProfileFooter />
    </>
  );
};

export default InitialPage;
