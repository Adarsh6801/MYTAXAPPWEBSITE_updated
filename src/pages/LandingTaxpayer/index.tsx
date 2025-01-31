import { useEffect } from "react";

import HeaderSection from "./HeaderSection";
import HowItWorkSection from "./HowItWorkSection";
import FindProfessionalSection from "./FindProfessionalSection";
import TestimonialSection from "./TestimonialSection";
import MarketingSection from "./MarketingSection";
import ProfileFooter from "../../components/ProfileFooter";
import WhyTaxAppSection from "./WhyTaxAppSection";

const LandingTaxpayer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderSection />
      <WhyTaxAppSection />
      <HowItWorkSection />
      <FindProfessionalSection />
      <TestimonialSection />
      <MarketingSection />
      <ProfileFooter />
    </>
  );
};

export default LandingTaxpayer;
