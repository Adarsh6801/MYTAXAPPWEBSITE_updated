import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import OrganizerContainer from "../../../components/OrganizerContainer";
import Loading from "../../../components/Loading";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import Step10 from "./Step10";
import Step11 from "./Step11";
import Step12 from "./Step12";
import Step13 from "./Step13";
import Step14 from "./Step14";
import Step15 from "./Step15";

import { ReactComponent as OrganizerBuild } from "../../../assets/svgs/organizer-business-build.svg";
import { ReactComponent as OrganizerPeople } from "../../../assets/svgs/organizer-people.svg";
import { ReactComponent as OrganizerBlank } from "../../../assets/svgs/organizer-blank.svg";
import { ReactComponent as OrganizerPartnerShip } from "../../../assets/svgs/organizer-partnerShip.svg";
import { ReactComponent as OrganizerCorporations } from "../../../assets/svgs/orgniazer-corporations.svg";
import { ReactComponent as OrganizerBooking } from "../../../assets/svgs/organizer-booking.svg";

import styles from "./index.module.css";

const OrganizerBusiness = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<any>([] as any);

  const isLoading = useSelector(
    (state: any) => state.individualOrganizer.loading,
  );

  const onStepSubmit = (values: object[]) => {
    setState([...state, ...values]);
  };

  return (
    <>
      <OrganizerContainer
        contentClassName={styles.context}
        groups={[
          {
            // step 0
            component: <Step1 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBuild />,
            stepTitle: t("organizer.business.step1.step_title"),
          },
          {
            // step 1
            component: <Step2 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBuild />,
            stepTitle: t("organizer.business.step2.step_title"),
          },
          {
            // step 2
            component: <Step3 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBuild />,
            stepTitle: t("organizer.business.step3.step_title"),
          },
          {
            // step 3
            component: <Step4 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBuild />,
            stepTitle: t("organizer.business.step4.step_title"),
          },
          {
            // step 4 table
            component: <Step5 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerPeople />,
            stepTitle: t("organizer.business.step5.step_title"),
          },
          {
            // step 5
            component: <Step6 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBlank />,
            stepTitle: t("organizer.business.step6.step_title"),
          },
          {
            // step 6
            component: <Step7 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBlank />,
            stepTitle: t("organizer.business.step7.step_title"),
          },
          {
            // step 7
            component: <Step8 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerPartnerShip />,
            stepTitle: t("organizer.business.step8.step_title"),
          },
          {
            // step 8
            component: <Step9 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerCorporations />,
            stepTitle: t("organizer.business.step9.step_title"),
          },
          {
            // step 9
            component: <Step10 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBooking />,
            stepTitle: t("organizer.business.step10.step_title"),
          },
          {
            // step 10
            component: <Step11 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBooking />,
            stepTitle: t("organizer.business.step11.step_title"),
          },
          {
            // step 11
            component: <Step12 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBooking />,
            stepTitle: t("organizer.business.step12.step_title"),
          },
          {
            // step 12
            component: <Step13 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBooking />,
            stepTitle: t("organizer.business.step13.step_title"),
          },
          {
            // step 13
            component: <Step14 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBooking />,
            stepTitle: t("organizer.business.step14.step_title"),
          },
          {
            // step 14
            component: <Step15 state={state} onStepSubmit={onStepSubmit} />,
            groupName: "Business",
            stepIcon: <OrganizerBooking />,
            stepTitle: t("organizer.business.step15.step_title"),
          },
        ]}
      />
      {isLoading && <Loading type="secondary" />}
    </>
  );
};

export default OrganizerBusiness;
